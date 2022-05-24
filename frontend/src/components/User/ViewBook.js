import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "antd/dist/antd.css";
import {
  DownloadOutlined,
  LikeOutlined,
  DislikeOutlined,
  CommentOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Spin,
  Form,
  Input,
  notification,
  Comment,
  List,
  Result,
  Modal,
} from "antd";

const ViewBook = () => {
  const [data, setData] = useState([]);
  const [cData, setCData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [visible, setVisible] = useState(false);
  const [eVisible, setEVisible] = useState(false);
  const [spin, setSpin] = useState(false);

  const user = localStorage.getItem("username");
  const bookName = data.bookName;
  const [comment, setComment] = useState("");
  const cDate = moment().format("DD MMM YYYY, h:mm:ss a");

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
    (async () => {
      await axios
        .get("/comments/")
        .then((res) => setCData(res.data))
        .catch(() => null);
    })();
    (async () => {
      await axios
        .get(`/comments/get/${id}`)
        .then((res) => {
          form.setFieldsValue({
            comment: res.data.comment,
          });
          setComment(res.data.comment);
        })
        .catch(() => null);
    })();
  }, []);

  const commentHandler = async () => {
    // create handler for saving data to the db
    setLoading(!loading);
    setIsError(false);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(
        //use axios API
        "/comments/create",
        {
          user,
          bookName,
          comment,
          cDate,
        },
        config
      );

      setTimeout(() => {
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully added your comment 😘",
          placement: "top",
        });
        form.resetFields();
      }, 3000);
      await axios
        .get("/comments/")
        .then((res) => {
          setTimeout(() => {
            setCData(res.data);
          }, 3000);
          form.resetFields();
        })
        .catch(() => null);
    } catch (error) {
      form.resetFields();
      setIsError(!isError);
      setTimeout(() => setIsError(false), 3000);
      setLoading(false);
    }
  };

  const [form] = Form.useForm();
  const { TextArea } = Input;

  const filteredData = cData.filter((el) => el.bookName === data.bookName);

  const showModal = (type) => {
    switch (type) {
      case "edit":
        setEVisible(!eVisible);
        break;
      case "delete":
        setVisible(!visible);
        break;
      default:
        break;
    }
  };

  const handleCancel = () => {
    setVisible(false);
    setEVisible(false);
  };

  const deleteHandler = async (id) => {
    setSpin(!spin);
    try {
      await axios.delete(`/comments/delete/${id}`);
      setTimeout(() => {
        setVisible(false);
        setSpin(false);
        notification.info({
          title: "Delete Form",
          message: "Successfully Deleted Your Comment 😘",
          placement: "top",
        });
      }, 3000);
      await axios
        .get("/comments/")
        .then((res) => {
          setTimeout(() => {
            setCData(res.data);
          }, 3000);
        })
        .catch(() => null);
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement: "top",
      });
      setSpin(false);
    }
  };

  const updateHandler = async (id) => {
    setSpin(!spin);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        `/comments/update/${id}`,
        {
          comment,
        },
        config
      );
      setTimeout(() => {
        setEVisible(false);
        setSpin(false);
        notification.info({
          message: `Notification`,
          description: "Successfully updated your comment 😘",
          placement: "top",
        });
      }, 3000);
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement: "top",
      });
    }
  };

  return (
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
                  alt="book"
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  src={data.image}
                />
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-56 mt-6 lg:mt-0">
                  <h2 className="text-sm title-font text-gray-500 tracking-widest">
                    {data.author}
                  </h2>
                  <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                    {data.bookName}
                  </h1>
                  <div className="flex mb-4">
                    <span className="flex items-center">
                      <DownloadOutlined />
                      <span className="text-gray-600 ml-3">
                        {data.downloads} Downloads
                      </span>
                    </span>
                    <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                      <a className="text-gray-500">
                        <svg
                          fill="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                        </svg>
                      </a>
                      <a className="text-gray-500">
                        <svg
                          fill="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                        </svg>
                      </a>
                      <a className="text-gray-500">
                        <svg
                          fill="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                        >
                          <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                        </svg>
                      </a>
                    </span>
                  </div>
                  <p className="leading-relaxed">{data.bookDesc}</p>
                  <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                    <div className="flex">
                      <span className="mr-3">
                        Category: - {data.bookCategory}
                      </span>
                    </div>
                    <div className="flex ml-6 items-center">
                      <span className="mr-3">
                        Book added Date:-{" "}
                        {moment(data.addedDate).format("DD MMM YYYY")}
                      </span>
                    </div>
                  </div>
                  <div className="flex">
                    <span className="title-font font-medium text-2xl text-gray-900">
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
          <hr />
          {filteredData.length === 0 ? (
            <center>
              <Result icon={<CommentOutlined />} title="No Comments Yet...!" />
            </center>
          ) : (
            <List
              className="comment-list"
              header={`${filteredData.length} ${
                filteredData.length === 1 ? "Comment" : "Comments"
              } `}
              itemLayout="horizontal"
              dataSource={filteredData}
              renderItem={(item) => (
                <>
                  <li>
                    <Comment
                      author={item.user}
                      avatar={
                        <img
                          src="https://joeschmoe.io/api/v1/random"
                          alt="avatar"
                        />
                      }
                      content={item.comment}
                      datetime={moment(item.cDate).format(
                        "DD MMM YYYY, h:mm:ss a"
                      )}
                    />
                    {item.user === localStorage.getItem("username") ? (
                      <div className=" -mt-10 float-right">
                        <Button
                          type="primary"
                          onClick={() => showModal("edit")}
                        >
                          Edit
                        </Button>{" "}
                        <Button
                          type="danger"
                          onClick={() => showModal("delete")}
                        >
                          Delete
                        </Button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </li>
                </>
              )}
            />
          )}
          <hr />
          <div className=" mt-5">
            <center>
              <Form form={form} name="control-hooks">
                <Form.Item name="comment" rules={[{ required: true }]}>
                  <TextArea
                    style={{ width: "50%" }}
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter Your Comment..."
                    showCount
                    maxLength={60}
                    required
                  />
                </Form.Item>
                {isError && (
                  <span style={{ color: "red" }}>
                    Something went wrong, Please try again later...
                  </span>
                )}
                <br />
                <Button
                  htmlType="submit"
                  type="primary"
                  onClick={commentHandler}
                >
                  {loading ? (
                    <>
                      <Spin indicator={<LoadingOutlined />} /> Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Form>
            </center>
          </div>
          <Modal
            visible={visible ? visible : eVisible}
            title={visible ? "Are you sure to delete ?" : "Edit your comment"}
            onCancel={handleCancel}
            footer={false}
          >
            <center>
              {visible ? (
                <>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => deleteHandler(filteredData?.[0]?._id)}
                  >
                    {spin ? (
                      <>
                        <Spin indicator={LoadingOutlined} />
                        Deleting in Progress...
                      </>
                    ) : (
                      "Yes"
                    )}
                  </Button>{" "}
                  <Button type="danger">No</Button>
                </>
              ) : (
                <Form form={form} name="control-hooks">
                  <Form.Item name="comment" rules={[{ required: true }]}>
                    <TextArea
                      style={{ width: "70%" }}
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Enter Your Comment..."
                      showCount
                      maxLength={60}
                      required
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => updateHandler(filteredData?.[0]?._id)}
                    >
                      {spin ? (
                        <>
                          <Spin indicator={<LoadingOutlined />} />
                          Updating in Progess...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>{" "}
                  </Form.Item>
                </Form>
              )}
            </center>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ViewBook;
