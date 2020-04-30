import React, { useState } from "react";
import NavBar from "../../../components/profileAgent/NavBar";

const Profile = () => {
  const [valueTab, setValueTab] = useState(0);

  const handleChange = (event, newValue) => {
    setValueTab(newValue);
  };

  return (
    <div>
      <NavBar value={valueTab} handleChange={handleChange} />
    </div>
  );
};

export default Profile;
