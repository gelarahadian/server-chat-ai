import { findShareconversationByShareToken } from "../repositories/shared-conversation.repository"

export const handleFindShareConversationService = async (shareToken: string) => {
    return await findShareconversationByShareToken(shareToken)
}