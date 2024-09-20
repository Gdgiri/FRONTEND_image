import React from "react";

const Cards = ({ ele }) => {
  return (
    <div className="card" style={{ width: "18rem", marginBottom: "1rem" }}>
      <div className="card-body">
        <img src={ele.imgUrl} alt="photo" style={{ width: "100%" }} />
      </div>
      <div className="card-body">
        <video src={ele.videoUrl} controls style={{ width: "100%" }} />
      </div>
    </div>
  );
};

export default Cards;
