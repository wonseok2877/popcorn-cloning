import React from "react";
import PropTypes from "prop-types";

const MyButton = ({ dispatch, isCurrent, children }) => {
  return (
    <button
      onClick={() => dispatch()}
      className={`${
        isCurrent && "text-yellow-500"
      } w-4/6 h-14 transition-all duration-500 border-none outline-none hover:bg-gray-700 focus:outline-none`}
    >
      {children}
    </button>
  );
};

MyButton.propTypes = {
  dispatch: PropTypes.func,
  isCurrent: PropTypes.bool,
  // node : anything that can be rendered.
  children: PropTypes.node,
};

export default MyButton;
