import React, { useContext, useEffect, useState } from "react";
import { Route, useLocation } from "wouter";
import { AuthContext } from "../context/AuthContext";
import { RevolvingDot } from "react-loader-spinner";
import { useCallback } from "react";

const PrivateRoute = ({ component, path }) => {
  const { isLoading, isLogged, tipoUsuario } = useContext(AuthContext);
  const [privateAccess, setPrivateAccess] = useState(false);
  const [, navigate] = useLocation();
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const checkUserType = useCallback(() => {
    if (
      userData.tipoUsuario === "administrador" ||
      userData.tipoUsuario === "capital_humano"
    ) {
      setPrivateAccess(true);
    } else if (
      userData.tipoUsuario === null ||
      userData.tipoUsuario === "" ||
      userData.tipoUsuario === "colaborador"
    ) {
      setPrivateAccess(false);
    }
  }, [userData.tipoUsuario]);

  useEffect(() => {
    if (isLogged) checkUserType();
    console.log(tipoUsuario);
  }, [checkUserType, isLogged]);

  return isLoading ? (
    <RevolvingDot
      visible={true}
      height="200"
      width="200"
      ariaLabel="dna-loading"
      wrapperStyle={{ margin: "100px 200px" }}
      wrapperClass="dna-wrapper"
      color="#e10b1c"
    ></RevolvingDot>
  ) : privateAccess ? (
    <Route component={component} path={path}></Route>
  ) : (
    setTimeout(() => {
      alert("No tienes acceso a este sitio.");
      navigate("/homeColaboradores");
      console.log(2);
    }, "2000")
  );
};

export default PrivateRoute;
