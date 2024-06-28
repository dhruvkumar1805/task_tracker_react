const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        message: "User already exists!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();

    const payload = {
      user: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });

    res.status(201).json({
      message: "User created successfully!",
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials!",
      });
    }

    const payload = {
      user: user._id,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 360000,
    });

    res.status(200).json({
      message: "User Login successful!",
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error." });
  }
};

exports.logout = async (req, res) => {
  localStorage.removeItem("token");
  res.status(201).json({
    message: "User logged out successfully!",
  });
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal server error." });
  }
};