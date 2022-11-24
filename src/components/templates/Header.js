import React from "react";
import { useState } from "react";
import { Link } from "wouter";
import tsoftLogo from "../sources/LOGO-Tsoft-Alpha-FullColor.png";
import logoCoe from "../sources/logoCoe.png";
import "../css/HeaderStyles.css";
import SideBar from "./Sidebar";

export default function Header() {
  const [toggleSidebar, changeStatusSidebar] = useState(false);

  function handleSideBar() {
    changeStatusSidebar(true);
  }
  return (
    <>
      <div>
        <header>
          <div id="HeaderContainer">
            <Link to="/home">
              <img
                src={tsoftLogo}
                alt="logo Tsoft"
                id="logoTsoft"
                style={{ cursor: "pointer" }}
              ></img>
            </Link>
            <h3 id="tituloPaginaHeader">Academia de formación</h3>
            <img src={logoCoe} alt="logoCoe" id="logoCoe"></img>
          </div>
        </header>
        {/* <button id="btnToggleSidebar" onClick={handleSideBar}>
          <FaBars></FaBars>
        </button> */}

        <button
            className="buttonStyleOpen"
            variant="primary"
            onClick={handleSideBar}
          >
            <i className="bi bi-arrow-bar-left"></i>
          </button>
        <SideBar isToggled={toggleSidebar}></SideBar>
      </div>
    </>
  );
}
