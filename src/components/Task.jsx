import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";

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
      toast.success("Task has been created");
      setInputValue("");
      setClick(false);
    }
  };

  const handleRemoveTask = (index) => {
    const newTask = [...task];
    newTask.splice(index, 1);
    toast.error("Task has been deleted");
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
      toast.success("Task has been updated");
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
        <Toaster richColors position="top-center" />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center items-center gap-4 mb-5">
          <button className="md:mt-20 md:mb-20 bg-red-500 fill-slate-200 rounded-full p-2 hover:scale-110 transition duration-300 ease-in-out">
            <svg width="25" height="25" viewBox="0 0 24 24">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
            </svg>
          </button>
          <h1 className="font-bold text-3xl md:text-5xl my-8 md:mt-20 md:mb-20 tracking-widest">
            Todo Tracker
          </h1>
        </div>
        <div className="flex justify-between md:justify-center items-center w-full">
          <div className="w-full px-4 md:px-0 md:w-[750px] md:gap-[30rem] flex justify-between items-center">
            <button
              className="whitespace-nowrap px-4 py-2 bg-red-500 hover:bg-red-400 rounded-md transition duration-300 ease-in-out"
              onClick={handleAddTaskClick}
            >
              Add Task
            </button>
            <div>
              <select
                className="whitespace-nowrap bg-red-500 hover:bg-red-400 transition duration-300 ease-in-out text-white p-2 rounded-md outline-none"
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
            <TaskModal
              edit={edit}
              inputValue={inputValue}
              modalFilter={modalFilter}
              handleAddTask={handleAddTask}
              handleEditTask={handleEditTask}
              setInputValue={setInputValue}
              setEdit={setEdit}
              setClick={setClick}
            />
          )}
        </AnimatePresence>
        <div className="w-full px-4 flex justify-center items-center">
          {filteredTasks.length === 0 ? (
            <p className="text-gray-200 mt-6 text-center md:mt-8">
              No tasks added yet.
            </p>
          ) : (
            <TaskList
              tasks={filteredTasks}
              taskCreationTime={taskCreationTime}
              handleEditTaskClick={handleEditTaskClick}
              handleRemoveTask={handleRemoveTask}
              handleCheckboxChange={handleCheckboxChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Task;
