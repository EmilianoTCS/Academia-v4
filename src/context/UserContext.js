import React, { useState } from "react";

const Context = React.createContext();

export function UserContextProvider({ children }) {
  const [jwt, setJWT] = useState([
    { statusConected: false, token: null, username: null },
  ]);
  const local = useState(() =>
    JSON.parse(window.sessionStorage.getItem("userData"))
  );

  return (
    <Context.Provider value={{ jwt, setJWT, local }}>
      {children}
    </Context.Provider>
  );
}
export default Context;
