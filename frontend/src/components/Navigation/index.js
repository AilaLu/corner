import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = <ProfileButton />;
  }

  //if logged in, then can create spot
  let noCreateSpot = "create-spot";
  if (!sessionUser) noCreateSpot = "hide";

  return (
    <div className="components-border navigation">
      <div className="flex-space-between">
        <div className="logo hover-cursor-pointer">
          <NavLink exact to="/">
            <i className="fa-solid fa-tree"></i>
            <h4 className="logo-text ">Corner</h4>
          </NavLink>
        </div>
        <div className="createSpot-profileBtn">
          <div className={noCreateSpot}>
            <NavLink to="/spots/new">Create a new spot</NavLink>
          </div>
          <div className="profile-btn">{isLoaded && sessionLinks}</div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
