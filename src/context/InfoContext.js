import { createContext, useState } from "react";

export const infoContext = createContext();

/* Context API 개념
? : 언제 필요한가? state를 서로 다른 페이지에서 공유하고 싶을 때?
? : createContext()의 기능은?
? : Provider method의 기능은? */

const InfoContextProvider = (props) => {
  const [isMovie, setIsMovie] = useState(true);
  return (
    <infoContext.Provider value={{ isMovie, setIsMovie }}>
      {props.children}
    </infoContext.Provider>
  );
};

export default InfoContextProvider;
