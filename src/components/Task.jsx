import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdEdit, MdDelete } from "react-icons/md";

function Task() {
  const [click, setClick] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [task, setTasks] = useState([]);
  const [edit, setEdit] = useState(null);
  const [taskCreationTime, setTaskCreationTime] = useState([]);

  const handleAddTaskClick = () => {
    setClick(true);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      setTasks([{ name: inputValue, checked: false }, ...task]);
      setTaskCreationTime([
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }) +
          ", " +
          new Date().toLocaleDateString([], {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }),
        ...taskCreationTime,
      ]);
      setInputValue("");
      setClick(false);
    }
  };

  const handleRemoveTask = (index) => {
    const newTask = [...task];
    newTask.splice(index, 1);
    setTasks(newTask);
  };

  const handleCheckboxChange = (index) => {
    const newTask = [...task];
    newTask[index].checked = !newTask[index].checked;
    setTasks(newTask);
  };

  const handleEditTaskClick = (index) => {
    setEdit(index);
    setInputValue(task[index].name);
    setClick(true);
  };

  const handleEditTask = () => {
    if (inputValue.trim() !== "") {
      const editedTasks = [...task];
      editedTasks[edit].name = inputValue;
      setTasks(editedTasks);
      setInputValue("");
      setEdit(null);
      setClick(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#0B1120] to-[#2E3442] text-white">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-5xl mt-12 mb-8 tracking-widest">
          TODO TRACKER
        </h1>
        <div className="w-[750px] flex justify-between items-center mt-6">
          <button
            className="px-5 py-2 bg-[#646FF0] hover:bg-[#4B5E92] rounded-md transition-colors"
            onClick={handleAddTaskClick}
          >
            Add Task
          </button>
          <div className="relative">
            <select className="bg-[#4B5E92] text-white px-4 py-2 rounded-md">
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
        </div>
        <AnimatePresence>
          {click && (
            <motion.div
              key="modal"
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10"
            >
              <motion.div
                className="h-[350px] w-[500px] bg-[#1E293B] flex justify-evenly flex-col px-6 rounded-lg"
                key="modalContent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-xl font-semibold">
                  {edit !== null ? "Edit ToDo" : "Add ToDo"}
                </h3>
                <div className="space-y-2">
                  <h4>Title</h4>
                  <input
                    className="w-full px-4 py-2 rounded-md text-gray-800"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add your task here"
                  />
                </div>
                <div className="space-y-2">
                  <h4>Status</h4>
                  <select
                    className="w-full px-4 py-2 rounded-md text-gray-800"
                    name=""
                    id=""
                  >
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                  </select>
                </div>
                <div className="space-x-3 space-y-4">
                  <button
                    className="px-5 py-2 bg-[#646FF0] rounded-md"
                    onClick={edit !== null ? handleEditTask : handleAddTask}
                  >
                    {edit !== null ? "Edit Task" : "Add Task"}
                  </button>
                  <button
                    className="px-5 py-2 bg-gray-500 rounded-md"
                    onClick={() => {
                      setEdit(null);
                      setClick(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div>
          {task.length === 0 ? (
            <p className="text-gray-200 mt-8">No tasks added yet.</p>
          ) : (
            <div className="bg-[#1E293B] w-[750px] rounded-lg mt-10">
              <div className="px-4 py-4 rounded-lg space-y-4">
                {task.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-md p-3"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="flex justify-center items-center">
                          <div className="flex justify-center items-center">
                            <input
                              type="checkbox"
                              className="h-5 w-5"
                              checked={task.checked}
                              onChange={() => handleCheckboxChange(index)}
                            />
                          </div>
                          <div className="ml-4">
                            <span
                              className={
                                task.checked
                                  ? "line-through opacity-50 text-[18px]"
                                  : "text-[18px]"
                              }
                            >
                              {task.name}
                            </span>
                            <p className="text-gray-300 text-xs font-extralight">
                              {taskCreationTime[index]}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center space-x-2">
                        <button onClick={() => handleEditTaskClick(index)}>
                          <MdEdit size={20} />
                        </button>
                        <button onClick={() => handleRemoveTask(index)}>
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Task;
