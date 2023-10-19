import React from "react";
import "./AllSpotsHome.css";
import Spotcard from "../Spotcard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotsThunk } from "../../../store/spots";
// import { Tooltip } from "react-tooltip";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

function AllSpotsHome() {
  const spots = Object.values(
    useSelector((state) => (state.spots.allSpots ? state.spots.allSpots : []))
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpotsThunk());
  }, [dispatch]);

  return (
    <>
      {/* <h1 AllSpotsHome</h1> */}
      <div className="components-border spot-cards-grid-container">
        {spots.map((spot) => (
          <div className="spot-card" key={spot.id}>
            <div
            // data-tooltip-content={spot.name}
            // data-tooltip-id="spot-card-tooltip"
            >
              <Spotcard spot={spot} />
            </div>
            {/* <Tooltip
              id="spot-card-tooltip"
              place="bottom"
              type="dark"
              effect="float"
            /> */}
          </div>
        ))}
      </div>
    </>
  );
}

export default AllSpotsHome;
