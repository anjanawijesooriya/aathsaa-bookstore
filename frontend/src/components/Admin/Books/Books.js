import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import "antd/dist/antd.css";
import books from "../../../assets/Admin/Books/books.jpg";

const Books = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
  }, []);

  return (
    <div>
      <center>
        {loader === false ? (
          <div className=" my-56">
            <Spin size="large" />
          </div>
        ) : (
          <div>
            <>
              <img src={books} alt="books" className=" w-full h-full" />
            </>
          </div>
        )}
      </center>
    </div>
  );
};

export default Books;
