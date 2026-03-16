const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();


// ================= VERIFY CARD =================
router.post("/verify-card", async (req, res) => {
  try {
    const { userId, cardNumber } = req.body;

    if (!userId || !cardNumber) {
      return res.status(400).json({ message: "Missing data" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.cardNumber === cardNumber) {
      return res.json({ message: "Card verified successfully" });
    } else {
      return res.status(400).json({ message: "Incorrect card number" });
    }

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// ================= VERIFY PIN =================
router.post("/verify-pin", async (req, res) => {
  try {
    const { userId, pin } = req.body;

    if (!userId || !pin) {
      return res.status(400).json({ message: "Missing data" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 🔐 Compare hashed PIN properly
    const isMatch = await bcrypt.compare(pin, user.pin);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect PIN" });
    }

    res.json({ message: "PIN verified successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;