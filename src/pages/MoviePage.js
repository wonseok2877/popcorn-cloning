import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import movieApi from "../apis/movieApi";
import ContentBox from "../components/contentBox/ContentBox";
import ContentsContainer from "../components/ContentsContainer";
import NavBar from "../components/navbar/NavBar";
import PageContainer from "../components/PageContainer";
import SideBar from "../components/sideBar/SideBar";
import useContentsReducer from "../hooks/useContentsReducer";

/* state관리 실패
한 sort의 page를 넘긴 다음 sort를 바꾸면, 이 경우에는 이전 sort와 page를 기억해서
원래 sort의 그 다음 page state를 갖고 최종적으로 넣게 된다.
애초에 reducer을 섣불리 썼고, state와 useEffect에 미숙했다.
다 풀어헤쳐서 해결하고 싶다.
! : 한 함수에서는 하나의 역할만 실행해야 한다. */

// 함수 정의 : component
const MoviePage = () => {
  // hook : useReducer을 씀. 그냥 useState.
  const { state, dispatch } = useContentsReducer();
  const [genres, setGenres] = useState([]);
  console.log(state);
  // useEffect : 마운팅
  useEffect(() => {
    // 함수 호출 : data fetching과 setState를 hook쪽에서 다 해주므로 async 필요 없음. 기본 page를 1로.
    requestAndDispatch.allGenres();
    requestAndDispatch.popular();
  }, []);
  // useEffect : currentType과 page state의 변화를 dependency로.
  useEffect(() => {
    // 함수정의 : event callback
    const handleScroll = () => {
      // window object의 data들
      if (window.innerHeight + window.scrollY !== document.body.offsetHeight) {
        return;
      } else {
        // 로직 : 스크롤 이벤트마다 이 함수가 한 번씩만 실행되도록 해야 한다.
        // if : 스크롤 끝까지 내린 경우. innerHeight, scrollY, offsetHeight
        const switchByType = () => {
          // switch : 현재 type에 따라 분기 처리
          switch (state.sortType) {
            case "Now-Playing":
              // 인자값으로 현재 state의 page값을 참고해서 + 1. 즉 다음 페이지 요청.
              return requestAndDispatch.nowPlaying(state.page + 1);
            case "Up-Coming":
              return requestAndDispatch.upComing(state.page + 1);
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
    // addEventListner : 스크롤 이벤트와 함수 호출
    window.addEventListener("scroll", handleScroll);
    // clean up : state가 바뀔 때 이전 state관련된 거 정리하기!
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state.sortType, state.page]);

  // 변수 정의 : 함수 property 갖고 있는 객체 할당
  const requestAndDispatch = {
    // ! : event handler로 바로 실행되는 함수의 첫번쨰 인자값은 항상 SyntheticBaseEvent여야 한다.
    // 그래서 버튼 쪽에서 ()=>식으로 함수를 넣어주면 event는 알아서 걸러진다.
    allGenres: async () => {
      try {
        const {
          data: { genres },
        } = await movieApi.allGenres();
        setGenres(genres);
      } catch (error) {
        console.log(error.message);
      }
    },
    discoverByGenre: async (genreName, page = 1) => {
      // find method
      const { id } = genres.find((g) => g.name === genreName);
      try {
        const {
          data: { results },
        } = await movieApi.discoverByGenre(id, page);
        dispatch({ type: genreName, page, results });
      } catch (error) {
        console.log(error.message);
      }
    },
    nowPlaying: async (page = 1) => {
      try {
        const {
          data: { results },
        } = await movieApi.nowPlaying(page);
        dispatch({ type: "Now-Playing", page, results });
      } catch (error) {
        console.log(error.message);
      }
    },
    upComing: async (page = 1) => {
      try {
        const {
          data: { results },
        } = await movieApi.upComing(page);
        dispatch({ type: "Up-Coming", page, results });
      } catch (error) {
        console.log(error.message);
      }
    },
    popular: async (page = 1) => {
      try {
        const {
          data: { results },
        } = await movieApi.popular(page);
        dispatch({ type: "Popular", page, results });
      } catch (error) {
        console.log(error.message);
      }
    },
    topRated: async (page = 1) => {
      try {
        const {
          data: { results },
        } = await movieApi.topRated(page);
        dispatch({ type: "Top-Rated", page, results });
      } catch (error) {
        console.log(error.message);
      }
    },
  };

  return (
    <>
      <Helmet>
        <title>Movie | Popcorn Time</title>
      </Helmet>
      <NavBar />
      <PageContainer>
        <SideBar
          requestAndDispatch={requestAndDispatch}
          sortType={state.sortType}
          genres={genres}
        />
        <ContentsContainer>
          {state.results?.length > 0 &&
            state.results.map((item, index) => (
              <ContentBox
                content={item}
                contentType={"MOVIE"}
                imageSize={300}
                key={index}
              />
            ))}
        </ContentsContainer>
      </PageContainer>
    </>
  );
};

export default MoviePage;
