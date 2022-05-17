import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  Spin,
  Tooltip,
  notification,
  Select,
  DatePicker,
} from "antd";
import {
  FileDoneOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

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

const { Option } = Select;

const EditBooks = () => {
  const [loader, setLoader] = useState(false);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookDesc, setBookDesc] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [addedDate, setAddedDate] = useState("");
  const [image, setImage] = useState("");
  const [bookUrl, setBookUrl] = useState("");

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("_id");
  const history = useNavigate();

  const [loading, setLoading] = useState(false); //additional
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);(async () => {
      await axios
        .get(`/books/get/${id}`)
        .then((res) => {
          form.setFieldsValue({
            bookName: res.data.bookName,
            author: res.data.author,
            bookDesc: res.data.bookDesc,
            bookCategory: res.data.bookCategory,
            addedDate: res.data.addedDate,
            image: res.data.image,
            bookUrl: res.data.bookUrl,
          });
          setBookName(res.data.bookName);
          setAuthor(res.data.author);
          setBookDesc(res.data.bookDesc);
          setBookCategory(res.data.bookCategory);
          setAddedDate(res.data.addedDate);
          setImage(res.data.image);
          setBookUrl(res.data.bookUrl);
        })
        .catch(() => null);
    })();
  }, []);

  const bookHandlerUpdate = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.put(
        //use axios API
        `/books/update/${id}`,
        {
          bookName,
          author,
          bookDesc,
          bookCategory,
          addedDate,
          image,
          bookUrl,
        },
        config
      );
      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully updated the book details 😘",
          placement,
        });
        form.resetFields();
      }, 5000); //5seconds timeout
    } catch (error) {
      notification.error({
        message: `Notification`,
        description: error.response.data.error,
        placement,
      });
      setError(true);
      form.resetFields();
      setLoading(false);
    }
  };

  const [form] = Form.useForm();

  const onChangeDate = (type) => {
    setAddedDate(type);
  };
  return (
    <>
      {loader === false ? (
        <center>
          <Spin style={{ marginTop: "200px" }} />
        </center>
      ) : (
        <div className=" mt-10">
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={() => bookHandlerUpdate("top")}
          >
            <center>
              {error && <span style={{ color: "red" }}>{error}</span>}
            </center>
            <Form.Item
              name="bookName"
              label="Book Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                style={{ width: "50%" }}
                placeholder="enter book name"
                prefix={<FileDoneOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Enter Book Name ex: Sherlock Holmes">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
                showCount
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="author"
              label="Author"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                style={{ width: "50%" }}
                placeholder="enter author name"
                prefix={<FileDoneOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Enter Author Name ex: Athur Connan Doile">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
                showCount
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="bookDesc"
              label="Book Description"
              rules={[
                {
                  required: true,
                },
                {
                  max: 60,
                },
              ]}
            >
              <Input.TextArea
                style={{ width: "50%" }}
                placeholder="enter book description"
                prefix={<FileDoneOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Please provide book description">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
                showCount
                maxLength={60}
                value={bookDesc}
                onChange={(e) => setBookDesc(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="bookCategory"
              label="Book Catergory"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select Book Catregory"
                style={{ width: "50%" }}
                onChange={(e) => setBookCategory(e)}
                defaultValue={bookCategory}
              >
                <Option value="Novels">Novels</Option>
                <Option value="Programming">Programming</Option>
                <Option value="O/L's">O/L's</Option>
                <Option value="A/L's">A/L's</Option>
                <Option value="Kids Stories">Kids Stories</Option>
                <Option value="Short Stories">Short Stories</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Book added date"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker defaultValue={moment(Date(addedDate))} style={{ width: 200 }} onChange={onChangeDate} required />
            </Form.Item>

            <Form.Item
              name="image"
              label="Book Image"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                style={{ width: "50%" }}
                placeholder="enter Book image"
                prefix={<FileDoneOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Enter Book Image">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
                showCount
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="bookUrl"
              label="Book URL"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                style={{ width: "50%" }}
                placeholder="enter Book Url"
                prefix={<FileDoneOutlined className="site-form-item-icon" />}
                suffix={
                  <Tooltip title="Enter Book URL">
                    <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                  </Tooltip>
                }
                showCount
                value={bookUrl}
                onChange={(e) => setBookUrl(e.target.value)}
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;
              <Button type="primary" htmlType="submit">
                {loading ? (
                  <>
                    <Spin indicator={<LoadingOutlined />} /> Book updating in
                    Progess...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>{" "}
              &nbsp;&nbsp; &nbsp;&nbsp;
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default EditBooks;
