import React from "react";
import PropTypes from "prop-types";
import MyButton from "./MyButton";
import MyButtonDiv from "./MyButtonDiv";

const MovieSortButton = ({
  requestAndDispatch: { nowPlaying, upComing, popular, topRated },
  currentType,
}) => {
  return (
    <>
      <MyButtonDiv>
        <MyButton
          dispatch={nowPlaying}
          isCurrent={currentType === "Now-Playing"}
        >
          Now Playing
        </MyButton>
        <MyButton dispatch={upComing} isCurrent={currentType === "Up-Coming"}>
          Up Coming
        </MyButton>
        <MyButton dispatch={popular} isCurrent={currentType === "Popular"}>
          Popular
        </MyButton>
        <MyButton dispatch={topRated} isCurrent={currentType === "Top-Rated"}>
          Top Rated
        </MyButton>
      </MyButtonDiv>
    </>
  );
};

MovieSortButton.propTypes = {
  requestAndDispatch: PropTypes.shape({
    nowPlaying: PropTypes.func,
    upComing: PropTypes.func,
    popular: PropTypes.func,
    topRated: PropTypes.func,
  }).isRequired,
  currentType: PropTypes.string.isRequired,
};

export default MovieSortButton;
