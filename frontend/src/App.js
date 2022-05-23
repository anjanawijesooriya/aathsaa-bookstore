import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
      </Router>
    </div>
  );
};

export default App;
