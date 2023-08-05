import React from "react";
import "./Spotcard.css";
import { useHistory } from "react-router-dom";
import { useRef } from "react";
import { Tooltip } from "react-tooltip";

function Spotcard({ spot }) {
  const history = useHistory();
  const ref = useRef(null);

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
        className="components-border hover-cursor-pointer tooltip"
        onClick={goToSpotDetail}
        // data-tooltip-content={spot.name}
        // data-tooltip-id="spot-card-tooltip"
      >
        {/* <h1>Spotcard{spot.id}</h1> */}
        <img src={spot.previewImage} alt={spot.name}></img>
        <h2 className="tooltip">
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
        <div class="tooltip-text">{spot.name}</div>
      </section>
      {/* <Tooltip
        id="spot-card-tooltip"
        place="bottom"
        type="dark"
        effect="float"
      /> */}
    </>
  );
}

export default Spotcard;
