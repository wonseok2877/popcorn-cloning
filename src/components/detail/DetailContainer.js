import React from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";
import TextDate from "../TextDate";
import TextGenre from "../TextGenre";
import TextOverview from "../TextOverview";
import { Link } from "react-router-dom";
import CinzelTitle from "../title/CinzelTitle";

const DetailContainer = ({
  detail: {
    title,
    name,
    release_date,
    first_air_date,
    last_air_date,
    genres,
    overview,
    videos,
    backdrop_path,
    homepage,
    production_companies,
    tagline,
    runtime,
    episode_run_time,
    seasons,
  },
  creditList,
  isVideoFocused,
  isCreditSelected,
  handleVideoClick,
  handleCreditClick,
  handleTagClick,
  isPulse,
}) => {
  return (
    <>
      <div className="flex">
        <img
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt="backdrop"
          style={{ height: "92vh" }}
          className="absolute w-screen"
        />
        <div
          className={`z-0 w-full p-8  text-white bg-black ${
            isVideoFocused ? "bg-opacity-90" : "bg-opacity-50 "
          } ${isPulse && "animate-pulse"} `}
          style={{ height: "92vh" }}
        >
          <div className="flex justify-between items-center">
            <div>
              <a
                href={homepage ? homepage : null}
                target="_blank"
                rel="noopener noreferrer"
                title="home page"
              >
                <CinzelTitle>{title ? title : name}</CinzelTitle>
              </a>
              <div
                className={`${
                  title ? "w-32" : "w-80"
                } flex items-center justify-between`}
              >
                <TextDate>
                  {release_date
                    ? release_date.substring(0, 4)
                    : first_air_date.substring(0, 4) +
                      " ~ " +
                      last_air_date.substring(0, 4)}
                </TextDate>
                {seasons && <span>{seasons[seasons.length - 1].name}</span>}
                {runtime ? (
                  <span>{runtime} min</span>
                ) : episode_run_time ? (
                  <span>
                    {episode_run_time[episode_run_time.length - 1]} min
                  </span>
                ) : null}
              </div>
            </div>
            {production_companies?.length > 0 &&
              production_companies[0].logo_path && (
                <img
                  src={`https://image.tmdb.org/t/p/original/${production_companies[0].logo_path}`}
                  alt="logo"
                  className="w-40 h-28 mx-10"
                  title={`${production_companies[0].name}`}
                />
              )}
          </div>
          <div className="my-10">
            {genres.map((g, index) => (
              <TextGenre key={index}>{g.name}</TextGenre>
            ))}
          </div>
          <div className="my-8 ">
            {tagline && (
              <h1 className="text-3xl bg-gradient-to-r from-transparent via-indigo-200 to-transparent hover:opacity-100 transition-opacity ease-linear duration-500">
                <i className="fas fa-quote-left relative -top-5 text-sm"></i>
                <span className="mx-8">{tagline}</span>
              </h1>
            )}
            <TextOverview>{overview.substring(0, 300)}...</TextOverview>
          </div>
          <div className="h-80 w-24 pt-4 flex flex-col justify-between items-center">
            <i
              onClick={handleVideoClick}
              className={`fas z-20 w-16 h-16  ml-3 text-7xl cursor-pointer ${
                isVideoFocused ? "fa-pause animate-pulse" : "fa-play"
              }`}
              title="trailer"
            />
            {videos && videos.results.length > 0 && isVideoFocused && (
              <YouTube
                videoId={videos.results[0].key}
                // React Youtube 라이브러리 props
                opts={{ playerVars: { autoplay: 1 } }}
                className="w-full h-screen absolute -top-2 left-0 z-10"
              />
            )}
            <div className="w-full flex justify-between items-center">
              <i
                className="fas fa-users text-7xl cursor-pointer"
                onClick={handleCreditClick}
                title="credits"
              />
              {creditList.length > 0 && (
                <div
                  className={`z-0 relative ml-10 mb-7 flex opacity-0 ${
                    isCreditSelected ? "opacity-100" : ""
                  } transition-opacity ease-in-out duration-300`}
                >
                  {creditList.map((cast, index) => (
                    <Link
                      to={`/people/${cast.id}`}
                      key={index}
                      className="w-20 h-20 mr-6 "
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                        alt="profile"
                        // onLoad event listener
                        onLoad={(event) => {
                          event.target.style.opacity = 100;
                        }}
                        className={`rounded-md opacity-0 transition-opacity ease-in-out duration-300 `}
                        title={cast.original_name}
                      />
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <i
              className="fas fa-hashtag text-7xl cursor-pointer"
              onClick={handleTagClick}
              title="keywords"
            ></i>
          </div>
        </div>
      </div>
    </>
  );
};

DetailContainer.propTypes = {
  detail: PropTypes.shape({
    title: PropTypes.string,
    name: PropTypes.string,
    release_date: PropTypes.string,
    first_air_date: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    overview: PropTypes.string,
    videos: PropTypes.shape({
      results: PropTypes.arrayOf(
        PropTypes.shape({
          key: PropTypes.string,
        })
      ),
    }),
    backdrop_path: PropTypes.string,
    homepage: PropTypes.string,
    production_companies: PropTypes.arrayOf(
      PropTypes.shape({
        logo_path: PropTypes.string,
        name: PropTypes.string,
      })
    ),
    tagline: PropTypes.string,
    runtime: PropTypes.number,
    episode_run_time: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
  isVideoFocused: PropTypes.bool.isRequired,
  handleVideoClick: PropTypes.func.isRequired,
};

export default DetailContainer;
