import React from "react";
import { motion } from "framer-motion";

function TaskModal({ edit, inputValue, modalFilter, handleAddTask, handleEditTask, setInputValue, setEdit, setClick }) {
  return (
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
  );
}

export default TaskModal;
