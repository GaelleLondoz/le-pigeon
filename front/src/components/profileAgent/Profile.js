import React, { useState } from "react";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import TabPanel from "./TabPanel";
import Account from "./Account";
import Invoice from "./Invoice";
import Payment from "./Payment";

const Profile = () => {
  const [valueTab, setValueTab] = useState(0);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <>
      <AppBar
        position="static"
        style={{
          maxWidth: "500px",
          backgroundColor: "lightGray",
          color: "black",
        }}
      >
        <Tabs
          value={valueTab}
          onChange={handleChange}
          aria-label="tabs profile agent"
        >
          <Tab label="Compte" />
          <Tab label="Facture" />
          <Tab label="Paiement" />
        </Tabs>
      </AppBar>
      <TabPanel value={valueTab} index={0}>
        <Account />
      </TabPanel>
      <TabPanel value={valueTab} index={1}>
        <Invoice />
      </TabPanel>
      <TabPanel value={valueTab} index={2}>
        <Payment />
      </TabPanel>
    </>
  );
};

export default Profile;
