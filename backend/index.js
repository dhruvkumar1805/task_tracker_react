const express = require("express");
const connectDB = require("./config/db");
const usersRoutes = require("./routes/users");
const todosRoutes = require("./routes/todos");
const cors = require("cors");
require("dotenv").config();

const app = express();

const corsOptions = {
  origin: "https://todo-app-mu-roan.vercel.app",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use("/api/users", usersRoutes);
app.use("/api/todos", todosRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
