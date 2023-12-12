// frontend/src/components/LoginFormPage/index.js
// Render a form with a controlled input for the user login credential (username or email) and a controlled input for the user password.

// On submit of the form, dispatch the login thunk action with the form input values. Make sure to handle and display errors from the login thunk action if there are any.
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const hasErrors = Object.keys(errors).length > 0;
  let disableBtn = "big disabled button";
  if (!hasErrors) disableBtn = "big red button";

  useEffect(() => {
    const errors = {};
    if (credential.length < 4)
      if (password.length < 6)
        // errors.credential = "credential must be more than 4 character";
        errors.password = "password must be more than 6 character";
    setErrors(errors);
  }, [credential, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    await dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    setCredential("");
    setPassword("");
  };

  return (
    <div className="center-children">
      <h3>Log In</h3>
      <form onSubmit={handleSubmit}>
        <div className="errors">
          {errors.credential && <p>{errors.credential}</p>}
        </div>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          className={`${disableBtn} hover-cursor-pointer`}
          type="submit"
          disabled={hasErrors}
        >
          Log In
        </button>
        <button
          onClick={(e) => {
            setCredential("Demo-lition");
            setPassword("password");
          }}
          className="demo-user-login hover-cursor-pointer center-self"
          type="submit"
        >
          Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
