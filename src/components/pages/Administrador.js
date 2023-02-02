import React from "react";
import { Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "../templates/Header";
import "../css/AdminStyles.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../css/BoxTabs.css";
import AdminCursos from "./Tabs/AdminCursos";
import AdminRamos from "./Tabs/AdminRamos";
import AdminRelatores from "./Tabs/AdminRelatores";
import AdminColaborador from "./Tabs/AdminColaboradores";
import AdminCliente from "./Tabs/AdminClientes";

export default function Administrador() {
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ---------------------------------------------------------------

  function TabPanel(props) {
    const { children, value, index } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  // ------------------------------------------------------------------


  return userData.statusConected || userData !== null ? (
    <>
      <Header></Header>
      <br></br>
      <br></br>
      <Container id="fondoTabla">
      <div id="containerTablas">
        <h1 id="TitlesPages" >Administración de registros</h1>

      <Box className="boxTabs">
          <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              TabIndicatorProps={{ style: { background: "#e10b1c" } }}
              style={{ color: "#e10b1c", width: "100%", fontSize: "20pt" }}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab
                style={{ color: "#e10b1c", fontSize: "15pt" }}
                label="Cursos"
                {...a11yProps(0)}
              />
              <Tab
                style={{ color: "#e10b1c", fontSize: "15pt" }}
                label="Ramos"
                {...a11yProps(1)}
              />
              <Tab
                style={{ color: "#e10b1c", fontSize: "15pt" }}
                label="Relatores"
                {...a11yProps(2)}
              />
              <Tab
                style={{ color: "#e10b1c", fontSize: "15pt" }}
                label="Colaborador"
                {...a11yProps(3)}
              />
              <Tab
                style={{ color: "#e10b1c", fontSize: "15pt" }}
                label="Cliente"
                {...a11yProps(4)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <AdminCursos></AdminCursos>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AdminRamos></AdminRamos>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <AdminRelatores></AdminRelatores>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <AdminColaborador></AdminColaborador>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <AdminCliente></AdminCliente>
          </TabPanel>
        </Box>
      </div>
      </Container>
    </>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
