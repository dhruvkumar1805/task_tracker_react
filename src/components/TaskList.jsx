import React from "react";
import { motion } from "framer-motion";
import { MdEdit, MdDelete } from "react-icons/md";

function TaskList({ tasks, taskCreationTime, handleEditTaskClick, handleRemoveTask, handleCheckboxChange }) {
  return (
    <div className="w-full md:w-[750px] bg-[#2a293b] rounded-lg mt-6">
      <div className="rounded-lg mx-4">
        {tasks.map((task, index) => (
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
  );
}

export default TaskList;
