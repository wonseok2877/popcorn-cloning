import axios from "axios";

const coinAxios = axios.create({
  baseURL: "https://api.coinpaprika.com/v1",
  timeout: 10000,
  timeoutErrorMessage: "time out!",
});

const coinApi = {
  getTickers: () => coinAxios.get("/tickers"),
  getExchanges: () => coinAxios.get("/exchanges"),
  getCoins: () => coinAxios.get("/coins"),
};

export default coinApi;
