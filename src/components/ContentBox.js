import React from "react";
import { Link } from "react-router-dom";
import { RelativeDiv, AbsoluteDiv } from "./FlexBoxes";
import PropTypes from "prop-types";

const ContentBox = ({
  content: {
    id,
    title,
    name,
    vote_average,
    vote_count,
    release_date,
    first_air_date,
    poster_path,
  },
  isMovie,
}) => (
  <>
    {isMovie ? (
      <Link to={`/movie/${id}`}>
        <RelativeDiv>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w300/${poster_path}`
                : null
            }
            alt="backdrop"
          />
          <AbsoluteDiv>
            <span>{title}</span>
            <span>{release_date?.substring(0, 4)}</span>
            <div>
              <span>{vote_average}</span>
              <span>({vote_count})</span>
            </div>
          </AbsoluteDiv>
        </RelativeDiv>
      </Link>
    ) : (
      <Link to={`/tv/${id}`}>
        <RelativeDiv>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w300/${poster_path}`
                : null
            }
            alt="poster"
          />
          <AbsoluteDiv>
            <span>{name ? name : title}</span>
            <span>
              {first_air_date
                ? first_air_date.substring(0, 4)
                : release_date.substring(0, 4)}
            </span>
            <span>{vote_average}</span>
          </AbsoluteDiv>
        </RelativeDiv>
      </Link>
    )}
  </>
);
// proptypes 정의
// shape함수 : proptypes는 객체 안의 property는 인식하지 못하네.
ContentBox.propTypes = {
  content: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    name: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    first_air_date: PropTypes.string,
  }).isRequired,
  isMovie: PropTypes.bool.isRequired,
};

export default ContentBox;
