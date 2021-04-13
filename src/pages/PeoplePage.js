import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import peopleApi from "../apis/peopleApi";
import CarterTitle from "../components/title/CarterTitle";
import FullScreenCenter from "../components/FullScreenCenter";
import Loader from "../components/Loader";
import NavBar from "../components/navbar/NavBar";
import PageContainer from "../components/PageContainer";
import { Helmet } from "react-helmet";

const PeoplePage = () => {
  // useState
  const [page, setPage] = useState(1);
  const [peopleResults, setPeopleResults] = useState([]);
  // useEffect : mounting
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { results },
      } = await peopleApi.popular();
      setPeopleResults(results);
    };
    fetchData();
  }, []);
  // useEffect : people data state
  useEffect(() => {
    // 함수 정의
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY !== document.body.offsetHeight) {
        return;
      } else {
        // setState
        setPage((prev) => prev + 1);
      }
    };
    // event listener
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [peopleResults]);
  // useEffect : page state
  useEffect(() => {
    // 함수 정의
    const fetchData = async () => {
      const {
        data: { results },
      } = await peopleApi.popular(page);
      // setState
      setPeopleResults((prev) => [...prev, ...results]);
    };
    // function call
    if (page > 1) fetchData();
  }, [page]);
  console.log(peopleResults);
  return (
    <>
      <Helmet>
        <title>People | Popcorn Time</title>
      </Helmet>
      <NavBar />
      <PageContainer>
        <CarterTitle>Sorted by popularity</CarterTitle>
        <div className="flex flex-wrap justify-around">
          {peopleResults.length > 0 ? (
            peopleResults.map((person, index) => (
              <div className="flex ml-3" key={index}>
                <Link to={`/people/${person.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
                    alt="person"
                    className="w-72 h-96"
                  />
                  <span>{person.name}</span>
                </Link>
              </div>
            ))
          ) : (
            <FullScreenCenter>
              <Loader />
            </FullScreenCenter>
          )}
        </div>
      </PageContainer>
    </>
  );
};

export default PeoplePage;
