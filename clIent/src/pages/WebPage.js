import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const WebPage = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div></div>
      <Outlet />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default WebPage;
