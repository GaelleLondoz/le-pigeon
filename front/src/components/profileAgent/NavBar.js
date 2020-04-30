import React from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import TabPanel from "./TabPanel";

const NavBar = ({ value, handleChange }) => {
  return (
    <>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="tabs profile agent"
        >
          <Tab label="Profil" />
          <Tab label="Messages" />
          <Tab label="Agenda" />
          <Tab label="Evaluation" />
          <Tab label="Voyages" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Profil
      </TabPanel>
      <TabPanel value={value} index={1}>
        Messages
      </TabPanel>
      <TabPanel value={value} index={2}>
        Agenda
      </TabPanel>
      <TabPanel value={value} index={3}>
        Evaluation
      </TabPanel>
      <TabPanel value={value} index={4}>
        Voyages
      </TabPanel>
    </>
  );
};

export default NavBar;
