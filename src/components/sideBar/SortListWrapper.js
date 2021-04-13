import React from "react";

const SortListWrapper = ({ children, isSideBarOpen, setIsSideBarOpen }) => {
  return (
    <div
      onMouseLeave={() => setIsSideBarOpen(false)}
      className={`${
        isSideBarOpen ? "" : "transform -translate-x-20 opacity-0"
      } h-full w-48 fixed top-32 z-10 pt-8 text-left flex flex-col overflow-auto bg-black text-indigo-100 ease-in-out duration-500`}
    >
      {children}
    </div>
  );
};

export default SortListWrapper;
