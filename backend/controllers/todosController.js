const Todo = require("../models/Todo");

exports.createTodo = async (req, res) => {
  const { title, checked } = req.body;

  try {
    const todo = await Todo.create({
      title,
      checked,
      user: req.user,
    });

    res.status(201).json({
      message: "Todo created!",
      todo,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: "Internal server error!",
    });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user });
    res.status(200).json({
      message: "Todos fetched!",
      todos,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: "Internal server error!" });
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, checked } = req.body;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found!",
      });
    }

    todo.title = title;
    todo.checked = checked;

    await todo.save();
    res.status(200).json({
      message: "Todo updated successfully!",
      todo,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: "Internal server error!",
    });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({
        message: "Todo not found!",
      });
    }

    await todo.deleteOne();
    res.status(200).json({
      message: "Todo deleted successfully!",
      todo,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({
      message: "Internal server error!",
    });
  }
};
