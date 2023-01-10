import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { RevolvingDot } from "react-loader-spinner";

export const PrivateRoute = ({
  children,
  redirectTo = "/homeColaboradores",
}) => {
  const { isLoading, isLogged } = useContext(AuthContext);
  const userData = JSON.parse(localStorage.getItem("userData"))
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  if (isLogged) {
    if (
      userData.tipoUsuario === "administrador" ||
      userData.tipoUsuario === "capital_humano"
    ) {
      return children ? children : <Outlet></Outlet>;
    } else if (
      userData.tipoUsuario === null ||
      userData.tipoUsuario === "" ||
      userData.tipoUsuario === "colaborador"
    ) {
      return <Navigate to={redirectTo}></Navigate>;
    }
  } else if (isLoading) {
    return (
      <RevolvingDot
        visible={true}
        height="200"
        width="200"
        ariaLabel="dna-loading"
        wrapperStyle={{ margin: "100px 200px" }}
        wrapperClass="dna-wrapper"
        color="#e10b1c"
      ></RevolvingDot>
    );
  } else if (!userData) {
    return <Navigate to={"/login"}></Navigate>;
  }
};
