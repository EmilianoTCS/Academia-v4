import React from "react";
import { useState } from "react";
import { Link } from "wouter";
import tsoftLogo from "../sources/LOGO-Tsoft-Alpha-FullColor.png";
import logoCoe from "../sources/logoCoe.png";
import "../css/HeaderStyles.css";
import { FaBars } from "react-icons/fa";
import SideBar from "./Sidebar";

export default function Header() {
  const [toggleSidebar, changeStatusSidebar] = useState(false);

  function handleSideBar() {
    changeStatusSidebar(!toggleSidebar);
  }
  return (
    <>
      <div>
        <header>
          <div id="HeaderContainer">
            <Link to="/home">
              <img src={tsoftLogo} alt="logo Tsoft" id="logoTsoft"></img>
            </Link>
            <h3 id="tituloPaginaHeader">Academia de formación</h3>
            <img src={logoCoe} alt="logoCoe" id="logoCoe"></img>
          </div>
        </header>
        <button id="btnToggleSidebar" onClick={handleSideBar}>
          <FaBars></FaBars>
        </button>
        <SideBar isToggled={toggleSidebar}></SideBar>
      </div>
    </>
  );
}
