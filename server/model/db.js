const mongoose = require("mongoose");

require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  console.log("DB connected");
});

const userSchema = new mongoose.Schema({
  user_name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model("user_profiles", userSchema);

module.exports = { User };