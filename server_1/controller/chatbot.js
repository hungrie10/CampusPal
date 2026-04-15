const { GoogleGenerativeAI } = require("@google/generative-ai"); // 1. Correct import

// 2. Initialize the SDK
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Selecting a Model and Giving Pre-set Conditions
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction:
    "You are a helpful assistant that provides information about movies.",
});

const chatbot_logic = async (req, res) => {
  const result = await model.generateContent(
    "Who acted in movie Harry Potter?",
  );
  const response = await result.response;
  res.send({ response: response.text() });
};

module.exports = chatbot_logic