import { Row, Col, Typography, Button } from "antd";
import React, { useContext, useState } from "react";
import classes from "../Apply/Apply.module.css";
import FormItem1 from "../Apply/FormItem1";
import moment from "moment";
import ModalPopUp from "../Modal/ModalPopUp";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import FormContainer from "../FormContainer/FormContainer";
import { addHandler, editHandler } from "../services/editAddItem.network";

const { Title } = Typography;

let bookImageUpload = {
  fileList: [],
};
let book_name = "";
let details = "";
let author = "";
let publisher = "";
let publish_date = "";
let bookUrl = "";
let category = "";
let _id = "";

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

  if (isEdit) {
    bookImageUpload.fileList = props.location?.state?.bookImageUpload;
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

  if (isEdit && !_id) {
    return (
      <Title style={{ textAlign: "center" }}>
        my bitch, you are trying to edit a book that doesn't exist
      </Title>
    );
  }

  let bookImagesObject = [];

  if (bookImageUpload.fileList) {
    const bookImageList = bookImageUpload.fileList.map((image, index) => {
      return {
        uid: index,
        url: image.url,
        public_id: image.public_id,
      };
    });
    bookImageUpload.fileList = bookImageList;
  }

  const initialValue = {
    bookImageUpload: bookImagesObject,
    book_name,
    details,
    publish_date: isEdit ? moment(publish_date) : "",
    publisher,
    bookUrl,
    category,
    author,
    _id,
  };

  const onFinish = (values) => {
    console.log(values);
    setInputs(values);
  };

  const onSubmitHandler = (values) => {
    if (values?.bookImageUpload?.fileList?.length > 0) {
      values.bookImageUpload.fileList.map(
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
        ? editHandler({
            url: `library/editBook/${_id}`,
            values: { ...values },
            withCredentials: true,
            history: props.history,
            toLink: "/library",
          })
        : addHandler({
            url: `library/addBook`,
            values: { ...values },
            withCredentials: true,
            history: props.history,
            toLink: "/library",
          });
    }
    setIsSubmit(false);
  };

  if (isSubmit) {
    onSubmitHandler(inputs);
  }

  return (
    <>
      <FormContainer
        valueObj={initialValue}
        style={{
          width: "70%",
          margin: "auto",
        }}
        isEdit
        requiredMark={false}
        onFinish={onFinish}
      >
        <Typography.Text
          className={classes.editBookTitle}
          style={{ margin: "0 10px" }}
        >
          {isEdit ? `Edit Book` : `Add Book`}
        </Typography.Text>
        <FormItem1
          name="bookImageUpload"
          value={bookImageUpload.fileList}
          imageMaxCount={1}
        />
        <Row>
          <Col md={12} sm={24} xs={24}>
            <div style={{ margin: "0 10px" }}>
              <FormItem1 label="Book Title" name="book_name" />
              <Row gutter={[10, 0]}>
                <Col xl={12} xxl={12} lg={12} md={12} sm={24}>
                  <FormItem1 label="Author" name="author" />
                </Col>
                <Col xl={12} xxl={12} lg={12} md={12} sm={24}>
                  <FormItem1 label="Category" name="category" />
                </Col>
              </Row>
              <FormItem1
                label="Downloadable Link(Optional)"
                name="bookUrl"
                exceptionName={"bookUrl"}
              />
            </div>
          </Col>

          <Col md={12} sm={24} xs={24}>
            <div style={{ margin: "0 10px" }}>
              <Row gutter={[10, 0]}>
                <Col xl={12} xxl={12} lg={12} md={12} sm={24}>
                  <FormItem1 label="Publisher" name="publisher" />
                </Col>
                <Col xl={12} xxl={12} lg={12} md={12} sm={24}>
                  <FormItem1 label="Publish Date" name="publish_date" />
                </Col>
              </Row>
              <FormItem1 label="Details" name="details" />
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
      </FormContainer>
    </>
  );
};
