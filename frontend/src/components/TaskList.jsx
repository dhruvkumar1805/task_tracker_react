import React from "react";
import { motion } from "framer-motion";

function TaskList({
  tasks,
  handleEditTaskClick,
  handleRemoveTask,
  handleCheckboxChange,
}) {
  return (
    <div className="w-full md:w-[750px] rounded-lg my-6">
      <div className="rounded-lg flex flex-col gap-2">
        {tasks.map(
          (task, index) =>
            task && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-md"
              >
                <div
                  className={`flex justify-between items-center rounded-md px-2 ${
                    task.checked ? "bg-[#2a293b]/50" : "bg-[#2a293b]"
                  } transition duration-300 ease-in-out`}
                >
                  <div>
                    <div className="flex justify-center items-center my-2">
                      <div className="flex justify-center items-center">
                        <button
                          className={
                            task.checked
                              ? "p-1 ml-2 rounded-full bg-red-500 border border-solid border-red-500 hover:scale-110 transition duration-300 ease-in-out"
                              : "rounded-full border border-solid border-gray-400 p-2.5 ml-2 hover:scale-110 transition duration-300 ease-in-out"
                          }
                          checked={task.checked}
                          onClick={() => handleCheckboxChange(index)}
                        >
                          {task.checked && (
                            <svg width="12" height="12" viewBox="0 0 24 24">
                              <path
                                fill={task.checked ? "#fff" : "#9ca3af"}
                                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                              ></path>
                            </svg>
                          )}
                        </button>
                      </div>
                      <div className="ml-4">
                        <span
                          className={
                            task.checked
                              ? "line-through opacity-50 text-[18px] leading-none break-all"
                              : "text-[18px] leading-none break-all"
                          }
                        >
                          {task.title}
                        </span>
                        <p className="text-gray-400 text-xs font-extralight">
                          {new Date(task.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center space-x-2">
                    <button
                      className="hover:scale-110 transition duration-300 ease-in-out"
                      onClick={() => handleEditTaskClick(index)}
                    >
                      <svg
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ionicon"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="none"
                          stroke="#e2e8f0"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="44"
                          d="M358.62 129.28L86.49 402.08 70 442l39.92-16.49 272.8-272.13-24.1-24.1zM413.07 74.84l-11.79 11.78 24.1 24.1 11.79-11.79a16.51 16.51 0 000-23.34l-.75-.75a16.51 16.51 0 00-23.35 0z"
                        />
                      </svg>
                    </button>
                    <button
                      className="hover:scale-110 transition duration-300 ease-in-out"
                      onClick={() => handleRemoveTask(index)}
                    >
                      <svg
                        width="20"
                        height="20"
                        xmlns="http://www.w3.org/2000/svg"
                        className="ionicon"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M296 64h-80a7.91 7.91 0 00-8 8v24h96V72a7.91 7.91 0 00-8-8z"
                          fill="#e2e8f0"
                        />
                        <path
                          fill="#e2e8f0"
                          d="M432 96h-96V72a40 40 0 00-40-40h-80a40 40 0 00-40 40v24H80a16 16 0 000 32h17l19 304.92c1.42 26.85 22 47.08 48 47.08h184c26.13 0 46.3-19.78 48-47l19-305h17a16 16 0 000-32zM192.57 416H192a16 16 0 01-16-15.43l-8-224a16 16 0 1132-1.14l8 224A16 16 0 01192.57 416zM272 400a16 16 0 01-32 0V176a16 16 0 0132 0zm32-304h-96V72a7.91 7.91 0 018-8h80a7.91 7.91 0 018 8zm32 304.57A16 16 0 01320 416h-.58A16 16 0 01304 399.43l8-224a16 16 0 1132 1.14z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            )
        )}
      </div>
    </div>
  );
}

export default TaskList;
