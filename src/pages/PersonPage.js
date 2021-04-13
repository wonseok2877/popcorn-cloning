import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import peopleApi from "../apis/peopleApi";
import ContentBox from "../components/contentBox/ContentBox";
import FullScreenCenter from "../components/FullScreenCenter";
import Loader from "../components/Loader";
import { infoContext } from "../context/InfoContext";

const PersonPage = () => {
  // useParams
  const { id } = useParams();
  //   useState
  const [details, setDetails] = useState({});
  const [philmography, setPhilmography] = useState([]);
  // useContext
  const { setGlobalFocus } = useContext(infoContext);
  // useEffect : mounting
  useEffect(() => {
    // 함수 정의 : asynchronous
    const fetchData = async () => {
      const { data } = await peopleApi.detail(id);
      const {
        data: { cast },
      } = await peopleApi.movieCredits(id);
      const arrByPopularity = cast.sort((a, b) => b.popularity - a.popularity);
      // setState
      setDetails(data);

      setPhilmography(arrByPopularity);
    };
    // function call
    fetchData();
    // window scroll method
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
    // setState
    //  부실하다ㅋㅋ
    setGlobalFocus("MOVIE");
  }, []);
  console.log(details);
  console.log(philmography);
  return (
    <>
      <Helmet>
        <title>Celebrity | Popcorn Time</title>
      </Helmet>
      <div className="pt-20 bg-black text-white">
        {details.id ? (
          <div className=" h-1/2 ml-4 flex flex-wrap">
            <img
              src={`https://image.tmdb.org/t/p/original/${details.profile_path}`}
              alt={details.name}
              className="w-1/4 h-1/2 mr-20"
            />
            <div className="mt-4">
              <h1 className="mb-5 text-5xl">{details.name}</h1>
              <h1 className="text-3xl my-3 text-gray-400">Place of birth</h1>
              <h3 className="mb-5 text-xl ">{details.place_of_birth}</h3>
              {details.homepage && (
                <a href={details.homepage}>
                  <h1>home page!</h1>
                </a>
              )}
              <h1 className="text-3xl text-gray-400 my-3">Biography</h1>
              <span> {details.biography}</span>
            </div>
          </div>
        ) : (
          <FullScreenCenter>
            <Loader />
          </FullScreenCenter>
        )}
        <h1 className="ml-4 text-3xl text-gray-400 my-3">Philmography</h1>
        <div className="flex flex-wrap justify-between ">
          {philmography.length > 0 &&
            philmography.map((item, index) => (
              <ContentBox
                content={item}
                contentType={item.title ? "MOVIE" : "TV_SHOWS"}
                imageSize={200}
                key={index}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default PersonPage;
