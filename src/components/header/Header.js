import { useContext } from "react";
import { Link } from "react-router-dom";
import { infoContext } from "../../context/InfoContext";
import HeaderWrapper from "./HeaderWrapper";
import Logo from "./Logo";
import SearchForm from "./SearchForm";

const Header = () => {
  const { globalFocus } = useContext(infoContext);
  return (
    <HeaderWrapper>
      <Logo globalFocus={globalFocus} />
      <div className="flex items-center">
        <Link to="/user" className="z-10 text-white">
          <i class="fas fa-history text-3xl mr-5"></i>
        </Link>
        <SearchForm />
      </div>
    </HeaderWrapper>
  );
};

export default Header;
