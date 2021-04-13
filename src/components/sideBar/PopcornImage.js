import React from "react";

const PopcornImage = () => (
  <img
    src="./popcorn-time.png"
    alt="popcorn-time"
    onLoad={(event) => {
      event.target.style.opacity = 100;
    }}
    className="w-28 h-28 p-2 opacity-0 transition-opacity ease-in-out duration-300"
  />
);

export default PopcornImage;
