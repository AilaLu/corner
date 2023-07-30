// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpotsHome from "./components/Spots/AllSpotsHome";
import SpotDetailPage from "./components/Spots/SpotDetailPage";
import CreateSpotForm from "./components/CreateSpotForm";
import UpdateSpotForm from "./components/UpdateSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="app-frame">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <AllSpotsHome />
          </Route>
          <Route exact path="/spots/new">
            <CreateSpotForm />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetailPage />
          </Route>
          <Route path="spots/:spoId/edit">
            <UpdateSpotForm />
          </Route>
          <Route path="/login"></Route>
          <Route path="/signup"></Route>
        </Switch>
      )}
    </div>
  );
}

export default App;
