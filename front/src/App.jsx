import React from "react";
import "./styles/index.scss";
import "./styles/App.scss";

import Header from "./components/header/Header";
import HeaderPromo from "./components/headerPromo/HeaderPromo";
import OurServices from "./components/ourServices/OurServices";
import LeaveRequest from "./components/leaveRequest/LeaveRequest";
import AboutUs from "./components/aboutUs/AboutUs";
import DeveloperInfo from "./components/developersInfo/DeveloperInfo";
import OurProjects from "./components/ourProjects/OurProjects";
import Footer from "./components/footer/Footer";
import DevelopmentProcess from "./components/developmentProcess/DevelopmentProcess";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div className="wrapper">
        <Header />
        <main className="main">
          <HeaderPromo />
          <OurServices />
          <LeaveRequest />
          <AboutUs />
          <DevelopmentProcess />
          <DeveloperInfo />
          <OurProjects />
        </main>
        <Footer />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
}

export default App;
