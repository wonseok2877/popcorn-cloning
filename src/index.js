import reactDom from "react-dom";
import App from "./App";

/* execution context관점에서
1. index부터 실행하는 것 같다. 그러므로 global execution context는 여기서부터
2. App함수가 인자값으로써 호출되면, 제어권을 가진 reactDom.render() 함수가 
App의 return값을 갖고 프론트에 렌더링한다. 달리 말하면 html파일의 #root 요소에
넣는다. */

/* reactDom.render()
? : React가 여기서부터 개입하는건가?
? : 결국 createElement와 appendChild 함수를 쓰는 JS의 DOM과 같은 원리인가?
? : virtual Dom개념. 이전 state와 이후 state의 비교.

 */

const element = <App />;

const container = document.querySelector("#root");

reactDom.render(element, container);
