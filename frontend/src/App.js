import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//common
import Home from "./common/Home";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={[<NavBar />, <Home />, <Footer />]} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;