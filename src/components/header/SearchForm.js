import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

const SearchForm = () => {
  // useState : input의 텍스트를 다룸. string값.
  const [inputText, setInputText] = useState("");
  const [isSearchBar, setIsSearchBar] = useState(false);
  const inputRef = useRef();
  // 변수 정의 : useHistory 값
  const history = useHistory();
  // useEffect : pathname
  useEffect(() => {
    // ! : history.listen함수로 useLocation을 대체할 수 있음. HTML5 API의 기능.
    history.listen((location) => {
      if (!location.pathname.includes("/search")) setInputText("");
      else return;
    });
  }, [history]);
  // useEffect : state
  useEffect(() => {
    const { current } = inputRef;
    if (current) {
      current.focus();
      current.addEventListener("focusout", handleEvent.focusOut);
    }
    // clean up
    return () => current.removeEventListener("focusout", handleEvent.focusOut);
  }, [isSearchBar]);
  // 변수 정의 : 객체
  const handleEvent = {
    // 함수 정의 : submit할 때 실행
    submit: (event) => {
      event.preventDefault();
      // fuction call : react-router로 url을 움직인다.
      history.push(`/search/${inputText}`);
      setIsSearchBar(false);
    },
    change: (event) => {
      setInputText(event.target.value);
    },
    keyDown: (event) => {
      if (event.key === "Escape") setIsSearchBar(false);
      else return;
    },
    focusOut: () => {
      setIsSearchBar(false);
    },
    clickImoticon: () => {
      setIsSearchBar(true);
    },
  };
  return (
    <>
      <form
        onSubmit={(e) => handleEvent.submit(e)}
        className={`text-center ${
          isSearchBar ? "transform -translate-x-20 z-10" : "opacity-0"
        } absolute right-0 transition-all ease-in-out duration-500`}
      >
        <input
          value={inputText}
          ref={inputRef}
          onChange={handleEvent.change}
          onKeyDown={handleEvent.keyDown}
          className={`px-5 py-4 text-xl rounded-xl bg-gradient-to-r from-black to-gray-600 text-white cursor-default focus:outline-none `}
          type="text"
          placeholder="search for..."
          spellCheck="false"
        />
      </form>
      <i
        className={`fas fa-search z-0 px-3 py-2 text-3xl rounded-full text-white bg-gray-700 bg-opacity-0 hover:bg-opacity-100 transition-colors ease-in-out duration-300 ${
          isSearchBar && "opacity-0"
        }`}
        onClick={handleEvent.clickImoticon}
      ></i>
    </>
  );
};

export default SearchForm;
