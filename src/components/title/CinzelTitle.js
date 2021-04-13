import React from "react";

const CinzelTitle = ({ children }) => {
  return (
    <div className="text-6xl" style={{ fontFamily: "Cinzel, serif" }}>
      {children}
    </div>
  );
};

export default CinzelTitle;
