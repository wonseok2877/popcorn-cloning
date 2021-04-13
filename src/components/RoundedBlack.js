import React from "react";

const RoundedBlack = ({ children }) => {
  return (
    <div className="p-4 rounded-full bg-yellow-500 bg-opacity-50">
      {children}
    </div>
  );
};

export default RoundedBlack;
