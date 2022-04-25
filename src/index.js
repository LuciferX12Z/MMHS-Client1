import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "antd/dist/antd.css";
// import "swiper/css/bundle";
import { BrowserRouter as Router } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";

ReactDOM.render(
  <UserContextProvider>
    <Router>
      <App />
    </Router>
  </UserContextProvider>,
  document.getElementById("root")
);
