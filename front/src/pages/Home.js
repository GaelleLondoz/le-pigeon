import React from "react";
import Header from "./homepage/Header";
import Plan from "./homepage/Plan";
import AgentAvatar from "./homepage/AgentAvatar";
import Articles from "./homepage/Articles";
import Map from "../components/Map";

const Home = () => {
  return (
    <>
      <Header />
      <Map />
      <Plan />
      <AgentAvatar />
      <Articles />
    </>
  );
};

export default Home;
