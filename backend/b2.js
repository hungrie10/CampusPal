const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");


const upload = multer({
  dest: "uploads/",
});

/* =========================
   APP SETUP
========================= */
const app = express();
const port = 3500;

app.use(cors());
app.use(express.json());

/* =========================
   DATABASE CONNECTION
========================= */
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log("DB connected");
});

/* =========================
   MODELS
========================= */
const userSchema = new mongoose.Schema({
  user_name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("user_profiles", userSchema);

const extractPDF = async (path) => {
  const buffer = fs.readFileSync(path);
  const data = await pdfParse(buffer);
  return data.text;
};


/* =========================
   AUTH MIDDLEWARE
========================= */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* =========================
   AUTH ROUTES
========================= */

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { user_name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      user_name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        user_name: user.user_name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* =========================
   USER ROUTES
========================= */

// Get Profile
app.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

/* =========================
   GEMINI AI SETUP
========================= */

// 1. Initialize SDK
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction:
    "You are a helpful assistant that generates exam questions from study material.",
});

const generateQuiz = async (text) => {
  const prompt = `
Create 8–12 multiple choice questions from the content below.

Return ONLY valid JSON in this format:

{
  "title": "Generated Quiz",
  "questions": [
    {
      "question": "string",
      "options": ["A", "B", "C", "D"],
      "answer": "A"
    }
  ]
}

Rules:
- Make questions clear and educational
- Cover important concepts
- Avoid repetition

Content:
${text}
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;

  const raw = response.text();

  const clean = raw.replace(/```json|```/g, "").trim();

  return JSON.parse(clean);
};

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let text = "";

    // 📌 only PDF for now
    if (file.mimetype === "application/pdf") {
      text = await extractPDF(file.path);
    } else {
      return res.status(400).json({ message: "Only PDF files supported" });
    }

    // 🧠 generate quiz
    const rawQuiz = await generateQuiz(text);

    // 🧹 cleanup uploaded file
    fs.unlinkSync(file.path);

    // 🎯 FINAL RESPONSE FORMAT (YOUR EXACT REQUEST)
    const formattedResponse = {
      quiz: {
        title: rawQuiz.title || "Generated Quiz",
        questions: rawQuiz.questions || [],
      },
    };

    res.json(formattedResponse);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Quiz generation failed" });
  }
});

/* =========================
   TEST ROUTE (AI)
========================= */

app.get("/", async (req, res) => {
  const result = await model.generateContent(
    "Who acted in movie Harry Potter?"
  );

  const response = await result.response;
  res.send({ response: response.text() });
});

/* =========================
   SERVER START
========================= */



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});