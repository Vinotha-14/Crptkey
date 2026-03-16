const User = require("../models/User");

// 🔹 REGISTER
exports.register = async (req, res) => {
  const { username, password, cardNumber, pin } = req.body;

  try {
    // Validate card number & pin format
    const cardRegex = /^[0-9]{16}$/;
    const pinRegex = /^[0-9]{4}$/;

    if (!cardRegex.test(cardNumber)) {
      return res.status(400).json({ message: "Card must be 16 digits" });
    }

    if (!pinRegex.test(pin)) {
      return res.status(400).json({ message: "PIN must be 4 digits" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ username, password, cardNumber, pin });
    await newUser.save();

    res.status(201).json({ message: "Registration successful ✅" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 LOGIN (username + password)
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    res.status(200).json({ message: "Login successful", user });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// 🔹 CARD + PIN VERIFY
exports.verifyPin = async (req, res) => {
  const { cardNumber, pin } = req.body;

  try {
    const user = await User.findOne({ cardNumber, pin });

    if (!user) {
      return res.status(400).json({ message: "Invalid PIN ❌" });
    }

    res.status(200).json({ message: "PIN correct ✅" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};