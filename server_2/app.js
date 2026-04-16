const { createServer } = require('http');
const { Server } = require(`socket.io`);

require('dotenv').config();

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173"
    }
});

const { GoogleGenerativeAI } = require("@google/generative-ai"); // 1. Correct import
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction:
    "You are a helpful assistant that provides information about movies.",
});

async function bayne(prompt) {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}
 
io.on("connection", socket => {
    socket.emit("first_reply", "Hello! I'm Bayne 👋");

    socket.on('chat_with_bayne', async (i) => {

        const { message } = i;
        let baynes_reply = await bayne(message);

        socket.emit('bayne_replies_back' , baynes_reply)
    }) 


})

httpServer.listen(3000, () => {
    console.log("Server is running");
}) 