import React from "react";
import { Link } from "react-router-dom";
import RelativeDiv from "./RelativeDiv";
import AbsoluteDiv from "./AbsoluteDiv";
import PropTypes from "prop-types";
import Star from "./Star";
import CinzelText from "../title/CinzelText";
import PosterImage from "./PosterImage";

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
  contentType,
  imageSize,
}) => {
  console.log(contentType);
  return (
    <>
      {contentType === "MOVIE" ? (
        <Link to={`/movie/${id}`}>
          <RelativeDiv>
            <PosterImage poster_path={poster_path} imageSize={imageSize} />
            <AbsoluteDiv>
              <CinzelText>
                {title.length > 30 ? title.substring(0, 30) + "..." : title}
              </CinzelText>
              <span>
                {first_air_date
                  ? first_air_date.substring(0, 4)
                  : release_date?.substring(0, 4)}
              </span>
              <div>
                <Star voteAverage={vote_average} />
                {vote_count > 0 && (
                  <span className="text-sm">({vote_count})</span>
                )}
              </div>
            </AbsoluteDiv>
          </RelativeDiv>
        </Link>
      ) : (
        contentType === "TV_SHOWS" && (
          <Link to={`/tv/${id}`}>
            <RelativeDiv>
              <PosterImage poster_path={poster_path} imageSize={imageSize} />
              <AbsoluteDiv>
                <CinzelText>
                  {name
                    ? name.length > 30
                      ? name.substring(0, 30) + "..."
                      : name
                    : title.length > 30
                    ? title.substring(0, 30) + "..."
                    : title}
                </CinzelText>
                <span>
                  {first_air_date
                    ? first_air_date.substring(0, 4)
                    : release_date?.substring(0, 4)}
                </span>
                <div>
                  <Star voteAverage={vote_average} />
                  {vote_count > 0 && (
                    <span className="text-sm">({vote_count})</span>
                  )}
                </div>
              </AbsoluteDiv>
            </RelativeDiv>
          </Link>
        )
      )}
    </>
  );
};
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
  contentType: PropTypes.string.isRequired,
};

export default ContentBox;
