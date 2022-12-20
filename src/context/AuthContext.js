import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import LoginService from "../services/LoginService";

export const AuthContext = createContext();

const AuthState = (props) => {
  const [auth, setAuth] = useState({
    isLogged: false,
    username: null,
    isLoading: false,
    error: false,
    token: null,
    statusConected: false,
    privateAccess: false,
    tipoUsuario: null,
  });

  const checkAuth = () => {
    //obtener el usuario del localstorage
    const data = JSON.parse(localStorage.getItem("userData"));
    //comprobar que este correcto (que exista)
    if (data) {
      setAuth({
        isLogged: data.statusConected,
      });
    } else {
      localStorage.setItem(
        "userData",
        JSON.stringify({
          isLogged: false,
          username: null,
          isLoading: false,
          error: false,
          token: null,
          statusConected: false,
          tipoUsuario: null,
        })
      );
    }
  };

  const login = ({ username, password }) => {
    LoginService({ username, password })
      .then((response) => {
        window.localStorage.setItem("userData", JSON.stringify(response[0]));
        setAuth({
          isLogged: response[0].statusConected,
          username: response[0].username,
          isLoading: false,
          error: false,
          token: response[0].token,
          tipoUsuario: response[0].tipoUsuario,
        });
        if (response[0].error) setAuth({ error: true });
      })
      .catch((error) => {
        window.localStorage.removeItem("userData");
        setAuth({ isLoading: false, error: true });
        console.log(error);
      });
  };

  const logout = () => {
    setAuth({
      isLogged: false,
      username: null,
      isLoading: false,
      error: false,
      token: null,
      statusConected: false,
      privateAccess: false,
    });
    //limpiar el localstorage
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLogged: auth.isLogged,
        username: auth.user,
        isLoading: auth.isLoading,
        hasError: auth.error,
        tipoUsuario: auth.tipoUsuario,
        login: login,
        logout: logout,
        checkAuth: checkAuth,
        privateAccess: Boolean(auth.privateAccess),
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
