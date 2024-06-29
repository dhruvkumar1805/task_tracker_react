const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getMe,
} = require("../controllers/usersController");
const auth = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/getme", auth, getMe);

module.exports = router;
