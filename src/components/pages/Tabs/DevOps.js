import React, { Component } from "react";
import Recurso from "../../../sources/Recurso-3.png";
class DevOps extends Component {
  state = {};
  render() {
    const styleDiv = {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifiContent: "center",
      margin: "3%",
    };
    const styleImg = { width: "300px" };
    const styleText = {
      display: "flex",
      flexDirection: "column",
      marginLeft: "2%",
      textAlign: "center",
      fontFamily: "Roboto Slab, serif",
      color: "#e10b1c",
    };
    return (
      <div style={styleDiv}>
        <img style={styleImg} src={Recurso} alt="building..."></img>
        <div style={styleText}>
          <h1>Próximamente...</h1>
          <h1>Sitio en construcción.</h1>
        </div>
      </div>
    );
  }
}

export default DevOps;
