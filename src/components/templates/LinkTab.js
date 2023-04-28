import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { TiThList } from "react-icons/ti";
import Header from "./Header";
import { Container } from "react-bootstrap";

export default function IconTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  

  return (
    <div>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
        <div id="containerTablas">
          <h1 id="TitlesPages">Administración de registros</h1>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="icon position tabs example"
            TabIndicatorProps={{ style: { background: "red" }}}
            style={{ color: "#e10b1c", width: "100%", fontSize: "20pt" }}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab icon={<TiThList />} label="Clientes" style={{ color: "#e10b1c", fontSize: "15pt" }} href="/adminClientes"/>
            <Tab icon={<TiThList />} label="Colaboradores" style={{ color: "#e10b1c", fontSize: "15pt" }} href="/adminColaboradores"/>
            <Tab icon={<TiThList />} label="Cursos" style={{ color: "#e10b1c", fontSize: "15pt" }} href="/adminCursos"/>
            <Tab icon={<TiThList />} label="EDD Analistas" style={{ color: "#e10b1c", fontSize: "15pt" }} href="/adminEDDAnalistas"/>
            <Tab icon={<TiThList />} label="EDD Referentes" style={{ color: "#e10b1c", fontSize: "15pt" }} href="/adminEDDReferentes"/>
            <Tab icon={<TiThList />} label="Empleados" style={{ color: "#e10b1c", fontSize: "15pt" }} href="/adminEmpleados"/>
            <Tab icon={<TiThList />} label="Ramos" style={{ color: "#e10b1c", fontSize: "15pt" }} href="/adminRamos"/>
            <Tab icon={<TiThList />} label="Relatores" style={{ color: "#e10b1c", fontSize: "15pt" }} href="/adminRelatores"/>
            <Tab icon={<TiThList />} label="Proyectos" style={{ color: "#e10b1c", fontSize: "15pt" }} href="/adminProyectos"/>
            <Tab icon={<TiThList />} label="Equipos" style={{ color: "#e10b1c", fontSize: "15pt" }} href="/adminEquipos"/>

          </Tabs>
        </div>
      </Container>
    </div>
  );
}
