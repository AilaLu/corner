// frontend/src/components/Navigation/ProfileButton.js
// Dropdown menu
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  // create a state variable called showMenu to control displaying the dropdown.
  // showMenu defaults to false indicating that the menu is hidden. When the ProfileButton is clicked, toggle showMenu to true indicating that the menu should now be shown.
  const ulRef = useRef();
  // To get the reference to the HTML element of the dropdown menu, you can use the useRef React hook. One of its uses include capturing the real DOM element that a virtual DOM element maps to. Call it in the component and attach the reference to the dropdown menu JSX element.

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  }; // Create a function called openMenu in the ProfileButton component. If showMenu is false, nothing should happen. If showMenu is true, then set the showMenu to true. When the profile button is clicked, it should call openMenu.

  useEffect(() => {
    if (!showMenu) return;
    // the listener should only be added when showMenu changes to true. Make sure to only add the event listener and return the cleanup function if showMenu is true. Add showMenu to the dependencies array for useEffect.

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
        // you want the dropdown menu to close only if the click happened OUTSIDE the dropdown.
        // To apply this logic, you can use the .contains method on an HTML element to check whether the target of a click event is in the boundaries of the HTML element.
      }
    };

    document.addEventListener("click", closeMenu);
    // Closing the dropdown menu on any click
    // Let's now make the dropdown menu close when anywhere outside the dropdown menu is clicked. To do this, you need to add an event listener to the entire document to listen to any click changes and set the showMenu state variable to false for any clicks outside of the dropdown menu.

    return () => document.removeEventListener("click", closeMenu);
    // The cleanup function for the useEffect should remove this event listener.
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    //once log out, go to the home page
    history.push("/");
    setShowMenu(false);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  //  Modify the return value of your functional component conditionally to either show or hide the menu based on the showMenu state variable using CSS.
  // For example, if the showMenu state variable is false, then apply a className of "hidden" to the dropdown menu element. Otherwise, don't apply that className. Add a .hidden CSS rule that will add a CSS style of display: none to the dropdown menu element.

  if (!user) {
    console.log("no user from Profile Button");
    return (
      <>
        <button
          className="profile-button black-line hover-cursor-pointer"
          onClick={openMenu}
        >
          <i className="fa-solid fa-bars"></i>{" "}
          <i className="fas fa-user-circle" />
        </button>
        <ul className={ulClassName} ref={ulRef}>
          <div className="signUp-logIn black-line">
            <li>
              <OpenModalButton
                buttonStyle="signUp-logIn-btn"
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
              />
            </li>
            <li>
              <OpenModalButton
                buttonStyle="signUp-logIn-btn"
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
              />
            </li>
          </div>
        </ul>
      </>
    );
  } else {
    return (
      <>
        <button
          className="profile-button black-line hover-cursor-pointer"
          onClick={openMenu}
        >
          <i className="fa-solid fa-bars"></i>{" "}
          <i className="fas fa-user-circle" />
        </button>
        <div className={`${ulClassName} black-line session-user`} ref={ulRef}>
          <div>Hello, {user.username}</div>
          <div>{user.email}</div>
          <div>
            <NavLink to="/spots/current">Manage Spots</NavLink>
          </div>
          <div>
            <button
              className="small grey button rounded hover-cursor-pointer"
              onClick={logout}
            >
              Log Out
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default ProfileButton;
