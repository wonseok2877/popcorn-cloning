import { tmdbAxios } from "./tmdb";

const tvApi = {
  topRated: (page) =>
    tmdbAxios.get("tv/top_rated", {
      params: {
        page,
      },
    }),
  popular: (page) =>
    tmdbAxios.get("tv/popular", {
      params: {
        page,
      },
    }),
  airingToday: (page) =>
    tmdbAxios.get("tv/airing_today", {
      params: {
        page,
      },
    }),
  tvById: (id, page) =>
    tmdbAxios.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
        page,
      },
    }),
  search: (query, page) =>
    tmdbAxios.get("search/tv", {
      params: {
        query,
        page,
      },
    }),
  similarById: (id, page) =>
    tmdbAxios.get(`tv/${id}/similar`, {
      params: {
        page,
      },
    }),
  allGenres: () => tmdbAxios.get("/genre/tv/list"),
  keywordsById: (id) => tmdbAxios.get(`tv/${id}/keywords`),
  credits: (id) => tmdbAxios.get(`tv/${id}/credits`),
  discoverByKeyword: (with_keywords) =>
    tmdbAxios.get("discover/tv", {
      params: {
        with_keywords,
      },
    }),
  discoverByGenre: (with_genres, page) =>
    tmdbAxios.get("discover/tv", {
      params: {
        with_genres,
        page,
      },
    }),
};
export default tvApi;
