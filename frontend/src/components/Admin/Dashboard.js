import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import { Button } from "antd";
import {
  FundProjectionScreenOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import "./Dashboard.css";

import CarouselView from "./CarouselView";
import NavBar from "./NavBar";

//book components
import Books from "./Books/Books";
import AddBooks from "./Books/AddBooks";
import AllBooks from "./Books/AllBooks";
import EditBooks from "./Books/EditBooks";

//user components
import Users from "./Users/Users";
import AllUsers from "./Users/AllUsers";

import Logo from "../../assets/LOGO new.png";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useNavigate();
  const location = useLocation();
  const search = window.location.search;

  const param = new URLSearchParams(search);

  console.log(location.pathname);

  //book
  const queryBook = param.get("_optBook");
  const queryAddBooks = param.get("_book");
  const queryAllBooks = param.get("_book");
  const queryEditBooks = param.get("_book");

  //user
  const queryUser = param.get("_optUser");
  const queryAllUsers = param.get("_user");

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const date = new Date();
  const hrs = date.getHours();

  let greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs < 17) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs < 19) greet = "Good Evening";
  else greet = "Good Night";

  const setHeader = (type) => {
    switch (type) {
      case "dashboard":
        document.getElementById("header").innerHTML = "Dashboard";
        break;
      case "book":
        document.getElementById("header").innerHTML = "Book Management";
        break;
      case "user":
        document.getElementById("header").innerHTML = "User Management";
        break;
      default:
        break;
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("type");
    localStorage.setItem("authToken", null);
    history("/login");
    window.location.reload();
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width="270px"
      >
        <div>
          <img
            src={Logo}
            alt="logo"
            onClick={() => {
              history(`/admin-dashboard/${localStorage.getItem("username")}`);
              setHeader("dashboard");
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
        <br />
        <br />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={
            queryBook === "book" ? ["1"] : queryUser === "user" ? ["2"] : null
          }
        >
          <Menu.Item
            key="1"
            icon={<FundProjectionScreenOutlined />}
            className="text-lg"
            onClick={() => {
              setHeader("book");
              history(
                `/admin-dashboard/${localStorage.getItem(
                  "username"
                )}?_optBook=book`
              );
            }}
          >
            Book Management
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<UserOutlined />}
            className="text-lg"
            onClick={() => {
              setHeader("user");
              history(
                `/admin-dashboard/${localStorage.getItem(
                  "username"
                )}?_optUser=user`
              );
            }}
          >
            User Management
          </Menu.Item>
        </Menu>
        {collapsed === false ? (
          <center className="my-12">
            <Button
              icon={<LogoutOutlined className="-translate-y-0.5" />}
              onClick={logoutHandler}
            >
              Sign Out
            </Button>
          </center>
        ) : (
          <center className="my-12 hover:rounded-full hover:bg-slate-500 p-4  hover:mx-4">
            <LogoutOutlined
              style={{ color: "white", cursor: "pointer" }}
              className="-translate-y-0.5"
            />
          </center>
        )}
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: "center" }}
        >
          <h1 id="header" style={{ fontFamily: "serif", fontSize: "20px" }}>
            {queryBook === "book" ||
            queryAddBooks === "addbook" ||
            queryAllBooks === "allbook" ||
            queryEditBooks === "edit"
              ? "Book Management"
              : queryUser === "user" || queryAllUsers === "alluser"
              ? "User Management"
              : "Dashboard"}
          </h1>
        </Header>

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{greet}</Breadcrumb.Item>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
          </Breadcrumb>
          {location.pathname ===
            `/admin-dashboard/${localStorage.getItem("username")}` &&
            !queryBook &&
            !queryUser &&
            !queryAddBooks &&
            !queryAllUsers &&
            !queryEditBooks && <CarouselView />}
          {/* Book */}
          {queryBook === "book" && [<NavBar />, <Books />]}
          {queryAddBooks === "addbook" && [<NavBar />, <AddBooks />]}
          {queryAllBooks === "allbook" && [<NavBar />, <AllBooks />]}
          {queryEditBooks === "edit" && [<NavBar />, <EditBooks />]}
          {/* User */}
          {queryUser === "user" && [<NavBar />, <Users />]}
          {queryAllUsers === "alluser" && [<NavBar />, <AllUsers />]}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright ?? {date.getFullYear()} aaThSaa Book-Store
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
