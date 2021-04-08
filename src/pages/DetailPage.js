import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import movieApi from "../apis/movieApi";
import tvApi from "../apis/tvApi";
import ContentBox from "../components/ContentBox";
import ContentsContainer from "../components/ContentsContainer";
import DetailContainer from "../components/DetailContainer";
import PageContainer from "../components/PageContainer";
import TextTitle from "../components/TextTitle";
import { infoContext } from "../context/InfoContext";

const DetailPage = () => {
  // useParams
  const { id } = useParams();
  const { pathname } = useLocation();
  // useState
  const [detail, setDetail] = useState({});
  const [similarList, setSimilar] = useState({});
  const [keywords, setKewords] = useState([]);
  const [listByKeyword, setListByKeyword] = useState([]);
  const [creditList, setCreditList] = useState([]);
  // conditional state
  const [isVideoFocused, setIsVideoFocused] = useState(false);
  const [isPulse, setIsPulse] = useState(true);
  const [currentContent, setCurrentContent] = useState("similar");
  const [isCreditSelected, setIsCreditSelected] = useState(false);
  // useContext : 현재 영화인지 티비인지 boolean 값 state
  const { isMovie, setIsMovie } = useContext(infoContext);
  // useEffect : 마운팅 이후 params의 id를 인식한 단계
  useEffect(() => {
    // 함수 정의 : params의 id에 따라 요청
    const fetchData = async () => {
      // try & catch. block scope가 구체적일수록 좋은 듯.
      try {
        // conditional : location이 tv냐 movie냐에 따라서 setState
        if (pathname.includes("movie")) {
          // async request : movieApi객체의 method들
          const { data } = await movieApi.movieById(id);
          const {
            data: { results },
          } = await movieApi.similarById(id, 1);
          const {
            data: { keywords },
          } = await movieApi.keywordsById(id);
          // setState
          setDetail(data);
          setKewords(keywords);
          setSimilar(results);
        } else if (pathname.includes("tv")) {
          const { data } = await tvApi.tvById(id);
          const {
            data: { results },
          } = await tvApi.similarById(id, 1);
          const {
            data: { results: keywords },
          } = await tvApi.keywordsById(id);
          // setState
          setIsMovie(false);
          setDetail(data);
          setSimilar(results);
          setKewords(keywords);
        } else {
          throw new Error("there is no such path.");
        }
      } catch (error) {
        console.log(error);
      }
    };
    // 함수 호출
    fetchData();
  }, [id, pathname, isMovie]);

  // useEffect : data fetch된 data를 setState했을 때 side effect.
  useEffect(() => {
    // ! : mounting때의 window scroll은 없다. 그래서 처음엔 scroll이 안됨.
    window.scroll({
      top: 168,
      behavior: "smooth",
    });
    // if : detail property가 있는지, 즉 data가 실제로 온 이후에 setTimeOut.
    if (detail.id) {
      // setState
      setTimeout(() => setIsPulse(false), 2100);
    }
    return () => setIsPulse(true);
  }, [detail]);
  console.log("rendered.");
  console.log(detail);
  console.log(creditList);
  // 함수 정의 : event handler
  const handleKeywordClick = async (keywordId, keywordName) => {
    const {
      data: { results },
    } = await movieApi.discoverByKeyword(keywordId);
    // setState
    setListByKeyword(results);
    // if : 현재 similar contents를 띄우는 중인 경우
    if (currentContent) setCurrentContent(keywordName);
  };
  const handleVideoClick = () => {
    isVideoFocused ? setIsVideoFocused(false) : setIsVideoFocused(true);
  };
  const handleCreditClick = async () => {
    // if : credit data를 이미 받아온 경우엔 request 안함.
    if (creditList.length === 0) {
      try {
        if (isMovie) {
          console.log("function executed.");
          const {
            data: { cast },
          } = await movieApi.credits(id);
          setCreditList(cast.filter((item, index) => index <= 5));
        } else {
          const {
            data: { cast },
          } = await tvApi.credits(id);
          setCreditList(cast.filter((item, index) => index <= 5));
        }
      } catch (error) {
        console.log(error);
      }
    }
    // if : 온오프
    if (isCreditSelected) setIsCreditSelected(false);
    else setIsCreditSelected(true);
  };
  return (
    <>
      {detail.videos ? (
        <DetailContainer
          detail={detail}
          creditList={creditList}
          isVideoFocused={isVideoFocused}
          isCreditSelected={isCreditSelected}
          handleVideoClick={handleVideoClick}
          handleCreditClick={handleCreditClick}
          isPulse={isPulse}
        />
      ) : (
        <h1 className="w-screen h-screen flex justify-center items-center">
          loading...
        </h1>
      )}

      <PageContainer>
        {keywords?.length > 0 &&
          keywords.map((k, index) => (
            <button
              onClick={() => handleKeywordClick(k.id, k.name)}
              className="mx-3 text-white"
              key={index}
            >
              <i className="fas fa-hashtag"></i> {k.name}
            </button>
          ))}
        <TextTitle>
          {currentContent === "similar" ? (
            isMovie ? (
              "similar movies"
            ) : (
              "similar shows"
            )
          ) : (
            <h1>
              <i className="fas fa-hashtag mx-3 -mt-5"></i>
              {currentContent}
            </h1>
          )}
        </TextTitle>
        <ContentsContainer>
          {currentContent === "similar"
            ? similarList.length > 0 &&
              similarList.map((s, index) => (
                <ContentBox key={index} content={s} isMovie={isMovie} />
              ))
            : listByKeyword.length > 0 &&
              listByKeyword.map((l, index) => (
                <ContentBox key={index} content={l} isMovie={isMovie} />
              ))}
        </ContentsContainer>
      </PageContainer>
    </>
  );
};

export default DetailPage;
