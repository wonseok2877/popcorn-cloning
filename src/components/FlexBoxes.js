import React from "react";

export const RelativeDiv = (props) => {
  return <div className="flex relative w-full mt-5">{props.children}</div>;
};

export const AbsoluteDiv = (props) => {
  return (
    <div className="flex flex-col justify-evenly items-center text-4xl opacity-0 absolute w-full h-full  bg-white bg-opacity-0 hover:opacity-100 hover:bg-opacity-60 transition-all ease-in-out duration-500">
      {props.children}
    </div>
  );
};
