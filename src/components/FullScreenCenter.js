import React from "react";

const FullScreenCenter = ({ children }) => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black">
      {children}
    </div>
  );
};

export default FullScreenCenter;
