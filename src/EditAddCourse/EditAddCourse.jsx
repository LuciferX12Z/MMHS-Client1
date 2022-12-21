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

let courseImageUpload = {
  fileList: [],
};
let courseName = "";
let details = "";
let endingDate = "";
let startingDate = "";
let fee = "";
let studentLimit = "";
let teacher = "";
let _id = "";

export default function EditAddCourse(props) {
  const [inputs, setInputs] = useState();
  const [isLoggedIn] = useContext(UserContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  let isEdit = props.location?.pathname === "/editCourse";

  if (!isLoggedIn) {
    return (
      <Title style={{ textAlign: "center" }}>
        U have no authority. How dare you intrude our territory
      </Title>
    );
  }

  if (isEdit) {
    courseImageUpload.fileList = props.location?.state?.courseImageUpload;
    courseName = props.location?.state?.courseName;
    details = props.location?.state?.details;
    endingDate = props.location?.state?.endingDate;
    fee = props.location?.state?.fee;
    startingDate = props.location?.state?.startingDate;
    studentLimit = props.location?.state?.studentLimit;
    teacher = props.location?.state?.teacher;
    _id = props.location?.state?._id;
    isEdit = true;
  }

  if (isEdit && !_id) {
    return (
      <Title style={{ textAlign: "center" }}>
        my bitch, you are trying to edit a course that doesn't exist
      </Title>
    );
  }

  if (courseImageUpload.fileList) {
    const courseImageList = courseImageUpload.fileList.map((image, index) => {
      return {
        uid: index,
        url: image.url,
        public_id: image.public_id,
      };
    });
    courseImageUpload.fileList = courseImageList;
  }

  const initialValue = {
    courseImageUpload: courseImageUpload,
    courseName,
    details,
    startingDate: isEdit ? moment(startingDate) : "",
    endingDate: isEdit ? moment(endingDate) : "",
    fee,
    studentLimit,
    teacher,
    _id,
  };

  const onFinish = (values) => {
    setInputs(values);
  };

  const onSubmitHandler = (values) => {
    if (values?.courseImageUpload?.fileList?.length > 0) {
      values.courseImageUpload.fileList.map(
        (image, index) =>
          (values.courseImageUpload.fileList[index].image = {
            public_id: image.public_id,
            url: image.url,
            image: image?.image?.result,
          })
      );
    }
    if (isSubmit) {
      isEdit === true
        ? editHandler({
            url: `editCourse/${_id}`,
            values: { ...values },
            withCredentials: true,
            history: props.history,
            toLink: "/courses",
          })
        : addHandler({
            url: `addCourse`,
            values: { ...values },
            withCredentials: true,
            history: props.history,
            toLink: "/courses",
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
          className={classes.editCourseTitle}
          style={{ margin: "0 10px" }}
        >
          {isEdit ? `Edit Course` : `Add Course`}
        </Typography.Text>
        <FormItem1
          name="courseImageUpload"
          value={courseImageUpload.fileList}
        />
        <Row>
          <Col md={12} sm={24} xs={24}>
            <div style={{ margin: "0 10px" }}>
              <FormItem1 label="Course Name" name="courseName" />
              <FormItem1 label="Teacher" name="teacher" />
              <Row gutter={[10, 0]}>
                <Col xl={12} xxl={12} lg={12} md={12} sm={24}>
                  <FormItem1 label="Student Limit" name="studentLimit" />
                </Col>
                <Col xl={12} xxl={12} lg={12} md={12} sm={24}>
                  <FormItem1 label="Course Fee" name="fee" />
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={12} sm={24} xs={24}>
            <div style={{ margin: "0 10px" }}>
              <Row gutter={[10, 0]}>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <FormItem1 label="Starting Date" name="startingDate" />
                </Col>
                <Col lg={12} md={12} sm={24} xs={24}>
                  <FormItem1 label="Ending Date" name="endingDate" />
                </Col>
              </Row>
              <FormItem1 label="Details" name="details" />
            </div>
          </Col>
          <Col md={24} sm={24} xs={24} xl={24} xxl={24}></Col>
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
              description={"Are you sure you want to edit this course?"}
            />
          )}
          {/* // TODO: where to link when cancel is clicked */}

          <Col xs={24} sm={24} md={12} lg={12}>
            <div style={{ margin: "0 10px 20px 10px" }}>
              <Link to={"/courses"}>
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
}
