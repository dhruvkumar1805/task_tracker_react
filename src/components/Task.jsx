import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdEdit, MdDelete } from "react-icons/md";
import { Toaster, toast } from "sonner";

function Task() {
  const [click, setClick] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [edit, setEdit] = useState(null);
  const [filter, setFilter] = useState("all");
  const [modalFilter, setModalFilter] = useState("incomplete");
  const [task, setTasks] = useState(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return storedTasks;
  });
  const [taskCreationTime, setTaskCreationTime] = useState(() => {
    const storedCreationTime =
      JSON.parse(localStorage.getItem("creationTime")) || [];
    return storedCreationTime;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
    localStorage.setItem("creationTime", JSON.stringify(taskCreationTime));
  }, [task, taskCreationTime]);

  const handleAddTaskClick = () => {
    setClick(true);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        name: inputValue,
        checked: modalFilter === "completed",
      };
      setTasks([newTask, ...task]);
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
      toast.success("Event has been created");
      setInputValue("");
      setClick(false);
    }
  };

  const handleRemoveTask = (index) => {
    const newTask = [...task];
    newTask.splice(index, 1);
    toast.error("Event has been deleted");
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
      toast.success("Event has been updated");
      setInputValue("");
      setEdit(null);
      setClick(false);
    }
  };

  const filteredTasks = task.filter((task) => {
    if (filter === "completed") {
      return task.checked;
    } else if (filter === "incomplete") {
      return !task.checked;
    } else {
      return true;
    }
  });

  return (
    <div className="w-full min-h-screen bg-[#232232] text-white">
      <div>
        <Toaster richColors />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl md:text-5xl my-8 md:mt-20 md:mb-10 tracking-widest">
          TODO TRACKER
        </h1>
        <div className="flex justify-between md:justify-center items-center w-full">
          <div className="w-full px-4 md:px-0 md:w-[750px] md:gap-[30rem] flex justify-between items-center">
            <button
              className="whitespace-nowrap px-4 py-2 bg-[#f84f38] hover:bg-[#a24e43] rounded-md transition-colors"
              onClick={handleAddTaskClick}
            >
              Add Task
            </button>
            <div>
              <select
                className="whitespace-nowrap bg-[#c44c3c] text-white py-2 px-2 rounded-md outline-none"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="incomplete">Incomplete</option>
              </select>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {click && (
            <motion.div
              key="modal"
              className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-10"
              onClick={() => setClick(false)}
            >
              <motion.div
                className="w-full md:w-auto bg-[#181824] flex justify-evenly flex-col px-4 py-4 mx-4 gap-4 rounded-lg"
                key="modalContent"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-semibold">
                  {edit !== null ? "Edit ToDo" : "Add ToDo"}
                </h3>
                <div className="space-y-2">
                  <h4>Title</h4>
                  <input
                    autoFocus
                    className="w-full md:w-96 px-4 py-2 rounded-md text-gray-800"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add your task here"
                  />
                </div>
                <div className="space-y-2">
                  <h4>Status</h4>
                  <select
                    className="w-full md:w-96 px-4 py-2 rounded-md text-gray-800"
                    name=""
                    id=""
                    value={modalFilter}
                    onChange={(e) => setModalFilter(e.target.value)}
                  >
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                  </select>
                </div>
                <div className="space-x-3 space-y-4">
                  <button
                    className="px-5 py-2 bg-[#f84f38] hover:bg-[#a24e43] rounded-md"
                    onClick={edit !== null ? handleEditTask : handleAddTask}
                  >
                    {edit !== null ? "Edit Task" : "Add Task"}
                  </button>
                  <button
                    className="px-5 py-2 bg-gray-500 rounded-md"
                    onClick={() => {
                      setEdit(null);
                      setClick(false);
                      setInputValue("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="w-full px-4 flex justify-center items-center">
          {filteredTasks.length === 0 ? (
            <p className="text-gray-200 mt-6 text-center md:mt-8">
              No tasks added yet.
            </p>
          ) : (
            <div className="w-full md:w-[750px] bg-[#2a293b] rounded-lg mt-6">
              <div className="rounded-lg mx-4">
                {filteredTasks.map((task, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-md"
                  >
                    <div className="flex justify-between items-center rounded-md">
                      <div>
                        <div className="flex justify-center items-center my-2">
                          <div className="flex justify-center items-center">
                            <input
                              type="checkbox"
                              className="h-5 w-5 accent-[#f84f38]"
                              checked={task.checked}
                              onChange={() => handleCheckboxChange(index)}
                            />
                          </div>
                          <div className="ml-4">
                            <span
                              className={
                                task.checked
                                  ? "line-through opacity-50 text-[18px] leading-none"
                                  : "text-[18px] leading-none"
                              }
                            >
                              {task.name}
                            </span>
                            <p className="text-gray-400 text-xs font-extralight">
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
