import React from "react";
import InfoContextProvider from "./context/InfoContext";
import Router from "./Router";
import "./styles/style.css";
import "./styles/custom.css";

/* App function
pure function이다. 다른 component함수들을 자식으로써 호출하고,
그 return값들을 fragment로 싼 하나의 값을 return한다. 
! : 다른 method들처럼, Component들도 그 안에 자식이 얼마나 있든
하나의 값을 return하도록 약속이 되어있는 것 같다. */

const App = () => (
  <>
    <InfoContextProvider>
      <Router />
    </InfoContextProvider>
  </>
);

export default App;
