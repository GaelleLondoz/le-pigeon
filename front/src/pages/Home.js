import React from "react";
import Places from "../components/Places";
import Header from "./homepage/Header";
import Plan from "./homepage/Plan";
import AgentAvatar from "./homepage/AgentAvatar";

const Home = () => {
  return (
    <>
      <Header />
      <Plan />
      <AgentAvatar />
    </>
  );
};

export default Home;
