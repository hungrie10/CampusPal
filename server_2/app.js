require('dotenv').config()
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
    .then(() => (console.log('🍟Fried chips and  eggs'))).catch((err) => console.error(err))

const { Server } = require(`socket.io`);

const io = new Server(3000, {
    cors: { origin: "*" }
});
const { GoogleGenerativeAI } = require("@google/generative-ai"); // 1. Correct import
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction:
    "You are a helpful assistant that provides information about movies.",
});
 
 io.on("connection", socket => {
    console.log("A user connected to: ", socket["id"]);
    
    // & When the server recieves a 'ping' event from a client... 
    socket.on("ping_event", async (data) => {
        let users_prompt = data.message;

        const result = await model.generateContent(users_prompt,);
        
        const response = await result.response;
         
        // ~ The Server sends a 'pong' event back to THAT client
        socket.emit("pong_event", { message: response.text() })

    });

    socket.on("disconnect", () => {
        console.log("User left.")
    })    
})

console.log("Socket server running on port 3000")
 