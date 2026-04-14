const { GoogleGenerativeAI } = require("@google/generative-ai"); // 1. Correct import

// 2. Initialize the SDK
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// 3. Select the specific model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction:
    "You are a helpful assistant that provides information about movies.",
});

app.get("/", async (req, res) => {
  const result = await model.generateContent(
    "Who acted in movie Harry Potter?",
  );
  const response = await result.response;
  res.send({ response: response.text() });
});
