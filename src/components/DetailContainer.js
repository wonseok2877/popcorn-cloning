import React, { useEffect } from "react";
import PropTypes from "prop-types";
import YouTube from "react-youtube";

import TextDate from "./TextDate";
import TextTitle from "./TextTitle";
import BlackWhite from "./BlackWhite";
import TextGenre from "./TextGenre";
import TextOverview from "./TextOverview";
import { Link } from "react-router-dom";

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
  isPulse,
}) => {
  return (
    <>
      <BlackWhite>
        <img
          className="absolute w-screen z-0 h-full"
          src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
          alt="backdrop"
        />
        <div
          className={`z-10 text-white bg-black ${
            isVideoFocused ? "bg-opacity-90" : "bg-opacity-50 "
          } w-full p-8 ${isPulse && "animate-pulse"} `}
        >
          <div className="flex justify-between items-center">
            <div>
              <a
                href={homepage ? homepage : null}
                target="_blank"
                rel="noopener noreferrer"
                title="home page"
              >
                <TextTitle>{title ? title : name}</TextTitle>
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
          <button
            onClick={handleVideoClick}
            className="my-10 border-none focus:outline-none"
          >
            {isVideoFocused ? (
              <i className="fas fa-pause absolute z-20 text-7xl animate-pulse"></i>
            ) : (
              <i className="fas fa-play absolute z-20 text-7xl"></i>
            )}
          </button>
          <div className="flex justify-center items-center">
            {videos && videos.results.length > 0 && isVideoFocused && (
              <div className="flex flex-col">
                <YouTube
                  videoId={videos.results[0].key}
                  opts={{ playerVars: { autoplay: 1 } }}
                  className="w-screen relative z-0"
                />
              </div>
            )}
          </div>
          <button onClick={handleCreditClick}>
            <i className="fas fa-users text-7xl"></i>
          </button>
          {isCreditSelected && creditList && (
            <div className="flex">
              {creditList.map((cast, index) => (
                <Link to={`/people/${cast.id}`} key={index}>
                  <img
                    src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                    alt="profile"
                    className="w-20 h-20"
                  />
                  <span>{cast.character}</span>
                  <span>{cast.original_name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </BlackWhite>
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
