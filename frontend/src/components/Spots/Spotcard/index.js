import React from "react";
import "./Spotcard.css";
import { useHistory } from "react-router-dom";

function Spotcard({ spot }) {
  const history = useHistory();

  const goToSpotDetail = (e) => {
    e.preventDefault();
    history.push(`/spots/${spot.id}`);
  };

  let oldSpot = "";
  let newSpot = "";
  if (isNaN(spot.avgRating)) oldSpot = "hide";
  if (spot.avgRating > 0) newSpot = "hide";

  return (
    <>
      <section
        className="components-border hover-cursor-pointer"
        onClick={goToSpotDetail}
      >
        {/* <h1>Spotcard{spot.id}</h1> */}
        <img src={spot.previewImage} alt={spot.name}></img>
        <h2>
          {spot.id}
          {spot.city}, {spot.state}
        </h2>
        <div>
          <i className="fa-solid fa-star"></i>{" "}
          <span className={oldSpot}>{spot.avgRating}</span>{" "}
          <span className={newSpot}>New</span>
        </div>
        <div>
          <i className="fa-solid fa-dollar-sign"></i>
          {spot.price} night
        </div>
      </section>
    </>
  );
}

export default Spotcard;
