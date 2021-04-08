import { useReducer } from "react";

const initialState = { currentType: "", page: 1, results: null };

const useContentsReducer = () => {
  /* 로직
  1. switch & case : dispatch로 type이 들어갈 때마다 switch문을 실행
  2. return : state에 새로운 주솟값 할당. action으로 들어간 모든 인자값을 넣는다.
  3. if conditional : action의 payload인 page가 기존 state의 page보다
  높을 경우 새로운 state를 return한다. 기존의 state객체를 spread하고 
  results array안에다가 기존의 results를 spread하고, action의 results를
  spread하여 새로운 array를  만든다.
  4. return 원리 : return하면 reducer함수는 끝나므로
  밑의 switch문은 실행되지 않는다. 
  
  ? : 더 좋은 방법은 없을까?
  ? : switch문을 잘 모르니까 헷갈린다.
  ? : 애초에 useReducer에 대한 이해가 부족하다. reducer은 그냥 함수라는 거.
  또한 return하는 객체는 state가 되고, dispatch로는 action을 보낸다는 것.
  결국 state와 setState인데, 조금 복잡해지니깐 바로 헷갈리는 거.
   */

  // 함수 정의 : reducer
  const reducer = (state, action) => {
    console.log(state);
    console.log(action);
    // destructuring
    const { type, page, results } = action;
    // 첫번째 분기 : type이 이전과 같은지 다른지에 따라서.
    if (type === state.currentType) {
      // 두번째 분기 : page가 이전과 같은지 다른지에 따라서.
      if (page === state.page + 1) {
        return {
          ...state,
          page,
          results: [...state.results, ...results],
        };
      } else {
        console.log("what the fuck?");
        return state;
      }
      // 세번째 분기 : action의 type이 기존 state의 type과 다른 경우
    } else {
      // 네번째 분기 switch : type에 따라서 state의 type을 아예 새롭게 만든다. 그래서 다음에 type과 state.type을 비교할 수 있게 된다.
      // 원래 case가 여러가지이지만, 귀찮아서 이렇게 바로 집어넣었다.
      switch (type) {
        case type:
          return {
            currentType: type,
            page,
            results,
          };
        default:
          if (!type) {
            throw new Error();
          }
      }
    }
  };

  // useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};
export default useContentsReducer;
