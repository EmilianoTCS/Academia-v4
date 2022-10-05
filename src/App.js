import React from "react";
import { Route } from "wouter";
import Homepage from "./components/pages/Homepage";
import Login from "./components/pages/Login";
import ListadoCursos from "./components/pages/ListadoCursos";
import ListadoRamos from "./components/pages/ListadoRamos";
import ListadoRelator from "./components/pages/ListadoRelator";
import ListadoClientes from "./components/pages/ListadoClientes";
import Administrador from "./components/pages/Administrador";
function App() {
  return (
    <div className="App">
      <Route component={Login} path="/"></Route>
      <Route component={Login} path="/Login"></Route>
      <Route component={Homepage} path="/home"></Route>
      <Route component={ListadoCursos} path="/listadoCursos"></Route>
      <Route component={ListadoRamos} path="/listadoRamos"></Route>
      <Route component={ListadoRelator} path="/listadoRelator"></Route>
      <Route component={ListadoClientes} path="/listadoClientes"></Route>
      <Route component={Administrador} path="/Administrador"></Route>
    </div>
  );
}

export default App;
