import { Request, Response } from "express";
import { BadRequestError } from "../errors/BadRequestError";
import { FrobiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { askToAi, askToAiStream, generateTitle } from "../integrations/openai";
import { createChat, findChatByIds } from "../repositories/chat.repository";
import {
  createConversation,
  findConversationById,
} from "../repositories/conversation.repository";

export const handleChatService = async (
  userId: string,
  input: string,
  conversationId?: string,
  chatIds?: string[]
) => {
  let conversation;

  if (conversationId) {
    conversation = await findConversationById(conversationId);
    if (!conversation) throw new NotFoundError("Conversation not found");
    if (conversation.user_id.toString() !== userId) {
      throw new FrobiddenError("It's not your conversation");
    }
  }

  const MAX_HISTORY = 4;

  let chat_history = [];

  if (conversationId) {
    chat_history =
      conversation?.messages.slice(-MAX_HISTORY).map((message: any) => {
        return {
          role: message.role,
          content: message.content,
        };
      }) ?? [];
  } else if (!conversationId && chatIds) {
    chat_history = await findChatByIds(chatIds.slice(-MAX_HISTORY));
  }

  const chatUser = await createChat({
    role: "user",
    content: input,
  });

  const aiPromise = askToAi([
    ...chat_history,
    { role: "user", content: input },
  ]);
  const titlePromise = conversation
    ? null
    : generateTitle([...chat_history, { role: "user", content: input }]);

  const responseAi = await aiPromise;

  const chatAssistant = await createChat({
    role: "assistant",
    content: responseAi.output_text,
  });

  if (!conversation) {
    const title = titlePromise ? await titlePromise : "New Chat";

    conversation = await createConversation({
      user_id: userId,
      title,
      messages: [...(chatIds ?? []), chatUser._id, chatAssistant._id],
    });
  } else {
    conversation.messages.push(chatUser._id, chatAssistant._id);
    await conversation.save();
  }

  return conversation;
};

const activeStreams = new Map<string, any>();

export const handleChatServiceStream = async (
  req: Request,
  res: Response,
  userId: string,
  input: string,
  conversationId?: string,
  chatIds?: string[]
) => {
  const prevStream = activeStreams.get(userId);
  if (prevStream) {
    prevStream.abort();
    activeStreams.delete(userId);
  }

  let conversation;

  if (conversationId) {
    conversation = await findConversationById(conversationId);
    if (!conversation) throw new NotFoundError("Conversation not found");
    if (conversation.user_id.toString() !== userId) {
      throw new FrobiddenError("It's not your conversation");
    }
  }

  const MAX_HISTORY = 4;

  let chat_history = [];

  if (conversationId) {
    chat_history =
      conversation?.messages.slice(-MAX_HISTORY).map((message: any) => {
        return {
          role: message.role,
          content: message.content,
        };
      }) ?? [];
  } else if (!conversationId && chatIds) {
    chat_history = await findChatByIds(chatIds.slice(-MAX_HISTORY));
  }

  const chatUser = await createChat({
    role: "user",
    content: input,
  });

  const titlePromise = conversation
    ? null
    : generateTitle([...chat_history, { role: "user", content: input }]);

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  let fullText = "";

  try {
    if (!conversation) {
      const title = titlePromise ? await titlePromise : "New Chat";

      conversation = await createConversation({
        user_id: userId,
        title,
        messages: [...(chatIds ?? []), chatUser._id],
      });

      res.write(
        `data: ${JSON.stringify({
          type: "meta",
          conversationId: conversation._id,
          title,
        })}\n\n`
      );
    } else {
      conversation.messages.push(chatUser._id);
      await conversation.save();
      res.write(
        `data: ${JSON.stringify({
          type: "meta",
          conversationId: conversation._id,
        })}\n\n`
      );
    }

    const stream = await askToAiStream([{ role: "user", content: input }]);

    activeStreams.set(userId, stream);

    //  client close
    req.on("close", () => {
      stream.abort();
      activeStreams.delete(userId);
    });

    for await (const event of stream) {
      if (event.type === "response.output_text.delta") {
        fullText += event.delta;
        res.write(
          `data: ${JSON.stringify({ type: "token", token: event.delta })}\n\n`
        );
      }

      if (event.type === "response.completed") {
        const chatAssistant = await createChat({
          role: "assistant",
          content: fullText,
        });

        conversation.messages.push(chatAssistant._id);
        await conversation.save();

        res.write(`data: ${JSON.stringify({ type: "done" })}\n\n`);
        res.end();
        break;
      }
    }
  } catch (err: any) {
    if (err?.name !== "AbortError") {
      console.error("Streaming error:", err);
      res.write(
        `data: ${JSON.stringify({ error: "AI generation failed" })}\n\n`
      );
      res.end();
    }
  } finally {
    activeStreams.delete(userId);
  }
};
