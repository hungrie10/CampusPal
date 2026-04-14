const express = require('express');
const router = express.Router();
const {authMiddleware} = require("../middleware/authMiddleware")
const {signup_logic} = require("../controller/signup_logic");
const {login_logic} = require("../controller/login_logic");
const { profile_logic } = require("../controller/profile_logic");

router.post("/login", login_logic);
router.post("/signup", signup_logic);
router.get("/profile", authMiddleware ,profile_logic);

module.exports = router;