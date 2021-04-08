import React from "react";

const MyButtonDiv = (props) => {
  return (
    <div className="flex justify-evenly text-white bg-green-800">
      {props.children}
    </div>
  );
};

export default MyButtonDiv;
