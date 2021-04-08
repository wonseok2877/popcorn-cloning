import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieApi from "../apis/movieApi";
import tvApi from "../apis/tvApi";
import ContentBox from "../components/ContentBox";
import ContentsContainer from "../components/ContentsContainer";
import Loader from "../components/Loader";

const SearchPage = () => {
  //   useState
  const [movieResults, setMovieResults] = useState([]);
  const [tvResults, setTvResults] = useState([]);
  const [loading, setLoading] = useState(false);
  //   useParams : url로 넣은 string값을 인식
  const { term } = useParams();

  // useEffect
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const {
          data: { results: movie },
        } = await movieApi.search(term);
        const {
          data: { results: tv },
        } = await tvApi.search(term);
        //  setState : 두 api에서 온 array를 한 array로 만들어 준다.
        setMovieResults(movie);
        setTvResults(tv);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // useEffect의 dependency : state만 trigger로 쓰라는 법 없음. term이 바뀔 때마다 effect 실행.
  }, [term]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>movie searched</h1>

          <ContentsContainer>
            {movieResults.length > 0 &&
              movieResults.map((m, index) => (
                <ContentBox content={m} isMovie={true} key={index} />
              ))}
          </ContentsContainer>
          <h1>Tv show searched</h1>
          <ContentsContainer>
            {tvResults.length > 0 &&
              tvResults.map((t, index) => (
                <ContentBox content={t} isMovie={true} key={index} />
              ))}
          </ContentsContainer>
        </>
      )}
    </>
  );
};

export default SearchPage;
