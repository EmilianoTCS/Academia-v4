import React from "react";

const AutenticationLoginContext = React.createContext({
  statusConected: false,
  username: null,
  token: null,
});

export default AutenticationLoginContext;
