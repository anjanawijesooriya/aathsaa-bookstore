import React, { useState, useEffect } from "react";
import { Button, notification, Table, Modal, Spin } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

function onChange(pagination, filters, sorter, extra) {
  console.log("params", pagination, filters, sorter, extra);
}

const AllBooks = () => {
  const history = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("_id");

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () =>
      await axios.get("http://localhost:8070/books/").then((res) => {
        setData(res.data);
        setLoader(!loader);
        console.log(res);
      }))();
  }, []);

  const showModal = () => {
    setVisible(!visible);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const deleteHandler = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8070/books/delete/${id}`);
      setTimeout(() => {
        setVisible(false);
        setLoading(false);
        notification.info({
          title: "Delete Form",
          message: "Successfully Delete The Book 😘",
          placement: "top",
        });
      }, 3000);
      await axios
        .get("http://localhost:8070/books/")
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

  const columns = [
    {
      title: "Book Name",
      dataIndex: "bookName",
      sorter: (a, b) => a.bookName.length - b.bookName.length,
    },
    {
      title: "Author",
      dataIndex: "author",
      sorter: (a, b) => a.author.length - b.author.length,
    },
    {
      title: "Book Description",
      dataIndex: "bookDesc",
    },
    {
      title: "Book Category",
      dataIndex: "bookCategory",
      sorter: (a, b) => a.bookCategory.length - b.bookCategory.length,
      filters: [
        {
          text: "Novels",
          value: "Novels",
        },
        {
          text: "Programming",
          value: "Programming",
        },
        {
          text: "O/L's",
          value: "O/L's",
        },
        {
          text: "A/L's",
          value: "A/L's",
        },
        {
          text: "Kids Stories",
          value: "Kids Stories",
        },
        {
          text: "Short Stories",
          value: "Short Stories",
        },
      ],
      //filteration
      onFilter: (value, record) => record.bookCategory.indexOf(value) === 0,
      filterSearch: true,
    },
    {
      title: "Book Added Date",
      render: (record) => <>{moment(record.addedDate).format("DD MMM YYYY")}</>,
    },
    {
      title: "Book Image",
      render: (record) => (
        <img src={record.image} style={{ height: "50px", width: "50px" }} />
      ),
    },
    {
      title: "Book URL",
      dataIndex: "bookUrl",
    },
    {
      title: "Action",
      render: (record) => (
        <>
          <div className=" flex gap-2">
            <div>
              <Button
                type="primary"
                size="large"
                onClick={() =>
                  history(
                    `/admin-dashboard/${localStorage.getItem(
                      "username"
                    )}?_book=edit&_id=${record._id}`
                  )
                }
              >
                <EditOutlined />
              </Button>
            </div>
            <div>
              <Button type="danger" size="large" onClick={showModal}>
                <DeleteOutlined />
              </Button>
            </div>
          </div>
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
                onClick={() => deleteHandler(record._id)}
              >
                {loading ? (
                  <>
                    <Spin indicator={<LoadingOutlined />} /> Deleting in
                    Progress...
                  </>
                ) : (
                  "Delete"
                )}
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button htmlType="button" onClick={handleCancel}>
                Cancel
              </Button>
            </center>
          </Modal>
        </>
      ),
      width: 140,
    },
  ];

  return (
    <>
      <div className=" mt-2">
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          loading={loader}
          showHeader
          sticky
        />
      </div>
    </>
  );
};

export default AllBooks;
