import axios from "axios";

/* 로직
1. axios.create : axios instance를 생성한다.
2. baseURL : tmdb사이트에서 api 제공하는 endpoint를 그대로 assign
3. params : API를 가져오는데 필요한 정보들을 넣어준다. 
? : language라는 params도 있는데, 여러가지 언어로 만들어보고 싶다. */

export const tmdbAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "bd4caebde93cff205b912a48554bbd5e",
  },
});
