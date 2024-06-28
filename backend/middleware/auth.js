const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};

module.exports = auth;
