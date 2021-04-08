import { tmdbAxios } from "./tmdb";

const movieApi = {
  // 페이지 숫자를 인자값으로 받아서
  nowPlaying: (page) =>
    tmdbAxios.get("movie/now_playing", {
      params: {
        page,
      },
    }),
  upComing: (page) =>
    tmdbAxios.get("movie/upcoming", {
      params: {
        page,
      },
    }),
  topRated: (page) =>
    tmdbAxios.get("movie/top_rated", {
      params: {
        page,
      },
    }),
  popular: (page) =>
    tmdbAxios.get("movie/popular", {
      params: {
        page,
      },
    }),
  movieById: (id) =>
    tmdbAxios.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  search: (teeeeeerm, page) =>
    tmdbAxios.get("search/movie", {
      params: {
        query: teeeeeerm,
        page,
      },
    }),
  allGenres: () => tmdbAxios.get("/genre/movie/list"),
  keywordsById: (id) => tmdbAxios.get(`movie/${id}/keywords`),
  credits: (id) => tmdbAxios.get(`/movie/${id}/credits`),
  similarById: (id, page) =>
    tmdbAxios.get(`/movie/${id}/similar`, {
      params: {
        page,
      },
    }),
  discoverByKeyword: (with_keywords) =>
    tmdbAxios.get("discover/movie", {
      params: {
        with_keywords,
      },
    }),
  discoverByGenre: (with_genres, page) =>
    tmdbAxios.get("discover/movie", {
      params: {
        with_genres,
        page,
      },
    }),
};

export default movieApi;
