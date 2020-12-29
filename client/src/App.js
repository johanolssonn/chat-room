import React from "react";
import "./App.css";
import Join from "./components/join/Join";
import Room from "./components/Room";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Redirect to="/join"></Redirect>
          </Route>
          <Route path="/join">
            <Join />
          </Route>
          <Route path="/room">
            <Room />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
