import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import peopleApi from "../apis/peopleApi";

const PeoplePage = () => {
  // useState
  const [peopleResults, setPeopleResults] = useState([]);
  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { results },
      } = await peopleApi.popular();
      setPeopleResults(results);
    };
    fetchData();
  }, []);
  console.log(peopleResults);
  return (
    <>
      {peopleResults.map((person, index) => (
        <div className="flex" key={index}>
          <Link to={`/people/${person.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
              alt="person"
              className="w-40 h-40"
            />
          </Link>
          <span>{person.name}</span>
          <span>{person.popularity}</span>
          {person.known_for?.map((known, index) => (
            <Link
              to={
                known.media_type === "movie"
                  ? `/movie/${known.id}`
                  : `/tv/${known.id}`
              }
              key={index}
            >
              <div>
                <span>{known.title}</span>
                <img
                  src={`https://image.tmdb.org/t/p/original${known.poster_path}`}
                  alt="known"
                  className="w-40 h-40"
                />
              </div>
            </Link>
          ))}
        </div>
      ))}
    </>
  );
};

export default PeoplePage;
