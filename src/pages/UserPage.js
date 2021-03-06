import CarterTitle from "../components/title/CarterTitle";
import ContentBox from "../components/contentBox/ContentBox";
import ContentsContainer from "../components/ContentsContainer";
import DetailPageContainer from "../components/detail/DetailPageContainer";
import { Helmet } from "react-helmet";

const UserPage = () => {
  const movieHistory = JSON.parse(localStorage.getItem("movie-history"));
  const tvHistory = JSON.parse(localStorage.getItem("tv-history"));
  return (
    <>
      <Helmet>
        <title>User | Popcorn Time</title>
      </Helmet>
      <DetailPageContainer>
        <CarterTitle>You watched ... </CarterTitle>
        <CarterTitle>Movies</CarterTitle>
        <ContentsContainer>
          {movieHistory?.length > 0 ? (
            movieHistory.map((item, index) => (
              <ContentBox
                content={item}
                contentType={"MOVIE"}
                imageSize={200}
                key={index}
              />
            ))
          ) : (
            <div>
              <i className="fas fa-grin-beam-sweat text-7xl" />
              <span className="text-3xl ml-3">No history.</span>
            </div>
          )}
        </ContentsContainer>
        <CarterTitle>TV shows</CarterTitle>
        <ContentsContainer>
          {tvHistory?.length > 0 ? (
            tvHistory.map((item, index) => (
              <ContentBox
                content={item}
                contentType={"TV_SHOWS"}
                imageSize={200}
                key={index}
              />
            ))
          ) : (
            <div>
              <i className="fas fa-grin-beam-sweat text-7xl" />
              <span className="text-3xl ml-3">No history.</span>
            </div>
          )}
        </ContentsContainer>
      </DetailPageContainer>
    </>
  );
};

export default UserPage;
