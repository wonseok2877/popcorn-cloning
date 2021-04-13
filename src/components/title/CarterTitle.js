import React from "react";

const CarterTitle = ({ children }) => {
  return (
    <div
      className=" my-5 ml-3 text-5xl text-white"
      style={{ fontFamily: "Carter One, cursive" }}
    >
      {children}
    </div>
  );
};

export default CarterTitle;
