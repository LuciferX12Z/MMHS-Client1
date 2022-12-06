import { Row, Col, Typography, Form, Button, TypographyProps } from "antd";
import React, { useContext, useEffect, useState } from "react";
import classes from "../Apply/Apply.module.css";
import FormItem2 from "../Apply/FormItem2";
import axios from "axios";
import moment from "moment";
import ModalPopUp from "../Modal/ModalPopUp";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

const { Title } = Typography;
const url =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_BACKEND_URL
    : process.env.REACT_APP_DEV_BACKEND_URL;

export const EditAddBook = (props) => {
  const [inputs, setInputs] = useState();
  const [isLoggedIn] = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  let isEdit = props.location?.pathname === "/editBook";

  if (!isLoggedIn) {
    return (
      <Title style={{ textAlign: "center" }}>
        U have no authority. How dare you intrude our territory
      </Title>
    );
  }
  let bookImageUpload = "";
  let book_name = "";
  let details = "";
  let author = "";
  let publisher = "";
  let publish_date = "";
  let bookUrl = "";
  let category = "";
  let _id = "";

  if (isEdit) {
    bookImageUpload = props.location?.state?.bookImageUpload;
    book_name = props.location?.state?.book_name;
    details = props.location?.state?.details;
    publish_date = props.location?.state?.publish_date;
    author = props.location?.state?.author;
    publisher = props.location?.state?.publisher;
    bookUrl = props.location?.state?.bookUrl;
    category = props.location?.state?.category;
    _id = props.location?.state?._id;
    isEdit = true;
  }
  console.log(props.location.state);

  if (isEdit && !_id) {
    return (
      <Title style={{ textAlign: "center" }}>
        my bitch, you are trying to edit a book that doesn't exist
      </Title>
    );
  }

  let bookImagesObject = [];

  // console.log(bookImageUpload);
  if (bookImageUpload) {
    bookImageUpload.map((image, index) => {
      return bookImagesObject.push({
        uid: index,
        url: image.url,
        public_id: image.public_id,
      });
    });
  }

  const onFinish = (values) => {
    console.log(values);
    setInputs(values);
  };

  let images = [];
  const onSubmitHandler = (values) => {
    if (values?.bookImageUpload?.fileList?.length > 0) {
      images = values.bookImageUpload.fileList.map(
        (image, index) =>
          (values.bookImageUpload.fileList[index].image = {
            public_id: image.public_id,
            url: image.url,
            image: image?.image?.result,
          })
      );
    }
    if (isSubmit) {
      console.log(values);
      isEdit === true
        ? axios({
            method: "put",
            url: `${url}/library/editBook/${_id}`,
            data: { ...values },
            withCredentials: true,
          }).then(
            (res) => res.status === 200 && props.history.replace("/library")
          )
        : axios({
            method: "post",
            url: `${url}/library/addBook`,
            data: { ...values },
            withCredentials: true,
          }).then(
            (res) => res.status === 200 && props.history.replace("/library")
          );
    }
    setIsSubmit(false);
  };

  if (isSubmit) {
    onSubmitHandler(inputs);
  }

  return (
    <>
      <Form
        colon={false}
        onFinish={onFinish}
        requiredMark={false}
        initialValues={
          isEdit && {
            bookImageUpload: bookImagesObject,
            book_name,
            details,
            publish_date: moment(publish_date),
            publisher,
            bookUrl,
            category,
            author,
            _id,
          }
        }
        style={{
          width: "70%",
          margin: "auto",
        }}
        encType="multipart/form-data"
      >
        <Typography.Text
          className={classes.editBookTitle}
          style={{ margin: "0 10px" }}
        >
          {isEdit ? `Edit Book` : `Add Book`}
        </Typography.Text>
        <FormItem2 name="bookImageUpload" value={bookImagesObject} />
        <Row>
          <Col md={12} sm={24} xs={24}>
            <div style={{ margin: "0 10px" }}>
              <FormItem2 label="Book Title" name="book_name" />
              <Row gutter={[10, 0]}>
                <Col xl={12} xxl={12} lg={12} md={12} sm={24}>
                  <FormItem2 label="Author" name="author" />
                </Col>
                <Col xl={12} xxl={12} lg={12} md={12} sm={24}>
                  <FormItem2 label="Category" name="category" />
                </Col>
              </Row>
              <FormItem2 label="Downloadable Link(Optional)" name="bookUrl" />
            </div>
          </Col>

          <Col md={12} sm={24} xs={24}>
            <div style={{ margin: "0 10px" }}>
              <Row gutter={[10, 0]}>
                <Col xl={12} xxl={12} lg={12} md={12} sm={24}>
                  <FormItem2 label="Publisher" name="publisher" />
                </Col>
                <Col xl={12} xxl={12} lg={12} md={12} sm={24}>
                  <FormItem2 label="Publish Date" name="publish_date" />
                </Col>
              </Row>
              <FormItem2 label="Details" name="details" />
            </div>
          </Col>
        </Row>
        <Row gutter={[0, 20]} style={{ marginTop: 5 }}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ margin: "0 10px" }}>
              <Button
                type="primary"
                size="large"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                }}
                htmlType="submit"
                onClick={() => setModalVisible(true)}
              >
                Apply
              </Button>
            </div>
          </Col>

          {modalVisible && (
            <ModalPopUp
              visible={true}
              setIsSubmit={setIsSubmit}
              setModalVisible={setModalVisible}
              title={"Edit?"}
              description={"Are you sure you want to edit this book?"}
            />
          )}
          {/* // TODO: where to link when cancel is clicked */}

          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ margin: "0 10px 20px 10px" }}>
              <Link to={"/library"}>
                <Button
                  size="large"
                  style={{
                    width: "100%",
                    borderRadius: "10px",
                  }}
                >
                  Cancel
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
};
