import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Spin, Result, Button } from "antd";
import { FileExcelTwoTone } from "@ant-design/icons";
import moment from "moment";
import "antd/dist/antd.css";

const BooksCategory = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = window.location.search;
  const param = new URLSearchParams(search);

  //   let [filteredDataCategory, setFilteredDataCategory] = useState([]);

  const location = useLocation();

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:8070/books/")
        .then((res) => {
          setData(res.data);
          //   setFilteredDataCategory(res.data);
        })
        .catch((error) => alert(error));
    })();
    setTimeout(() => setLoader(!loader), 5000);
  }, []);

  //book category
  const queryNovels = param.get("_optNovels");
  const queryProgramming = param.get("_optProgramming");
  const queryOLs = param.get("_optOLs");
  const queryALs = param.get("_optALs");
  const queryKids = param.get("_optKids");
  const queryShorts = param.get("_optShortS");

  // let filteredData = data.filter((el) =>
  //   el.bookCategory === "Novels"
  //     ? location.pathname ===
  //       `/user-dashboard/${localStorage.getItem("username")}?_optNovels=novels`
  //     : el.bookCategory === "Programming"
  //     ? location.pathname ===
  //       `/user-dashboard/${localStorage.getItem(
  //         "username"
  //       )}?_optProgramming=programming`
  //     : el.bookCategory === "O/L's"
  //     ? location.pathname ===
  //       `/user-dashboard/${localStorage.getItem("username")}?_optOLs=ols`
  //     : el.bookCategory === "A/L's"
  //     ? location.pathname ===
  //       `/user-dashboard/${localStorage.getItem("username")}?_optALs=als`
  //     : el.bookCategory === "Kids Stories"
  //     ? location.pathname ===
  //       `/user-dashboard/${localStorage.getItem("username")}?_optKids=kids`
  //     : location.pathname ===
  //       `/user-dashboard/${localStorage.getItem("username")}?_optShortS=shorts`
  // );

  //   let filteredData = data.filter(
  //     location.pathname ===
  //       `/user-dashboard/${localStorage.getItem("username")}?_optNovels=novels`
  //       ? (el) => el.bookCategory === "Novels"
  //       : location.pathname ===
  //         `/user-dashboard/${localStorage.getItem(
  //           "username"
  //         )}?_optProgramming=programming`
  //       ? (el) => el.bookCategory === "Programming"
  //       : location.pathname ===
  //         `/user-dashboard/${localStorage.getItem("username")}?_optOLs=ols`
  //       ? (el) => el.bookCategory === "O/L's"
  //       : location.pathname ===
  //         `/user-dashboard/${localStorage.getItem("username")}?_optALs=als`
  //       ? (el) => el.bookCategory === "A/L's"
  //       : location.pathname ===
  //         `/user-dashboard/${localStorage.getItem("username")}?_optKids=kids`
  //       ? (el) => el.bookCategory === "Kids Stories"
  //       : (el) => el.bookCategory === "Short Stories"
  //   );

  //   const handleFilter = (filteredValue) => {
  //     console.log(filteredValue);
  //     if (filteredValue !== "Reset") {
  //       filteredDataCategory = data.filter(
  //         (el) => el.bookCategory.indexOf(filteredValue) >= 0
  //       );
  //       console.log(filteredDataCategory);
  //       setFilteredDataCategory(filteredDataCategory);
  //     } else setFilteredDataCategory(data);
  //   };

  //   console.log(filteredDataCategory);

  let filteredData = data.filter(
    queryNovels === "novels"
      ? (el) => el.bookCategory === "Novels"
      : queryProgramming === "programming"
      ? (el) => el.bookCategory === "Programming"
      : queryOLs === "ols"
      ? (el) => el.bookCategory === "O/L's"
      : queryALs === "als"
      ? (el) => el.bookCategory === "A/L's"
      : queryKids === "kids"
      ? (el) => el.bookCategory === "Kids Stories"
      : queryShorts === "shorts"
      ? (el) => el.bookCategory === "Short Stories"
      : null
  );

  return (
    <>
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : filteredData.length === 0 ? (
        <center>
          <Result
            style={{ marginTop: "200px" }}
            icon={<FileExcelTwoTone />}
            title="No Books Yet...!"
          />
        </center>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 p-5">
          {filteredData.map((i) => (
            <div className=" group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden lg:h-80 lg:aspect-none">
                <img
                  src={i.image}
                  alt="image"
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 justify-between">
                <center>
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span aria-hidden="true" className="inset-0" />
                      📕Book Name: {i.bookName}
                    </h3>
                  </div>
                  <p className="mt-1 text-sm text-gray-700">
                    👤Author: {i.author}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">{i.bookDesc}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    Book Category: {i.bookCategory}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {moment(i.addedDate).format("DD MMM YYYY")}
                  </p>
                  <Button type="primary" shape="round">View Book</Button>
                </center>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BooksCategory;
