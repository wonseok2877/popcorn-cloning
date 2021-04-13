import React from "react";

const SortButton = ({ children, handleClick, isCurrent }) => {
  return (
    <span
      onClick={handleClick}
      className={`${
        isCurrent
          ? "text-white border-l-2 bg-gradient-to-r from-indigo-800 via-indigo-500 to-indigo-300"
          : "opacity-50"
      } pl-3 cursor-pointer hover:opacity-100 transition-opacity ease-in-out `}
    >
      {children}
    </span>
  );
};

export default SortButton;
