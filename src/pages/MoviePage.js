import React, { useEffect, useState } from "react";
import movieApi from "../apis/movieApi";
import ContentBox from "../components/ContentBox";
import ContentsContainer from "../components/ContentsContainer";
import MovieSortButton from "../components/MovieSortButton";
import PageContainer from "../components/PageContainer";
import TextTitle from "../components/TextTitle";
import useContentsReducer from "../hooks/useContentsReducer";

/* movie page 로직
0. 함수 정의 :  JSX를 return하는 React의 component이다.
1. useState : 서버로부터 받은 data를 담을 변수들을 정의한다.
2. 함수 정의 : 서버로 axios함수로 asynchronous data fetching이후에
 setState. 이때 window.removeEventListener. 
 3. try & catch : 혹시 모를 error에 대비한다. 프론트 서버 작동이 아예 멈출 수 있기 떄문.
 4. event callback 함수 정의
 4-1. if : window객체의 정보로 스크롤이 가장 아래까지 내려갔을 떄를 인식할 수 있도록. 
 4-2. switch : 현재의 type에 따라서 어떤 장르의 다음 page를 request할지 정한다.
 4-3. 함수 호출
 4-3 : 인자값으로 현재 state값 + 1 값을 넣는다.
 5. useEffect
 5-1. 마운팅 단계 : 현재의 type이 없으므로 함수 호출. 요청과 setState.
 5-2. 페이지 혹은 type이 바뀔 때 : addEventListener을 새로 호출한다.
removeeventListener함수를 매번 setState할 떄마다 호출하기 때문.
? : dependency에 왜 useEffect scope안에서 호출하는 함수를 넣어야되는거야? */

// 함수 정의 : Component
const MoviePage = () => {
  // hook : useReducer을 씀. 그냥 useState.
  const { state, dispatch } = useContentsReducer();
  const [genres, setGenres] = useState([]);
  console.log(state);
  console.log(genres);
  // useEffect : 마운팅
  useEffect(() => {
    // 함수 호출 : data fetching과 setState를 hook쪽에서 다 해주므로 async 필요 없음. 기본 page를 1로.
    requestAndDispatch.allGenres();
    requestAndDispatch.popular();
  }, []);
  // useEffect : currentType과 page state의 변화를 dependency로.
  useEffect(() => {
    // addEventListner : 스크롤 이벤트
    window.addEventListener("scroll", handleScroll);
    // clean up : state가 바뀔 때 이전 state관련된 거 정리하기!
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state.currentType, state.page]);

  // 변수 정의 : 함수 property 갖고 있는 객체 할당
  const requestAndDispatch = {
    // ! : event handler로 바로 실행되는 함수의 첫번쨰 인자값은 항상 SyntheticBaseEvent여야 한다.
    // 그래서 버튼 쪽에서 ()=>식으로 함수를 넣어주면 event는 알아서 걸러진다.
    allGenres: async () => {
      try {
        const {
          data: { genres },
        } = await movieApi.allGenres();
        console.log(genres);
        setGenres(genres);
      } catch (error) {
        console.log(error.message);
      }
    },
    discoverByGenre: async (genreName, page = 1) => {
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
        switch (state.currentType) {
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
              state.currentType,
              state.page + 1
            );
        }
      };
      // ? : 애초에 왜 2번씩 호출되는건지 이유를 모르겠다.
      switchByType();
    }
  };

  return (
    <PageContainer>
      <MovieSortButton
        currentType={state.currentType}
        requestAndDispatch={requestAndDispatch}
      />
      {genres?.map((g) => (
        <button
          onClick={() => requestAndDispatch.discoverByGenre(g.name)}
          className="bg-white"
        >
          {g.name}
        </button>
      ))}
      <TextTitle>{state.currentType}</TextTitle>
      <ContentsContainer>
        {state.results?.length > 0 &&
          state.results.map((m, index) => (
            <ContentBox content={m} isMovie={true} key={index} />
          ))}
      </ContentsContainer>
    </PageContainer>
  );
};

export default MoviePage;
