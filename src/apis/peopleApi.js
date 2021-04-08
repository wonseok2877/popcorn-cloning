import { tmdbAxios } from "./tmdb";

const peopleApi = {
  popular: (page = 1) =>
    tmdbAxios.get("/person/popular", {
      params: {
        page,
      },
    }),
  detail: (id) => tmdbAxios.get(`/person/${id}`),
  images: (id) => tmdbAxios.get(`/person/${id}/images`),
  movieCredits: (id) => tmdbAxios.get(`/person/${id}/movie_credits`),
};
export default peopleApi;
