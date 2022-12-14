import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import useUser from "../../hooks/useUser";
import "../css/BoxTabs.css";
import Header from "../templates/Header";
import Automation from "./Tabs/Automation";
import DevOps from "./Tabs/DevOps";
import Certificados from "./Tabs/Certificados";
import DetalleNotas from "./Tabs/DetalleNotas";
import {Redirect} from "wouter"
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

export default function MisCursos() {
  const [value, setValue] = React.useState(0);
  const { isLogged } = useUser();
  const userData = JSON.parse(sessionStorage.getItem("userData"));


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return isLogged ? (
    <div>
      <Header></Header>
      <div>
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
                label="Automation"
                {...a11yProps(0)}
              />
              <Tab
                style={{ color: "#e10b1c", fontSize: "15pt" }}
                label="DevOps"
                {...a11yProps(1)}
              />
              <Tab
                style={{ color: "#e10b1c", fontSize: "15pt" }}
                label="Certificados"
                {...a11yProps(2)}
              />
              <Tab
                style={{ color: "#e10b1c", fontSize: "15pt" }}
                label="Detalle de notas"
                {...a11yProps(3)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Automation></Automation>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <DevOps></DevOps>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Certificados></Certificados>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <DetalleNotas></DetalleNotas>
          </TabPanel>
        </Box>
      </div>
    </div>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}
