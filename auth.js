const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();


// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { username, password, cardNumber, pin } = req.body;

    if (!username || !password || !cardNumber || !pin)
      return res.status(400).json({ message: "All fields required" });

    if (!/^\d{16}$/.test(cardNumber))
      return res.status(400).json({ message: "Card must be 16 digits" });

    if (!/^\d{4}$/.test(pin))
      return res.status(400).json({ message: "PIN must be 4 digits" });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already exists" });

    const existingCard = await User.findOne({ cardNumber });
    if (existingCard)
      return res.status(400).json({ message: "Card number already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPin = await bcrypt.hash(pin, 10);

    const user = new User({
      username,
      password: hashedPassword,
      cardNumber,
      pin: hashedPin
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user)
      return res.status(400).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid username or password" });

    res.json({
      message: "Login successful",
      userId: user._id,
      username: user.username,
      cardNumber: user.cardNumber
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;