import React from "react";

const PosterImage = ({ poster_path, imageSize }) => {
  return (
    <>
      {poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt="backdrop"
          style={{
            width: imageSize,
            height: imageSize * 1.5,
          }}
          onLoad={(event) => {
            event.target.style.opacity = 100;
          }}
          className="opacity-0 transition-opacity ease-in-out duration-500"
        />
      ) : (
        <article
          style={{
            width: imageSize,
            height: imageSize * 1.5,
            backgroundColor: "gray",
          }}
        />
      )}
    </>
  );
};

export default PosterImage;
