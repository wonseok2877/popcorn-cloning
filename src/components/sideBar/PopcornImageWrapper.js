import React from "react";

const PopcornImageWrapper = ({ children, setIsSideBarOpen, isSideBarOpen }) => {
  return (
    <div
      onMouseEnter={() => setIsSideBarOpen(true)}
      className={`fixed z-20 top-80 -left-2 focus:outline-none bg-black bg-opacity-80 rounded-full ${
        isSideBarOpen ? "transform -translate-x-80 opacity-0" : ""
      } ease-in-out duration-500 delay-100`}
    >
      {children}
    </div>
  );
};

export default PopcornImageWrapper;
