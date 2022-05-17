import React from "react";
import { Button } from "antd";
import { HomeTwoTone } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

import "antd/dist/antd.css";

const NavBar = () => {
  const history = useNavigate();
  const location = useLocation();
  const search = window.location.search;

  const param = new URLSearchParams(search);
  console.log(location.pathname);

  const queryBook = param.get("_optBook");
  const queryAddBooks = param.get("_book");
  const queryAllBooks = param.get("_book");
  const queryEditBooks = param.get("_book");

  return (
    <div className=" mx-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-16">
      {queryBook === "book" ||
      queryAddBooks === "addbook" ||
      queryAllBooks === "allbook" ||
      queryEditBooks === "edit" ? (
        <>
          <div className="text-4xl float-left translate-x-4">
            <HomeTwoTone
              onClick={() =>
                history(
                  `/admin-dashboard/${localStorage.getItem(
                    "username"
                  )}?_optBook=book`
                )
              }
            />
          </div>
          <div className="pt-4 flex">
            <div className="mx-auto -translate-x-6">
              <Button
                type="primary"
                danger
                onClick={() =>
                  history(
                    `/admin-dashboard/${localStorage.getItem(
                      "username"
                    )}?_book=addbook`
                  )
                }
              >
                Add Books
              </Button>{" "}
              <Button
                type="primary"
                danger
                onClick={() =>
                  history(
                    `/admin-dashboard/${localStorage.getItem(
                      "username"
                    )}?_book=allbook`
                  )
                }
              >
                All Books
              </Button>{" "}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-4xl float-left translate-x-4">
            <HomeTwoTone
              onClick={() =>
                history(
                  `/admin-dashboard/${localStorage.getItem(
                    "username"
                  )}?_optUser=user`
                )
              }
            />
          </div>
          <div className="pt-4 flex">
            <div className="mx-auto -translate-x-6">
              <Button
                type="primary"
                danger
                onClick={() =>
                  history(
                    `/admin-dashboard/${localStorage.getItem(
                      "username"
                    )}?_user=alluser`
                  )
                }
              >
                All Users
              </Button>{" "}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
