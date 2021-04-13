// 함수 정의
const saveLocalContentHistory = (name, data) => {
  // method : getItem
  const currentItem = localStorage.getItem(name);
  // if : 현재 item이 있는 경우
  if (currentItem) {
    const parsedItem = JSON.parse(currentItem);
    const sameOne = parsedItem.find((item) => item.id === data.id);
    // if : 이미 같은 item이 있을 경우 setItem 실행 안함.
    if (sameOne) {
      return;
    } else {
      // unshift method : immutable이 아니므로 걍. 그리고 최신순으로 보여주고 싶으므로 push가 아닌 unshift.
      parsedItem.unshift(data);
      const jsonItem = JSON.stringify(parsedItem);
      localStorage.setItem(name, jsonItem);
    }
  } else {
    const newArr = Array.of(data);
    const jsonItem = JSON.stringify(newArr);
    localStorage.setItem(name, jsonItem);
  }
};

export default saveLocalContentHistory;
