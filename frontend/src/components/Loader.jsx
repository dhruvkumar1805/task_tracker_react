import React from "react";

function Loader() {
  return (
    <div className="mt-40 flex justify-center items-center">
      <div
        className="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-red-500 rounded-full dark:text-red-500"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
