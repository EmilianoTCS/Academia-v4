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

import ResultadoListadoAnalistas from "./EDD/pages/ResultadoListadoAnalistas";
import ResultadoListadoReferentes from "./EDD/pages/ResultadoListadoReferentes";

import ListadoEmpleados from "./components/pages/ListadoEmpleados";
import ListadoEquipos from "./components/pages/ListadoEquipos";
import ListadoProyectos from "./components/pages/ListadoProyectos";

import AdminCursos from "./components/pages/Tabs/AdminCursos";
import AdminRamos from "./components/pages/Tabs/AdminRamos";
import AdminRelatores from "./components/pages/Tabs/AdminRelatores";
import AdminColaborador from "./components/pages/Tabs/AdminColaboradores";
import AdminCliente from "./components/pages/Tabs/AdminClientes";
import AdminEDDAnalistas from "./components/pages/Tabs/AdminEDDAnalistas";
import AdminEDDReferentes from "./components/pages/Tabs/AdminEDDReferentes";
import AdminProyectos from "./components/pages/Tabs/AdminProyectos";
import AdminEquipos from "./components/pages/Tabs/AdminEquipos";
import AdminEmpleados from "./components/pages/Tabs/AdminEmpleados";

export default function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/"></Route>
          <Route element={<Login />} path="/Login"></Route>
          <Route element={<PrivateRoute />}>
            <Route element={<AdminCliente />} path="/adminClientes"></Route>
            <Route
              element={<AdminColaborador />}
              path="/adminColaboradores"
            ></Route> 
            <Route element={<AdminCursos />} path="/adminCursos"></Route>
             <Route
              element={<AdminEDDAnalistas />}
              path="/adminEDDAnalistas"
            ></Route>
            <Route
              element={<AdminEDDReferentes />}
              path="/adminEDDReferentes"
            ></Route>
            <Route element={<AdminEmpleados />} path="/adminEmpleados"></Route>
            <Route element={<AdminRamos />} path="/adminRamos"></Route>
            <Route element={<AdminRelatores />} path="/adminRelatores"></Route>
            <Route element={<AdminProyectos />} path="/adminProyectos"></Route>
            <Route element={<AdminEquipos />} path="/adminEquipos"></Route> 
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
            <Route
              path="/EDD/ResultadoAnalistas/:CodigoEvaluacion"
              element={<ResultadoListadoAnalistas />}
            ></Route>
            <Route
              path="/EDD/ResultadoReferentes/:CodigoEvaluacion"
              element={<ResultadoListadoReferentes />}
            ></Route>
            <Route
              element={<ListadoEmpleados />}
              path="/listadoEmpleados"
            ></Route>
            <Route element={<ListadoEquipos />} path="/ListadoEquipos"></Route>
            <Route
              element={<ListadoProyectos />}
              path="/listadoProyectos"
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
