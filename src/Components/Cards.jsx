import React from "react";
import { Link } from "react-router-dom";

const Cards = ({ ele }) => {
  return (
    <>
      <div className="card" style={{ width: "85%", height: "60%" }}>
        <img
          src={ele.imgUrl}
          alt="photo"
          className="card-img-top"
          style={{ height: "50%", width: "50%" }} // Setting both height and width to 50%
        />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <button className="btn btn-primary ">
            <Link to="/video" className="text-white">
              Like
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Cards;
