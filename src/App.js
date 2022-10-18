import React from "react";
import { Route } from "wouter";
import Homepage from "./components/pages/Homepage";
import Login from "./components/pages/Login";
import ListadoCursos from "./components/pages/ListadoCursos";
import ListadoRamos from "./components/pages/ListadoRamos";
import ListadoRelator from "./components/pages/ListadoRelator";
import ListadoClientes from "./components/pages/ListadoClientes";
import Administrador from "./components/pages/Administrador";
import Prerequisitos from "./components/pages/Prerequisitos";
import ListadoColaboradores from "./components/pages/ListadoColaboradores";
import HomeColaboradores from "./components/pages/HomeColaboradores";
import MisCursos from "./components/pages/MisCursos";
import Calendario from "./components/pages/Calendario";

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
      <Route component={Prerequisitos} path="/Prerequisitos"></Route>
      <Route component={HomeColaboradores} path="/homeColaboradores"></Route>
      <Route component={MisCursos} path="/MisCursos"></Route>
      <Route component={Calendario} path="/Calendario"></Route>
      <Route
        component={ListadoColaboradores}
        path="/listadoColaboradores"
      ></Route>
    </div>
  );
}

export default App;
