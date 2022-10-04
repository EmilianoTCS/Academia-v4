import React from "react";
import { Route } from "wouter";
import Homepage from "./components/pages/Homepage";
import Login from "./components/pages/Login";
function App() {
  return (
    <div className="App">
      <Route component={Login} path="/"></Route>
      <Route component={Login} path="/Login"></Route>
      <Route component={Homepage} path="/home"></Route>
    </div>
  );
}

export default App;
