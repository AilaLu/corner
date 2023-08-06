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
  const { closeModal } = useModal();

  const hasErrors = Object.keys(errors).length > 0;
  let disableBtn = "big disabled button";
  if (!hasErrors) disableBtn = "big red button";

  useEffect(() => {
    const errors = {};
    if (!email) errors.email = "no email";
    if (!firstName) errors.firstName = "no fn";
    if (!lastName) errors.lastName = "no ln";
    if (!username) errors.username = "no un";
    if (!password) errors.password = "no password";
    if (!confirmPassword) errors.confirmPassword = "no confrim password";
    setErrors(errors);
  }, [email, firstName, lastName, username, password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
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
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
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
        {/* {errors.email && <p>{errors.email}</p>} */}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {/* {errors.username && <p>{errors.username}</p>} */}
        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        {/* {errors.firstName && <p>{errors.firstName}</p>} */}
        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        {errors.lastName && <p>{errors.lastName}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {/* {errors.password && <p>{errors.password}</p>} */}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {/* {errors.confirmPassword && <p>{errors.confirmPassword}</p>} */}
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
