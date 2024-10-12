const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  validateSignup,
  validateLogin,
} = require("../validation/authValidation");

// Signup Controller
exports.signup = async (req, res) => {
  const { error } = validateSignup(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new User({ email, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    res.status(201).json({ message: "User signed up successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid creds" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid creds" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    res.json({ message: "User logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
