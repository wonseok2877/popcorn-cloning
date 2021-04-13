import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import movieApi from "../apis/movieApi";
import tvApi from "../apis/tvApi";
import ContentBox from "../components/contentBox/ContentBox";
import ContentsContainer from "../components/ContentsContainer";
import DetailContainer from "../components/detail/DetailContainer";
import DetailPageContainer from "../components/detail/DetailPageContainer";
import CarterTitle from "../components/title/CarterTitle";
import { infoContext } from "../context/InfoContext";
import Loader from "../components/Loader";
import saveLocalContentHistory from "../function/saveLocalHistory";
import FullScreenCenter from "../components/FullScreenCenter";
import scrollSmooth from "../function/scrollSmooth";
import { Helmet } from "react-helmet";

const DetailPage = () => {
  // reactRouterDom hooks
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
  const [currentContent, setCurrentContent] = useState("SIMILAR");
  const [isCreditSelected, setIsCreditSelected] = useState(false);
  // useContext : 현재 영화인지 티비인지 boolean 값 state
  const { globalFocus, setGlobalFocus } = useContext(infoContext);
  // useRef
  const tagDivRef = useRef();

  // useEffect : 마운팅 이후 params의 id를 인식한 단계
  useEffect(() => {
    // 함수 정의 : params의 id에 따라 요청
    const fetchData = async () => {
      // try & catch. block scope가 구체적일수록 좋은 듯.
      try {
        // conditional : location이 tv냐 movie냐에 따라서 setState
        if (pathname.includes("movie")) {
          // request promises : movieApi객체의 method들과 return값들
          const { data } = await movieApi.movieById(id);
          const {
            data: { results },
          } = await movieApi.similarById(id, 1);
          const {
            data: { keywords },
          } = await movieApi.keywordsById(id);

          // function call
          saveLocalContentHistory("movie-history", data);
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
          // function call
          saveLocalContentHistory("tv-history", data);
          // setState
          setGlobalFocus("TV_SHOWS");
          setDetail(data);
          setSimilar(results);
          setKewords(keywords);
        } else {
          throw new Error("there is no such path.");
        }
      } catch (error) {
        console.log(error);
      }
      // setState initialize
      setCreditList([]);
      setIsCreditSelected(false);
    };
    // 함수 호출
    fetchData();
  }, [id, pathname, globalFocus]);

  // useEffect : data fetch된 data를 setState했을 때 side effect.
  // ! : mounting때의 window scroll은 없다. 그래서 처음엔 scroll이 안됨.
  useEffect(() => {
    // function call
    scrollSmooth(0);
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
    setCurrentContent(keywordName);
  };
  const handleVideoClick = () => {
    isVideoFocused ? setIsVideoFocused(false) : setIsVideoFocused(true);
  };
  const handleCreditClick = async () => {
    // if : credit data를 이미 받아온 경우엔 request 안함.
    if (creditList.length === 0) {
      try {
        if (globalFocus === "MOVIE") {
          console.log("function executed.");
          const {
            data: { cast },
          } = await movieApi.credits(id);
          setCreditList(cast.filter((item, index) => index <= 6));
        } else {
          const {
            data: { cast },
          } = await tvApi.credits(id);
          setCreditList(cast.filter((item, index) => index <= 6));
        }
      } catch (error) {
        console.log(error);
      }
    }
    // if : boolean
    if (isCreditSelected) setIsCreditSelected(false);
    else setIsCreditSelected(true);
  };
  const handleTagClick = () => {
    // function call
    scrollSmooth(
      tagDivRef.current?.offsetTop - tagDivRef.current?.scrollHeight
    );
  };
  return (
    <>
      <Helmet>
        <title>Detail | Popcorn Time</title>
      </Helmet>
      <DetailPageContainer>
        {detail.videos ? (
          <DetailContainer
            detail={detail}
            creditList={creditList}
            isVideoFocused={isVideoFocused}
            isCreditSelected={isCreditSelected}
            isPulse={isPulse}
            handleVideoClick={handleVideoClick}
            handleCreditClick={handleCreditClick}
            handleTagClick={handleTagClick}
          />
        ) : (
          <FullScreenCenter>
            <Loader />
          </FullScreenCenter>
        )}
        <div ref={tagDivRef} className="flex flex-wrap">
          <span
            onClick={() => setCurrentContent("SIMILAR")}
            className="mx-3 mt-5 p-3 text-xl cursor-pointer text-white bg-gray-300 bg-opacity-30 rounded-full"
          >
            similar
          </span>
          {keywords?.length > 0 &&
            keywords.map((k, index) => (
              <span
                onClick={() => handleKeywordClick(k.id, k.name)}
                className="mx-3 mt-5 p-3 text-xl cursor-pointer text-white bg-gray-300 bg-opacity-30 rounded-2xl"
                key={index}
              >
                <i className="fas fa-hashtag"></i> {k.name}
              </span>
            ))}
        </div>
        <CarterTitle>
          {currentContent === "SIMILAR" ? (
            globalFocus === "MOVIE" ? (
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
        </CarterTitle>
        <ContentsContainer>
          {currentContent === "SIMILAR"
            ? similarList.length > 0 &&
              similarList.map((item, index) => (
                <ContentBox
                  content={item}
                  contentType={globalFocus}
                  imageSize={200}
                  key={index}
                />
              ))
            : listByKeyword.length > 0 &&
              listByKeyword.map((item, index) => (
                <ContentBox
                  content={item}
                  contentType={globalFocus}
                  imageSize={200}
                  key={index}
                />
              ))}
        </ContentsContainer>
      </DetailPageContainer>
    </>
  );
};

export default DetailPage;
