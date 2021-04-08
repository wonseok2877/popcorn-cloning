import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";

const Header = () => {
  // useState : input의 텍스트를 다룸. string값.
  const [inputText, setInputText] = useState("");
  // 변수 정의 : useHistory 값
  const history = useHistory();
  const { pathname } = useLocation();
  // useEffect : history.listen function call
  useEffect(() => {
    // ! : history.listen함수로 useLocation을 대체할 수 있음. HTML5 API의 기능.
    if (!pathname.includes("/search")) setInputText("");
    else return;
  }, [pathname]);

  // 함수 정의 : submit할 때 실행
  const handleSubmit = (e) => {
    e.preventDefault();
    // fuction call : react-router로 url을 움직인다.
    history.push(`/search/${inputText}`);
  };
  return (
    <div className="flex justify-between items-center bg-black">
      <Link to="/">
        <img
          src="https://popcorntime-online.ch/css/images/logo.svg"
          alt="popcorn-time"
          className="w-80 h-32 ml-10"
        />
      </Link>
      <form onSubmit={(e) => handleSubmit(e)} className="text-center pt-5 pb-5">
        <input
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          type="text"
          placeholder="search for..."
          className="p-3 mr-10 text-xl"
        />
      </form>
    </div>
  );
};

export default Header;
