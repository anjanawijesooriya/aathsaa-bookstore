import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import {
  Form,
  Input,
  Button,
  Spin,
  Tooltip,
  notification,
  DatePicker,
  Select,
} from "antd";
import {
  FileDoneOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";

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

const AddBooks = () => {
  const [loader, setLoader] = useState(false);
  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [bookDesc, setBookDesc] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [addedDate, setAddedDate] = useState("");
  const [image, setImage] = useState("");
  const [bookUrl, setBookUrl] = useState("");
  const likes = -1;
  const downloads = -1;
  const user = { likes: 0, email: "" };

  //additional
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(!loader);
    }, 5000);
  }, []);

  const bookHandler = async (placement) => {
    // create handler for saving data to the db
    setLoading(true);

    const config = {
      //headers
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.post(
        //use axios API
        "/books/create",
        {
          bookName,
          author,
          bookDesc,
          bookCategory,
          addedDate,
          image,
          bookUrl,
          likes,
          downloads,
          user,
        },
        config
      );

      setTimeout(() => {
        //set a time out
        setLoading(false);
        notification.info({
          message: `Notification`,
          description: "Successfully added the book details 😘",
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
    Date(setAddedDate(type));
  };

  const onReset = () => {
    form.resetFields();
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
            onFinish={() => bookHandler("top")}
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
              name="addedDate"
              label="Book added date"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker style={{ width: 200 }} onChange={onChangeDate} />
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
                    <Spin indicator={<LoadingOutlined />} /> Book adding in
                    Progess...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>{" "}
              &nbsp;&nbsp; &nbsp;&nbsp;
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default AddBooks;
