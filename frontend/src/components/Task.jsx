import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";
import axios from "axios";

function Task() {
  const [click, setClick] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [edit, setEdit] = useState(null);
  const [filter, setFilter] = useState("all");
  const [modalFilter, setModalFilter] = useState("incomplete");
  const [task, setTasks] = useState([]);

  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchTasks();
  }, [task]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/todos`, {
        headers: { "x-auth-token": token },
      });
      const sortedTasks = res.data.todos.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setTasks(sortedTasks);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleAddTaskClick = () => {
    setClick(true);
  };

  const handleAddTask = async () => {
    if (inputValue.trim() !== "") {
      try {
        const newTask = {
          title: inputValue,
          checked: modalFilter === "completed",
          createdAt: new Date().toISOString(),
        };
        const res = await axios.post(`${backendUrl}/api/todos`, newTask, {
          headers: { "x-auth-token": token },
        });
        setTasks((tasks) => {
          const updatedTasks = [res.data.todos, ...tasks];
          return updatedTasks.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        });
      } catch (error) {
        console.error(error);
      }

      toast.success("Task has been created");
      setInputValue("");
      setClick(false);
    }
  };

  const handleRemoveTask = async (index) => {
    try {
      const res = await axios.delete(
        `${backendUrl}/api/todos/${task[index]._id}`,
        {
          headers: { "x-auth-token": token },
        }
      );
      setTasks(res.data.todos);
    } catch (error) {
      console.error(error);
    }
    const newTask = [...task];
    newTask.splice(index, 1);
    setTasks(newTask);
    toast.error("Task has been deleted");
  };

  const handleCheckboxChange = async (index) => {
    const newTask = [...task];
    newTask[index].checked = !newTask[index].checked;
    try {
      await axios.put(
        `${backendUrl}/api/todos/${task[index]._id}`,
        newTask[index],
        {
          headers: { "x-auth-token": token },
        }
      );
      setTasks(newTask);
    } catch (error) {
      console.error(error.response.data);
    }
    setTasks(newTask);
  };

  const handleEditTaskClick = (index) => {
    setEdit(index);
    setInputValue(task[index].title);
    setClick(true);
  };

  const handleEditTask = async () => {
    if (inputValue.trim() !== "") {
      try {
        const editedTask = { ...task[edit], title: inputValue };
        await axios.put(
          `${backendUrl}/api/todos/${task[edit]._id}`,
          editedTask,
          {
            headers: { "x-auth-token": token },
          }
        );
        const updatedTasks = [...task];
        updatedTasks[edit] = editedTask;
        setTasks(updatedTasks);
        toast.success("Task has been updated");
      } catch (error) {
        console.error(error.response.data);
      }
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
