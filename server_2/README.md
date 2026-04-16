# 🚀 Chat Server (Gemini + WebSockets)

## 📌 Overview
This server powers real-time chat functionality using **WebSockets** and integrates with **Google Gemini AI** to generate intelligent responses.

It acts as the backend engine that:
- Handles real-time communication between clients
- Processes user messages
- Sends prompts to Gemini AI
- Returns AI-generated responses instantly

---

## ⚙️ Tech Stack
- **Node.js** – Backend runtime
- **Express.js** – Server framework
- **WebSocket / Socket.IO** – Real-time communication
- **Gemini AI API** – AI response generation
- **MongoDB (optional)** – Chat/message storage
- **JWT (optional)** – Authentication

---

## 🧠 Features
- 🔄 Real-time chat using sockets  
- 🤖 AI-powered responses via Gemini  
- 👥 Multi-user support (optional rooms)  
- 💾 Chat history storage (optional)
- 📄 File upload support (PDF parsing)  

---

## 📂 Project Structure
server/
- models/ Database schemas (User, Messages, etc.)
- routes/ API routes (auth, chat history, etc.)
- sockets/ Socket event handlers
- utils/ Helper functions (Gemini config, etc.)
- uploads/ File uploads (if enabled)
- .env Environment variables
- server.js Main entry point


---

## 🔌 How It Works

### 1. Client Connection
- Client connects via WebSocket  
- Server listens for connection events  

### 2. Message Flow
1. User sends a message  
2. Server receives it via socket  
3. Message is forwarded to Gemini AI  
4. Gemini processes and returns a response  
5. Server emits response back to client in real-time  

---

## 🔁 Socket Events

| Event Name         | Description |
|-|-|
| `connection`      | Triggered when a user connects |
| `send_message`    | User sends a message |
| `receive_message` | Server sends AI response |
| `disconnect`      | User disconnects |

---

# CampusPal
