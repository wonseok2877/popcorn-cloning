import { useContext } from "react";
import { Link } from "react-router-dom";
import { infoContext } from "../../context/InfoContext";
import NavLinkBox from "./NavLinkBox";

const NavBar = () => {
  const { globalFocus, setGlobalFocus } = useContext(infoContext);
  return (
    <>
      <NavLinkBox>
        <Link
          to="/"
          onClick={() => setGlobalFocus("MOVIE")}
          className={`pb-1 mr-5 border-b-4 border-transparent ${
            globalFocus === "MOVIE" && "border-blue-500"
          } text-white transition-all ease-linear duration-500`}
          style={{ fontFamily: "Carter One, cursive" }}
        >
          Movies
        </Link>
        <Link
          to="/tv"
          onClick={() => setGlobalFocus("TV_SHOWS")}
          className={`pb-1 mr-5 border-b-4 border-transparent ${
            globalFocus === "TV_SHOWS" && "border-blue-500"
          } text-white transition-all ease-linear duration-500`}
          style={{ fontFamily: "Carter One, cursive" }}
        >
          TV shows
        </Link>
        <Link
          to="/people"
          onClick={() => setGlobalFocus("PEOPLE")}
          className={`pb-1 mr-5 border-b-4 border-transparent ${
            globalFocus === "PEOPLE" && "border-blue-500"
          } text-white transition-all ease-linear duration-500`}
          style={{ fontFamily: "Carter One, cursive" }}
        >
          People
        </Link>
      </NavLinkBox>
    </>
  );
};

export default NavBar;
