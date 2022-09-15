import React from "react";
import "./Start.css";
import { Footer, Blog, Possibility, WhatDG, Header } from "./containers";
import { Navbar } from "./components";

const Start = () => {
  return (
    <div className="Start">
      <div className="gradient__bg">
        <Navbar />
        <Header />
      </div>
      <WhatDG />
      <Possibility />
      <Blog />
      <Footer />
    </div>
  );
};

export default Start;
