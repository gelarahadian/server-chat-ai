
---

# README – BACKEND (Express + TypeScript)

```md
# AI Chat App – Backend ⚙️

Backend service for AI Chat Application.
Handles AI requests, streaming response, and API integration with Gemini.

---

## ✨ Features
- AI Prompt Handling
- Streaming Response
- Error Handling Middleware
- Rate Limiting Ready
- Clean REST API Structure
- TypeScript Support

---

## 🛠 Tech Stack
- Node.js
- Express.js
- TypeScript
- CORS
- dotenv

---

## 📌 API Endpoints

Base URL (Local)
http://localhost:5000/api

---

### Authentication

Some endpoints require authentication.

Use the following header:
Authorization: Bearer <token>

Token is obtained from the **/auth/sign-in** endpoint.

---

### Auth

#### POST /auth/sign-up
Register a new user.

Body:
{
  "name": "string",
  "email": "string",
  "password": "string"
}

---

#### POST /auth/sign-in
Login user and receive an access token.

Body:
{
  "email": "string",
  "password": "string"
}

---

#### GET /auth/me
Get the currently logged-in user data.

Auth: Required

---

### Chat

#### POST /chat
Send a message to the AI and receive a normal response.

Auth: Required

Body:
{
  "conversationId": "string",
  "input": "string",
  "chatIds": []
}

---

#### POST /chat/stream
Send a message to the AI with real-time streaming response.

Auth: Required

Body:
{
  "conversationId": "string",
  "input": "string",
  "chatIds": []
}

---

### Conversations

#### GET /conversations
Retrieve all user conversations.

Auth: Required

---

#### GET /conversation/:conversationId
Get details of a specific conversation.

Auth: Required

Params:
conversationId

---

#### POST /conversations/search
Search conversations by keyword.

Auth: Required

Body:
{
  "q": "string"
}

---

#### DELETE /conversation/:conversationId
Delete a conversation.

Auth: Required

Params:
conversationId

---

### Share Conversation

#### POST /conversation/:conversationId/share
Generate a public share link for a conversation.

Auth: Required

Params:
conversationId

---

#### GET /share/:token
Retrieve a shared conversation without login.

Params:
token

---

## Request Rules

Access Token → Authorization Header  
Input Data → Request Body  
ID / Token → URL Params

---

Notes:
- All endpoints except **/auth/sign-up**, **/auth/sign-in**, and **/share/:token** require authentication.
- Never expose API keys or tokens on the frontend.



## 🧩 Folder Structure

 📁 src  
 │   ├── 📁 config          # Configuration files (e.g., database, environment variables)  
 │   ├── 📁 controllers     # Business logic (handles requests/responses)  
 │   ├── 📁 models          # Database models & schemas  
 │   ├── 📁 routes          # API route definitions  
 │   ├── 📁 middlewares     # Custom middleware (authentication, logging, error handling)  
 │   ├── 📁 services        # Business logic or external API interactions  
 │   ├── 📁 utils           # Helper functions and utilities  
 |   ├── 📁 repositories      # Query Database 
 │   ├── app.js            # Express app setup  
 │   └── server.js         # Server initialization  
 ├── .env                  # Environment variables  
 ├── .gitignore            # Files to ignore in version control  
 ├── package.json          # Dependencies and scripts  
 ├── README.md             # Project documentation  

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone https://github.com/gelarahadian/server-chat-ai.git
cd server-chat-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Evnironment Variables
```bash
Create .env file in the root directory
PORT=
MONGO_URI=
OPENAI_API_KEY=
JWT_SECRET=
FRONTEND_URL=
```

### Run the Server
```bash
npm run dev
```