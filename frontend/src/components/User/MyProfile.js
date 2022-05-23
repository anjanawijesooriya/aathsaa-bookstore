import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, notification, Form, Spin, Input, Tooltip } from "antd";
import "antd/dist/antd.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  FileDoneOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const MyProfile = () => {
  const [loader, setLoader] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState(false);
  const [data, setData] = useState([]);

  const history = useNavigate();

  const search = window.location.search;
  const param = new URLSearchParams(search);
  //   const id = param.get("_id");

  const { id } = useParams();
  const [form] = Form.useForm();

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
    (async () => {
      await axios
        .get("/api/auth/get")
        .then((res) => {
          setData(res.data);
          console.log(res);
        })
        .catch(() => null);
    })();
    (async () => {
      await axios
        .get(`/api/auth/getUser/${localStorage.getItem("id")}`)
        .then((res) => {
          form.setFieldsValue({
            username: res.data.username,
            email: res.data.email,
          });
          setUsername(res.data.username);
          setEmail(res.data.email);
        })
        .catch(() => null);
    })();
  }, []);

  const filterData = data.filter(
    (el) => el.username === localStorage.getItem("username")
  );
  console.log(filterData);

  // console.log(username);

  const showModal = (type) => {
    console.log(type);
    switch (type) {
      case "edit":
        setMethod(true);
        break;
      case "delete":
        setVisible(true);
        break;
      default:
        break;
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setMethod(false);
  };

  const deleteHandler = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/auth/delete/${id}`);
      setTimeout(() => {
        setVisible(false);
        setLoading(false);
        notification.info({
          title: "Delete Form",
          message: "Successfully Deleted Your Account 😘",
          placement: "top",
        });
      }, 3000);
      setTimeout(() => {
        localStorage.setItem("authToken", null);
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("type");
        history("/register");
      }, 3000);
    } catch (error) {
      alert(error);
    }
  };

  const updateHandler = async (id) => {
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        `/api/auth/update/${id}`,
        {
          username,
          email,
        },
        config
      );
      setTimeout(() => {
        setMethod(false);
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully updated the user details 😘",
          placement: "top",
        });
      }, 5000);
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement: "top",
      });
    }
  };

  return (
    <>
      <div>
        {loader === false ? (
          <center>
            <Spin style={{ marginTop: "200px" }} />
          </center>
        ) : (
          <>
            <section className="text-gray-600 body-font overflow-hidden">
              <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                  <img
                    alt="user"
                    className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                    src="https://i.ibb.co/DLFbd7b/80-800194-transparent-users-icon-png-flat-user-icon-png.png"
                  />
                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-56 mt-6 lg:mt-0">
                    <h1 className="text-3xl title-font text-gray-900 tracking-widest">
                      Username: {filterData?.[0]?.username}
                    </h1>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                      Email: {filterData?.[0]?.email}
                    </h1>
                    <div className="flex mt-10">
                      <span className="title-font font-medium text-2xl text-gray-900">
                        <Button
                          id="edit"
                          type="primary"
                          size="large"
                          shape="round"
                          onClick={() => showModal("edit")}
                        >
                          <EditOutlined />
                          Edit
                        </Button>
                      </span>
                      <div className="rounded-full w-10 h-10 p-0 justify-between border-0 inline-flex items-center gap-2 text-gray-500 ml-4">
                        <Button
                          shape="round"
                          type="danger"
                          onClick={() => showModal("delete")}
                        >
                          <DeleteOutlined />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <Modal
              visible={visible ? visible : method}
              title={
                (method && "Edit your profile") ||
                (visible && "Are you sure to Delete ?")
              }
              onCancel={handleCancel}
              footer={false}
            >
              {(method && (
                <div className=" mt-10">
                  <Form
                    {...layout}
                    form={form}
                    name="control-hooks"
                    onFinish={updateHandler}
                  >
                    <Form.Item
                      name="username"
                      label="Username"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        style={{ width: "100%" }}
                        placeholder="enter username"
                        prefix={
                          <FileDoneOutlined className="site-form-item-icon" />
                        }
                        suffix={
                          <Tooltip title="Enter UserName ex: Kamal">
                            <InfoCircleOutlined
                              style={{ color: "rgba(0,0,0,.45)" }}
                            />
                          </Tooltip>
                        }
                        showCount
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        style={{ width: "100%" }}
                        placeholder="enter email"
                        prefix={
                          <FileDoneOutlined className="site-form-item-icon" />
                        }
                        suffix={
                          <Tooltip title="Enter Email ex: Kamal@gmail.com">
                            <InfoCircleOutlined
                              style={{ color: "rgba(0,0,0,.45)" }}
                            />
                          </Tooltip>
                        }
                        showCount
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                      />
                    </Form.Item>
                    <center>
                      <span style={{ color: "red" }}>
                        Note!, If you want to change the password go to the
                        forgot password section and change from there. Thank
                        You!!!
                      </span>
                    </center>
                    <Form.Item {...tailLayout}>
                      &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                      &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;
                      <Button type="primary" htmlType="submit">
                        {loading ? (
                          <>
                            <Spin indicator={<LoadingOutlined />} />
                            Updating in Progess...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </Button>{" "}
                      &nbsp;&nbsp; &nbsp;&nbsp;
                    </Form.Item>
                  </Form>
                </div>
              )) ||
                (visible && (
                  <center>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => deleteHandler(filterData._id)}
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
                ))}
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default MyProfile;
