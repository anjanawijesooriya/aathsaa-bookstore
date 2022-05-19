import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "antd/dist/antd.css";
import {
  DownloadOutlined,
  LikeOutlined,
  DislikeOutlined,
} from "@ant-design/icons";
import { Button, Spin } from "antd";

const ViewBook = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const search = window.location.search;
  const param = new URLSearchParams(search);

  const id = param.get("_id");

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
    (async () => {
      await axios
        .get(`/books/get/${id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch(() => null);
    })();
  }, []);

  return (
    <div>
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <section class="text-gray-600 body-font overflow-hidden">
          <div class="container px-5 py-24 mx-auto">
            <div class="lg:w-4/5 mx-auto flex flex-wrap">
              <img
                alt="book"
                class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src={data.image}
              />
              <div class="lg:w-1/2 w-full lg:pl-10 lg:py-56 mt-6 lg:mt-0">
                <h2 class="text-sm title-font text-gray-500 tracking-widest">
                  {data.author}
                </h2>
                <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                  {data.bookName}
                </h1>
                <div class="flex mb-4">
                  <span class="flex items-center">
                    <DownloadOutlined />
                    <span class="text-gray-600 ml-3">
                      {data.downloads} Downloads
                    </span>
                  </span>
                  <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                    <a class="text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                      </svg>
                    </a>
                    <a class="text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                      </svg>
                    </a>
                    <a class="text-gray-500">
                      <svg
                        fill="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        class="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                    </a>
                  </span>
                </div>
                <p class="leading-relaxed">{data.bookDesc}</p>
                <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                  <div class="flex">
                    <span class="mr-3">Category:- {data.bookCategory}</span>
                  </div>
                  <div class="flex ml-6 items-center">
                    <span class="mr-3">
                      Book added Date:-{" "}
                      {moment(data.addedDate).format("DD MMM YYYY")}
                    </span>
                  </div>
                </div>
                <div class="flex">
                  <span class="title-font font-medium text-2xl text-gray-900">
                    <a href={data.bookUrl} target="_blank">
                      <Button type="primary" size="large" shape="round">
                        <DownloadOutlined />
                        Download
                      </Button>
                    </a>
                  </span>
                  <div className="rounded-full w-10 h-10 p-0 justify-between border-0 inline-flex items-center gap-2 text-gray-500 ml-4">
                    <Button shape="circle">
                      <LikeOutlined />
                    </Button>
                    <Button shape="circle">
                      <DislikeOutlined />
                    </Button>
                    <span>{data.likes}</span> Likes
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ViewBook;
