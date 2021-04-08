import React from "react";

const NavLinkBox = (props) => {
  return (
    <div className="flex justify-evenly text-4xl bg-purple-600">
      {props.children}
    </div>
  );
};

export default NavLinkBox;
