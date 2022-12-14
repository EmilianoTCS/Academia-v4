import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import LoginService from "../services/LoginService";

export const AuthContext = createContext();

const AuthState = (props) => {
  const [auth, setAuth] = useState({
    isLogged: false,
    user: null,
    isLoading: false,
    error: false
    
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    //obtener el usuario del localstorage
    const data = localStorage.getItem("userData");
    const dataParsed = data ? JSON.parse(data) : false;

    if(data){
        setAuth({
            isLogged: data.statusConected,
    
          });
    }else{
        localStorage.setItem("userData",JSON.stringify({
            isLogged: false,
            user: null,
            isLoading: false,
            error: false
            
          }) )
    }
    
    //comprobar que este correcto (que exista)
    
    //cambiar el estado
    
  };

  const login = ({ username, password }) => {
    LoginService({ username, password })
      .then((response) => {
        //cambiar estado
        setAuth({
            isLogged: true, 
            user: null,
            isLoading: false,
          });

        window.localStorage.setItem("userData", JSON.stringify(response[0]));
        if (response[0].error) setState({ error: true });
      })
      .catch((error) => {
        window.localStorage.removeItem("userData");
        setState({ loading: false, error: true });
        console.log(error);
      });
  };

  const logout = () => {
    //cambiar estado
    setAuth({
        isLogged: false,
        user: null,
        isLoading: false,
      });
    //limpiar el localstorage
    localStorage.removeItem('userData')

  };

  return (
    <AuthContext.Provider
      value={{
        isLogged: auth.isLogged,
        user: auth.user,
        loading: auth.isLoading,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
