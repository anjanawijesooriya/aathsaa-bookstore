import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Button, Spin, Result } from "antd";
import { FileExcelTwoTone } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useNavigate } from "react-router-dom";

const Books = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);

  const history = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
    (async () => {
      await axios
        .get("http://localhost:8070/books/")
        .then((res) => {
          setData(res.data);
        })
        .catch(() => null);
    })();
  }, []);

  return (
    <div>
      <center>
        <h1 className=" text-3xl text-blue-700">Welcome To aaThSaa Book-Store</h1>
      </center>
      <hr />
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : data.length === 0 ? (
        <center>
          <Result
            style={{ marginTop: "200px" }}
            icon={<FileExcelTwoTone />}
            title="No Books Yet...!"
          />
        </center>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 p-5">
          {data.map((i) => (
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
                  <Button
                    type="primary"
                    shape="round"
                    onClick={() =>
                      history(
                        `/user-dashboard/${localStorage.getItem(
                          "username"
                        )}?_optView=book&_id=${i._id}`
                      )
                    }
                  >
                    View Book
                  </Button>
                </center>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
