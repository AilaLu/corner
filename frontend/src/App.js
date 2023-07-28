import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";

function App() {
  return (
    <>
      <h1>Hello from Corner</h1>
      {/* <Navigation /> */}
      <Switch>
        <Route path="/login">
          <LoginFormPage />
        </Route>
        <Route path="">{/* component */}</Route>
      </Switch>
    </>
  );
}

export default App;
