import React from "react";
import Search from "./homepage/Search";
import Plan from "./homepage/Plan";
import AgentAvatar from "./homepage/AgentAvatar";
import Articles from "./homepage/Articles";
import Map from "../components/Map";

const Home = () => {
  return (
    <>
      <Search />
      <Map />
      <Plan />
      <AgentAvatar />
      <Articles />
    </>
  );
};

export default Home;
