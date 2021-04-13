import { createContext, useState } from "react";

export const infoContext = createContext();

/* Context API 개념
? : createContext()의 기능은?
? : Provider method의 기능은? */

const InfoContextProvider = (props) => {
  const [globalFocus, setGlobalFocus] = useState("MOVIE");
  return (
    <infoContext.Provider value={{ globalFocus, setGlobalFocus }}>
      {props.children}
    </infoContext.Provider>
  );
};

export default InfoContextProvider;
