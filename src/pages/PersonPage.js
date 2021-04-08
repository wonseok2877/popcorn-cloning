import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import peopleApi from "../apis/peopleApi";
import Loader from "../components/Loader";

const PersonPage = () => {
  // useParams
  const { id } = useParams();
  //   useState
  const [details, setDetails] = useState({});
  const [philmography, setPhilmography] = useState([]);
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await peopleApi.detail(id);
      const {
        data: { cast },
      } = await peopleApi.movieCredits(id);
      setPhilmography(cast);
      setDetails(data);
    };
    fetchData();
  }, []);
  console.log(details);
  console.log(philmography);
  return (
    <>
      {details.id ? (
        <div className="flex w-full bg-black text-white text-opacity-50">
          <img
            src={`https://image.tmdb.org/t/p/original/${details.profile_path}`}
            alt={details.name}
          />
          <div>
            <h1>{details.name}</h1>
            {details.homepage && (
              <a href={details.homepage}>
                <h1>home page!</h1>
              </a>
            )}
            <span>{details.biography}</span>
          </div>
        </div>
      ) : (
        <Loader />
      )}
      {philmography.length > 0 &&
        philmography.map((item, index) => (
          <Link
            to={item.title ? `/movie/${item.id}` : `/tv/${item.id}`}
            key={index}
          >
            <h1>{item.title ? item.title : item.name}</h1>
          </Link>
        ))}
    </>
  );
};

export default PersonPage;
