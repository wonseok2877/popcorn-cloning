import React from "react";

const DetailPageContainer = (props) => {
  return (
    <div className="min-h-screen pt-20 bg-black text-white">
      {props.children}
    </div>
  );
};

export default DetailPageContainer;
