import { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { infoContext } from "../context/InfoContext";
import NavLinkBox from "./NavLinkBox";

const NavBar = () => {
  const { isMovie, setIsMovie } = useContext(infoContext);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.includes("movie")) setIsMovie(true);
    else if (pathname.includes("tv")) setIsMovie(false);
  }, [pathname]);
  const isMovieOrTv = pathname.includes("movie") || pathname.includes("tv");
  return (
    <>
      <div className="flex justify-between bg-current">
        <NavLinkBox>
          <Link
            to="/movie"
            className={isMovieOrTv && isMovie ? "text-white" : ""}
          >
            Movies
          </Link>
          <Link
            to="/tv"
            className={isMovieOrTv && !isMovie ? "text-white" : ""}
          >
            TV shows
          </Link>
        </NavLinkBox>
        <div>
          <Link to="/people" className="text-white">
            People
          </Link>
          <Link to="/user" className="text-white">
            User
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
