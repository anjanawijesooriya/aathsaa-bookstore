import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ArrowUpOutlined } from "@ant-design/icons";
import { Button } from "antd";

//common
import Home from "./common/Home";
import NavBar from "./common/NavBar";
import Footer from "./common/Footer";

//routes
import PrivateRoute from "./routes/PrivateRoute";
import PageNotFound from "./routes/PageNotFound";

//components
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ResetPassword from "./components/Login/ResetPassword";
import AdminDashboard from "./components/Admin/Dashboard";
import UserDashboard from "./components/User/Dashboard";

const App = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowButton(!showButton);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={[<NavBar />, <Home />, <Footer />]} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/passwordreset/:resetToken"
            element={<ResetPassword />}
          />

          {/* User */}
          <Route
            path="/user-dashboard/:username"
            element={
              <PrivateRoute>
                <NavBar />
                <UserDashboard />
              </PrivateRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin-dashboard/:username"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>

        {showButton && (
          <div className=" fixed bottom-5 right-5 text-3xl p-2 cursor-pointer justify-center items-center">
            <Button
              type="primary"
              size="large"
              shape="circle"
              onClick={scrollToTop}
            >
              <ArrowUpOutlined />
            </Button>
          </div>
        )}
      </Router>
    </div>
  );
};

export default App;
