import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import axios from "axios";
import { Button, Modal, notification, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const AllUsers = () => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("_id");

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
  }, []);

  useEffect(() => {
    (async () =>
      await axios.get("/api/auth/get").then((res) => {
        setData(res.data);
      }))();
  }, []);

  const showModal = () => {
    setVisible(!visible);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const deleteHandler = async (id) => {
    setLoading(!loading);
    try {
      await axios.delete(`/api/auth/delete/${id}`);
      setTimeout(() => {
        setVisible(false);
        setLoading(false);
        notification.info({
          title: "Delete Form",
          message: "Successfully Deleted The User 👤",
          placement: "top",
        });
      }, 3000);
      await axios
        .get("/api/auth/get")
        .then((res) => {
          setTimeout(() => {
            setData(res.data);
          }, 3000);
        })
        .catch((error) => alert(error));
    } catch (error) {
      alert(error);
    }
  };

  const filteredData = data.filter((el) => el.type !== "Admin");
  console.log(filteredData);
  return (
    <>
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : filteredData.length === 0 ? (
        <center>
          <span style={{ color: "red" }}>No Users Yet...</span>
        </center>
      ) : (
        filteredData.map((i) => (
          <>
            <section class="text-gray-600 body-font inline-block">
              <div class="container px-5 mx-auto">
                <div class="flex flex-wrap -m-4 ">
                  <div class="p-4 mt-5">
                    <div class="h-80  bg-opacity-75 bg-gradient-to-r from-sky-300 via-purple-400 to-blue-500 px-2 pt-2 rounded-lg overflow-hidden text-center relative">
                      <div>
                        <img
                          class="lg:h-48 md:h-36 w-full object-cover object-center"
                          src="https://i.ibb.co/DLFbd7b/80-800194-transparent-users-icon-png-flat-user-icon-png.png"
                          alt="blog"
                        />
                      </div>
                      <h1 class="title-font sm:text-2xl text-xl font-medium text-slate-900 mb-3">
                        Username: {i.username}
                      </h1>
                      <h2 class="tracking-widest text-base title-font font-medium text-slate-600 mb-1">
                        Email: {i.email}
                      </h2>
                      <center>
                        <Button type="danger" onClick={showModal}>
                          <span class="text spaan">Delete</span>
                        </Button>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Modal
              visible={visible}
              title="Are you sure to delete ?"
              onCancel={handleCancel}
              footer={false}
            >
              <center>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => deleteHandler(i?._id)}
                >
                  {loading ? (
                    <>
                      <Spin indicator={<LoadingOutlined />} /> Deleting in
                      Progress...
                    </>
                  ) : (
                    "Yes"
                  )}
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Button htmlType="button" onClick={handleCancel}>
                  No
                </Button>
              </center>
            </Modal>
          </>
        ))
      )}
    </>
  );
};

export default AllUsers;
