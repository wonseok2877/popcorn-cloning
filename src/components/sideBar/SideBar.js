import React, { useState } from "react";
import PopcornImage from "./PopcornImage";
import PopcornImageWrapper from "./PopcornImageWrapper";
import SortList from "./SortList";
import SortListWrapper from "./SortListWrapper";

const SideBar = (props) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <>
      <PopcornImageWrapper
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      >
        <PopcornImage />
      </PopcornImageWrapper>
      <SortListWrapper
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      >
        <SortList {...props} />
      </SortListWrapper>
    </>
  );
};

export default SideBar;
