import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import tvApi from "../apis/tvApi";
import ContentBox from "../components/contentBox/ContentBox";
import ContentsContainer from "../components/ContentsContainer";
import NavBar from "../components/navbar/NavBar";
import PageContainer from "../components/PageContainer";
import SideBar from "../components/sideBar/SideBar";
import { infoContext } from "../context/InfoContext";
import useContentsReducer from "../hooks/useContentsReducer";

const TVPage = () => {
  // useReducer Hook
  const { state, dispatch } = useContentsReducer();
  console.log(state);
  const [genres, setGenres] = useState([]);
  console.log(genres);
  const { setIsMovie } = useContext(infoContext);
  // useEffect : 마운팅 단계
  useEffect(() => {
    requestAndDispatch.allGenres();
    requestAndDispatch.airingToday(1);
  }, []);
  // useEffect : state의 변화에 따라서.
  useEffect(() => {
    // addEventListner : 스크롤 이벤트
    window.addEventListener("scroll", handleScroll);
    // clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state.sortType, state.page]);
  // 변수 정의 : 함수 property 가진 객체
  const requestAndDispatch = {
    allGenres: async () => {
      try {
        const {
          data: { genres },
        } = await tvApi.allGenres();
        setGenres(genres);
      } catch (error) {
        console.log(error.message);
      }
    },
    discoverByGenre: async (genreName, page = 1) => {
      const genre = genres.find((g) => g.name === genreName);
      try {
        const {
          data: { results },
        } = await tvApi.discoverByGenre(genre.id, page);
        dispatch({ type: genreName, page, results });
      } catch (error) {
        console.log(error.message);
      }
    },
    airingToday: async (page = 1) => {
      try {
        const {
          data: { results },
        } = await tvApi.airingToday(page);
        dispatch({ type: "airing-today", page, results });
      } catch (error) {
        console.log(error.message);
      }
    },
    popular: async (page = 1) => {
      try {
        const {
          data: { results },
        } = await tvApi.popular(page);
        dispatch({ type: "Popular", page, results });
      } catch (error) {
        console.log(error.message);
      }
    },
    topRated: async (page = 1) => {
      try {
        const {
          data: { results },
        } = await tvApi.topRated(page);
        dispatch({ type: "Top-Rated", page, results });
      } catch (error) {
        console.log(error.message);
      }
    },
  };
  // 함수 정의 : event callback
  const handleScroll = () => {
    // innerHeight, scrollY, offsetHeight
    if (window.innerHeight + window.scrollY < document.body.offsetHeight) {
      return;
    } else {
      // ? : 여기서 setTimeout함수를 호출하는 것보다 더 좋은 방법이 있을까? 0.1초라도 기다리게 되는게 맘에 안든다.
      const switchByType = () => {
        switch (state.sortType) {
          case "airing-today":
            return requestAndDispatch.airingToday(state.page + 1);
          case "Popular":
            return requestAndDispatch.popular(state.page + 1);
          case "Top-Rated":
            return requestAndDispatch.topRated(state.page + 1);
          default:
            return requestAndDispatch.discoverByGenre(
              state.sortType,
              state.page + 1
            );
        }
      };
      switchByType();
    }
  };
  console.log(state.results);
  return (
    <>
      <Helmet>
        <title>TV | Popcorn Time</title>
      </Helmet>
      <NavBar />
      <PageContainer>
        <SideBar
          requestAndDispatch={requestAndDispatch}
          sortType={state.sortType}
          genres={genres}
        />
        <ContentsContainer>
          {state.results &&
            state.results.map((t, index) => (
              <ContentBox
                content={t}
                contentType={"TV_SHOWS"}
                imageSize={300}
                key={index}
              />
            ))}
        </ContentsContainer>
      </PageContainer>
    </>
  );
};

export default TVPage;
