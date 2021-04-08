import React from "react";

const TextGenre = (props) => {
  return (
    <span className="p-4 mr-3 text-lg bg-black bg-opacity-30 rounded-full">
      {props.children}
    </span>
  );
};

export default TextGenre;
