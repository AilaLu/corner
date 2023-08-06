import "./SignupForm.css";

//Render a form with controlled inputs for the new user's username, firstName, lastName, email, and password, and confirm password fields.

//On submit of the form, validate that the confirm password is the same as the password fields, then dispatch the signup thunk action with the form input values. Make sure to handle and display errors from the signup thunk action if there are any. If the confirm password is not the same as the password, display an error message for this.

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [frontendErrors, setFrontendErrors] = useState({});
  const { closeModal } = useModal();
  console.log(lastName);
  console.log(password);

  const hasErrors = Object.keys(errors).length > 0;
  let disableBtn = "big disabled button";
  if (!hasErrors) disableBtn = "big red button";

  useEffect(() => {
    const errors = {};
    if (!email) errors.email = "no email";
    if (!firstName) errors.firstName = "no fn";
    if (!lastName) errors.lastName = "no ln";
    if (!username) errors.username = "no un";
    if (username.length < 4) errors.username = "needs 4 charater";
    if (!password) errors.password = "no password";
    if (password.length < 6) errors.password = "needs 6 character";
    if (!confirmPassword) errors.confirmPassword = "no confrim password";
    setFrontendErrors(errors);
  }, [email, firstName, lastName, username, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      await dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
    setEmail("");
    setUsername("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <div className="errors">{errors.email && <p>{errors.email}</p>}</div>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <div className="errors">
          {errors.username && <p>{errors.username}</p>}
        </div>
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <div className="errors">
          {errors.firstName && <p>{errors.firstName}</p>}
        </div>
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <div className="errors">
          {errors.lastName && <p>{errors.lastName}</p>}
        </div>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <div className="errors">
          {errors.password && <p>{errors.password}</p>}
        </div>
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <div className="errors">
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>
        <button
          className={`${disableBtn} hover-cursor-pointer `}
          type="submit"
          disabled={hasErrors}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}

export default SignupFormModal;
