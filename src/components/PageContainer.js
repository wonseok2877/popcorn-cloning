import React from "react";

const PageContainer = (props) => {
  return (
    // padding bottom 없으면 스크롤 끝 인식이 안되네.
    <div className="pt-36 pb-10 bg-black text-white">{props.children}</div>
  );
};

export default PageContainer;
