import React from "react";
import "./AllSpotsHome.css";
import Spotcard from "../Spotcard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getSpotsThunk } from "../../../store/spots";

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
      <ul className="components-border spot-cards">
        {spots.map((spot) => (
          <li className="spot-card" key={spot.id}>
            <Spotcard spot={spot} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default AllSpotsHome;
