import React from "react";

const TextOverview = (props) => {
  return (
    <div className="mt-5">
      <span className=" text-lg text-gray-400">{props.children}</span>
    </div>
  );
};

export default TextOverview;
