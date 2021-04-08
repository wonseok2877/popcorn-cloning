import React from "react";
import PropTypes from "prop-types";
import MyButton from "./MyButton";
import MyButtonDiv from "./MyButtonDiv";

const TvSortButton = ({
  requestAndDispatch: { airingToday, popular, topRated },
  currentType,
}) => (
  <MyButtonDiv>
    <MyButton dispatch={airingToday} isCurrent={currentType === "airing-today"}>
      airingToday
    </MyButton>
    <MyButton dispatch={popular} isCurrent={currentType === "popular"}>
      popular
    </MyButton>
    <MyButton dispatch={topRated} isCurrent={currentType === "top-rated"}>
      topRated
    </MyButton>
  </MyButtonDiv>
);

TvSortButton.propTypes = {
  requestAndDispatch: PropTypes.shape({
    airingToday: PropTypes.func,
    popular: PropTypes.func,
    topRated: PropTypes.func,
  }).isRequired,
  currentType: PropTypes.string,
};

export default TvSortButton;
