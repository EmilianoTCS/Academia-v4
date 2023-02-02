import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import InscribirseCurso from "./components/pages/InscribirseCurso";
import ListadoAsistencias from "./components/pages/ListadoAsistencias";
import Curso from "./components/pages/Examinar/Curso";
import FormAnalistas from "./EDD/pages/FormAnalistas";
import FormReferentes from "./EDD/pages/FormReferentes";

import AuthState from "./context/AuthContext";
import { PrivateRoute } from "./hooks/PrivateRoute";
import RecuperarPassword from "./components/pages/RecuperarPassword";
import RestablecerPassword from "./components/pages/RestablecerPassword";

import ListadoReferentes from "./EDD/pages/ListadoReferentes";
import ListadoAnalistas from "./EDD/pages/ListadoAnalistas";

export default function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/"></Route>
          <Route element={<Login />} path="/Login"></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Homepage />}></Route>
            <Route element={<ListadoCursos />} path="/listadoCursos"></Route>
            <Route element={<ListadoRamos />} path="/listadoRamos"></Route>
            <Route element={<ListadoRelator />} path="/listadoRelator"></Route>
            <Route
              element={<ListadoClientes />}
              path="/listadoClientes"
            ></Route>
            <Route element={<Administrador />} path="/Administrador"></Route>
            <Route element={<Prerequisitos />} path="/Prerequisitos"></Route>
            <Route element={<FormAnalistas />} path="/FormularioAnEDD"></Route>
            <Route
              element={<FormReferentes />}
              path="/FormularioRefEDD"
            ></Route>

            <Route
              element={<ListadoAsistencias />}
              path="/ListadoAsistencias"
            ></Route>
            <Route
              element={<ListadoColaboradores />}
              path="/listadoColaboradores"
            ></Route>
            <Route element={<Curso />} path="/Examinar/:params"></Route>

            <Route
              element={<ListadoReferentes />}
              path="/EDD/ListadoReferentes"
            ></Route>
            <Route
              element={<ListadoAnalistas />}
              path="/EDD/ListadoAnalistas"
            ></Route>
          </Route>

          <Route
            element={<HomeColaboradores />}
            path="/homeColaboradores"
          ></Route>

          <Route element={<MisCursos />} path="/MisCursos"></Route>
          <Route element={<Calendario />} path="/Calendario"></Route>
          <Route
            element={<InscribirseCurso />}
            path="/InscripcionCurso"
          ></Route>
          <Route
            element={<RecuperarPassword />}
            path="/RecuperarPassword"
          ></Route>
          <Route
            path="/RestablecerPassword/:ID/:correo/"
            element={<RestablecerPassword />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </AuthState>
  );
}
