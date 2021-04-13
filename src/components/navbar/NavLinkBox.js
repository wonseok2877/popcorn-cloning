import React from "react";

const NavLinkBox = (props) => {
  return (
    <div className="w-screen h-14 mt-20 fixed z-10 text-4xl px-4 bg-black">
      <div className="flex justify-between"></div>
      {props.children}
    </div>
  );
};

export default NavLinkBox;
