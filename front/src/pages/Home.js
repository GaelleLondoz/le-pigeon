import React from "react";
import Places from "../components/Places";
import Header from "./homepage/Header";
import Plan from "./homepage/Plan";
import AgentAvatar from "./homepage/AgentAvatar";
import Articles from "./homepage/Articles";

const Home = () => {
  return (
    <>
      <Header />
      <Plan />
      <AgentAvatar />
      <Articles />
    </>
  );
};

export default Home;
