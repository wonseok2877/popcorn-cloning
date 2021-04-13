import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ globalFocus }) => (
  <>
    <Link
      to={
        globalFocus === "MOVIE"
          ? "/"
          : globalFocus === "TV_SHOWS"
          ? "/tv"
          : globalFocus === "PEOPLE" && "/people"
      }
    >
      <img
        src="https://popcorntime-online.ch/css/images/logo.svg"
        alt="popcorn-time"
        className="w-64 h-20"
      />
    </Link>
  </>
);

export default Logo;
