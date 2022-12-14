import { useCallback, useContext, useState } from "react";
import Context from "../context/UserContext";
import LoginService from "../services/LoginService";
export default function useUser() {
  const { jwt, setJWT } = useContext(Context);
  const [state, setState] = useState({ loading: false, error: false });


  const login = useCallback(
    ({ username, password }) => {
      // LoginService({ username, password })
      //   .then((response) => {
      //     setState({ loading: false, error: false });
      //     setJWT(response);
      //     window.localStorage.setItem(
      //       "userData",
      //       JSON.stringify(response[0])
      //     );
      //     if (response[0].error) setState({ error: true });
      //   })
      //   .catch((error) => {
      //     window.localStorage.removeItem("userData");
      //     setState({ loading: false, error: true });
      //     console.log(error);
      //   });
    },
    [setJWT]
  );

  const logout = useCallback(() => {
    // setJWT([{ statusConected: false, token: null, username: null }]);
    // window.localStorage.removeItem("userData");
  }, [setJWT]);

  return {
    isLogged: Boolean(jwt[0].statusConected),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout,
  };
}
