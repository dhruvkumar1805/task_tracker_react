const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Todo = mongoose.model("Todo", UserSchema);

module.exports = Todo;
