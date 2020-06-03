import React, { useState } from "react";
import NavBarProfileAgent from "../../components/agent/NavBarProfileAgent";

const ProfileAgent = () => {
  const [valueTab, setValueTab] = useState(0);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };
  return <NavBarProfileAgent value={valueTab} handleChange={handleChange} />;
};

export default ProfileAgent;
