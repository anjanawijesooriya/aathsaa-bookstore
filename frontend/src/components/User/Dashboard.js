import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import { Button } from "antd";
import { BookOutlined, LogoutOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./Dashboard.css";

import Books from "./Books";

import BooksCategory from "./BooksCategory";

import Logo from "../../assets/LOGO new.png";

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const history = useNavigate();
  const location = useLocation();
  const search = window.location.search;

  const param = new URLSearchParams(search);
  console.log(location.pathname);

  //book category
  const queryNovels = param.get("_optNovels");
  const queryProgramming = param.get("_optProgramming");
  const queryOLs = param.get("_optOLs");
  const queryALs = param.get("_optALs");
  const queryKids = param.get("_optKids");
  const queryShorts = param.get("_optShortS");

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
      case "novels":
        document.getElementById("header").innerHTML = "Novels";
        break;
      case "programming":
        document.getElementById("header").innerHTML = "Programming";
        break;
      case "ols":
        document.getElementById("header").innerHTML = "O/L's";
        break;
      case "als":
        document.getElementById("header").innerHTML = "A/L's";
        break;
      case "kids":
        document.getElementById("header").innerHTML = "Kids Stories";
        break;
      case "shorts":
        document.getElementById("header").innerHTML = "Short Stories";
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
              history(`/user-dashboard/${localStorage.getItem("username")}`);
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
            queryNovels === "novels"
              ? ["1"]
              : queryProgramming === "programming"
              ? ["2"]
              : queryOLs === "ols"
              ? ["3"]
              : queryALs === "als"
              ? ["4"]
              : queryKids === "kids"
              ? ["5"]
              : queryShorts === "shorts"
              ? ["6"]
              : null
          }
        >
          <Menu.Item
            key="1"
            icon={<BookOutlined />}
            className="text-lg"
            onClick={() => {
              setHeader("novels");
              history(
                `/user-dashboard/${localStorage.getItem(
                  "username"
                )}?_optNovels=novels`
              );
            }}
          >
            Novels
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<BookOutlined />}
            className="text-lg"
            onClick={() => {
              setHeader("programming");
              history(
                `/user-dashboard/${localStorage.getItem(
                  "username"
                )}?_optProgramming=programming`
              );
            }}
          >
            Programming
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<BookOutlined />}
            className="text-lg"
            onClick={() => {
              setHeader("ols");
              history(
                `/user-dashboard/${localStorage.getItem(
                  "username"
                )}?_optOLs=ols`
              );
            }}
          >
            O/L's
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={<BookOutlined />}
            className="text-lg"
            onClick={() => {
              setHeader("als");
              history(
                `/user-dashboard/${localStorage.getItem(
                  "username"
                )}?_optALs=als`
              );
            }}
          >
            A/L's
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<BookOutlined />}
            className="text-lg"
            onClick={() => {
              setHeader("kids");
              history(
                `/user-dashboard/${localStorage.getItem(
                  "username"
                )}?_optKids=kids`
              );
            }}
          >
            Kids Stories
          </Menu.Item>
          <Menu.Item
            key="6"
            icon={<BookOutlined />}
            className="text-lg"
            onClick={() => {
              setHeader("shorts");
              history(
                `/user-dashboard/${localStorage.getItem(
                  "username"
                )}?_optShortS=shorts`
              );
            }}
          >
            Short Stories
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
            {queryNovels === "novels"
              ? "Novels"
              : queryProgramming === "programming"
              ? "Programming"
              : queryOLs === "ols"
              ? "O/L's"
              : queryALs === "als"
              ? "A/L's"
              : queryKids === "kids"
              ? "Kids Stories"
              : queryShorts === "shorts"
              ? "Short Stories"
              : "Dashboard"}
          </h1>
        </Header>

        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>{greet}</Breadcrumb.Item>
            <Breadcrumb.Item>
              {localStorage.getItem("username")}
            </Breadcrumb.Item>
          </Breadcrumb>
          {location.pathname ===
            `/user-dashboard/${localStorage.getItem("username")}` &&
            !queryNovels &&
            !queryProgramming &&
            !queryOLs &&
            !queryALs &&
            !queryKids &&
            !queryShorts }
          {/* Book Category */}
          {queryNovels === "novels" && <BooksCategory />}
          {queryProgramming === "programming" && <BooksCategory />}
          {queryOLs === "ols" && <BooksCategory />}
          {queryALs === "als" && <BooksCategory />}
          {queryKids === "kids" && <BooksCategory />}
          {queryShorts === "shorts" && <BooksCategory />}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Copyright © {date.getFullYear()} aaThSaa Book-Store
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
