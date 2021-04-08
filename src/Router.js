import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import PeoplePage from "./pages/PeoplePage";
import PersonPage from "./pages/PersonPage";
import SearchPage from "./pages/SearchPage";
import TVPage from "./pages/TVPage";
import userPage from "./pages/UserPage";

/* 로직
1. BrowserRouter : 여러 페이지를 쓰기 위한 함수.
2. Switch : uru에 가장 먼저 match되는 하나의 component만 호출한다.
3. Route : 각 path에 대해 component를 할당한다.
4. Redirect : 기타등등 path가 들어가면 일단 movie page로 이동. 
 */

const Router = () => (
  <BrowserRouter>
    <Header />
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/movie" component={MoviePage} />
      <Route exact path="/movie/:id" component={DetailPage} />
      <Route exact path="/tv" component={TVPage} />
      <Route exact path="/tv/:id" component={DetailPage} />
      <Route exact path="/search/:term" component={SearchPage} />
      <Route exact path="/people" component={PeoplePage} />
      <Route exact path="/people/:id" component={PersonPage} />
      <Route exact path="/user" component={userPage} />
      <Redirect from="/*" to="/" />
    </Switch>
  </BrowserRouter>
);

export default Router;
