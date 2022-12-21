import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
// import "swiper/css/bundle";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";
import { Footer } from "./Exporter/Exporter";
import { NavBar } from "./Exporter/Exporter";

ReactDOM.render(
  <UserContextProvider>
    <Router>
      <NavBar />
      <App />
      <Footer />
    </Router>
  </UserContextProvider>,
  document.getElementById("root")
);
