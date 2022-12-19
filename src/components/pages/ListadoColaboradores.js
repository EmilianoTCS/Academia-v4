import React from "react";
import { Navigate } from "react-router-dom";

import Header from "../templates/Header";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "../css/BoxTabs.css";
import Colaboradores from "./Tabs/Colaboradores";
import NotasColaboradores from "./Tabs/NotasColaboradores";

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
        <Box sx={{ p: 0 }}>
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

export default function BasicTabs() {
  const userData = JSON.parse(localStorage.getItem("userData")) ?? null;

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return userData.statusConected || userData !== null ? (
    <>
      <Header />
      <h1 id="TitlesPages">Panel de colaboradores</h1>
      <div>
        <Box className="boxTabs">
          <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              TabIndicatorProps={{ style: { background: "#e10b1c" } }}
              label
            >
              <Tab
                style={{
                  color: "#e10b1c",
                  fontSize: "15pt",
                  zIndex: "0",
                }}
                label="Listado"
                {...a11yProps(0)}
              />
              <Tab
                style={{ color: "#e10b1c", fontSize: "15pt" }}
                label="Notas"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Colaboradores />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <NotasColaboradores />
          </TabPanel>
        </Box>
      </div>
    </>
  ) : (
    <Navigate to="/login"></Navigate>
  );
}
