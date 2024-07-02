import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";
import Loader from "./Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoTodosIMG from "../../public/assets/add-task.svg";

function Task({ onLogout }) {
  const [click, setClick] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [edit, setEdit] = useState(null);
  const [filter, setFilter] = useState("all");
  const [modalFilter, setModalFilter] = useState("incomplete");
  const [tasks, setTasks] = useState([]);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchTasks();
    fetchUserInfo();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendUrl}/api/todos`, {
        headers: { "x-auth-token": token },
      });
      const sortedTasks = res.data.todos.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setTasks(sortedTasks);
    } catch (error) {
      console.error(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/users/getme`, {
        headers: { "x-auth-token": token },
      });
      const fullName = res.data.fullName;
      const firstName = fullName.split(" ")[0];
      setFullName(firstName);
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
        await axios.post(`${backendUrl}/api/todos`, newTask, {
          headers: { "x-auth-token": token },
        });
        toast.success("Task has been created");
        fetchTasks();
      } catch (error) {
        console.error(error);
        toast.error("An Error Occurred!");
      }

      setInputValue("");
      setClick(false);
    }
  };

  const handleRemoveTask = async (index) => {
    try {
      await axios.delete(`${backendUrl}/api/todos/${tasks[index]._id}`, {
        headers: { "x-auth-token": token },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
    toast.error("Task has been deleted");
  };

  const handleCheckboxChange = async (index) => {
    const newTaskList = [...tasks];
    newTaskList[index].checked = !newTaskList[index].checked;
    try {
      await axios.put(
        `${backendUrl}/api/todos/${tasks[index]._id}`,
        newTaskList[index],
        {
          headers: { "x-auth-token": token },
        }
      );
      setTasks(newTaskList);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleEditTaskClick = (index) => {
    setEdit(index);
    setInputValue(tasks[index].title);
    setClick(true);
  };

  const handleEditTask = async () => {
    if (inputValue.trim() !== "") {
      try {
        const editedTask = { ...tasks[edit], title: inputValue };
        await axios.put(
          `${backendUrl}/api/todos/${tasks[edit]._id}`,
          editedTask,
          {
            headers: { "x-auth-token": token },
          }
        );
        fetchTasks();
        toast.success("Task has been updated");
      } catch (error) {
        console.error(error.response.data);
      }
      setInputValue("");
      setEdit(null);
      setClick(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };

  const filteredTasks = tasks.filter((task) => {
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
      <div className="flex flex-col items-center justify-center md:mx-8">
        <div className="w-full flex items-center justify-between">
          <div className="flex justify-center items-center gap-2 md:gap-4 mb-5 mx-4">
            <button className="md:mb-20 my-8 bg-red-500 fill-slate-200 rounded-full p-2 hover:scale-110 transition duration-300 ease-in-out">
              <svg
                width={window.innerWidth > 768 ? "24" : "14"}
                height={window.innerWidth > 768 ? "24" : "14"}
                viewBox="0 0 24 24"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
              </svg>
            </button>
            <h1 className="font-bold text-2xl md:text-3xl my-8 md:mb-20 tracking-wide md:tracking-wider whitespace-nowrap">
              Todo App
            </h1>
          </div>
          <div className="flex justify-center items-center gap-4 mb-4 md:mb-20 mx-4">
            <h2
              className={`${
                fullName
                  ? "text-base border-2 border-red-500 px-3 py-1 rounded-full hover:bg-red-500 hover:border-red-500 transition-all duration-300 ease-in-out"
                  : ""
              }`}
            >
              {fullName}
            </h2>

            <button
              onClick={handleLogout}
              className="hover:bg-red-500 transition-all duration-200 ease-in-out p-2 rounded-full md:my-8"
            >
              <svg
                width="22"
                height="22"
                xmlns="http://www.w3.org/2000/svg"
                className="ionicon"
                viewBox="0 0 512 512"
              >
                <path
                  d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex justify-between md:justify-center items-center w-full">
          {filteredTasks.length === 0 ? (
            ""
          ) : (
            <div className="w-full px-4 md:px-0 md:w-[750px] md:gap-[30rem] flex justify-end">
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
          )}
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
          {loading ? (
            <Loader className="mt-20" />
          ) : filteredTasks.length === 0 ? (
            <div className="mt-40 md:mt-0">
              <img src={NoTodosIMG} alt="no task img" className="w-[300px] h-[300px] md:w-[350px] md:h-[350px]" />
              <p className="text-gray-200 text-lg mt-6 text-center md:mt-8">
                No tasks added yet.
              </p>
            </div>
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
      <button
        className="flex items-center justify-center p-2 rounded-full bg-red-500 hover:bg-red-400 transition-all duration-20000 ease-in-out absolute right-10 bottom-10"
        onClick={handleAddTaskClick}
      >
        <svg
          width="35"
          height="35"
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
        >
          <path
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="32"
            d="M256 112v288M400 256H112"
          />
        </svg>
      </button>
    </div>
  );
}

export default Task;
