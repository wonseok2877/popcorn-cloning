import React from "react";

const Star = ({ voteAverage }) => {
  // 변수 정의.
  // 로직 전제 : data로 온 별점이 10점만점임.
  const voteNumber = voteAverage / 2;
  const fullStarNumber = Math.floor(voteNumber);
  const restStar = voteNumber - fullStarNumber >= 0.3;
  // loop : 숫자만큼 별을 array에 넣는다.
  let starArray = [];
  for (let i = 0; i < fullStarNumber; i++) {
    starArray.push(<i className="fas fa-star text-yellow-500" key={i}></i>);
  }
  return (
    <div>
      {starArray}
      {restStar && <i className="fas fa-star-half-alt text-yellow-500"></i>}
    </div>
  );
};

export default Star;
