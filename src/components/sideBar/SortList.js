import React from "react";
import SortButton from "./SortButton";
import TextSortBy from "./TextSortBy";

const SortList = ({ requestAndDispatch, sortType, genres }) => {
  return (
    <>
      <TextSortBy>Sort By</TextSortBy>
      <SortButton
        handleClick={() => {
          // window scroll auto !
          window.scroll({
            top: 0,
            behavior: "auto",
          });
          requestAndDispatch.popular();
        }}
        isCurrent={sortType === "Popular"}
      >
        Popular
      </SortButton>
      <SortButton
        handleClick={() => {
          window.scroll({
            top: 0,
            behavior: "auto",
          });
          requestAndDispatch.topRated();
        }}
        isCurrent={sortType === "Top-Rated"}
      >
        Top Rated
      </SortButton>
      {requestAndDispatch.airingToday && (
        <SortButton
          handleClick={() => {
            window.scroll({
              top: 0,
              behavior: "auto",
            });
            requestAndDispatch.airingToday();
          }}
          isCurrent={sortType === "airing-today"}
        >
          Airing Today
        </SortButton>
      )}
      {genres?.map((genre, index) => (
        <SortButton
          handleClick={() => {
            window.scroll({
              top: 0,
              behavior: "auto",
            });
            requestAndDispatch.discoverByGenre(genre.name);
          }}
          isCurrent={sortType === genre.name}
          key={index}
        >
          {genre.name}
        </SortButton>
      ))}
    </>
  );
};

export default SortList;
