import React, { useState } from "react";
import classes from "./Apply.module.css";
import { Form, Radio, Input, Select, DatePicker, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import Moment from "react-moment";

function blogChanger(image) {
  const reader = new FileReader();
  if (image?.lastModifiedDate) {
    reader.readAsDataURL(image.originFileObj);
  }
  image.image = reader;
  return image;
}

const { TextArea } = Input;
const FormItem1 = (props) => {
  const { label, name, value = null } = props;
  const [images, setImages] = useState([]);
  let message = "";

  // const CLOUDINARY_URL="cloudinary://788359128755684:d2SSDGsF0WRdOeoW9F1iRTS2uDg@dmrv0lujq"
  const uploadImage = (response) => {
    // console.log(response.fileList[0]);
    // setImages(response.fileList[0]);
    // axios.post("https://api.cloudinary.com/v1_1/dmrv0lujq/upload", {
    //   file: response.fileList,
    //   upload_preset: "bph7yyze",
    // }).then(res=> console.log(res));
  };

  switch (name) {
    case "name":
      message = "Please fill your name";
      break;
    case "email":
      message = "Please fill the email";
      break;
    case "phoneNumber":
      message = "Please fill the phone number";
      break;
    case "age":
      message = "Please fill the age";
      break;
    case "occupancy":
      message = "Please fill the occupancy";
      break;
    case "company/school":
      message = "Please fill the company or school";
      break;
    case "desiredCourse":
      message = "Please fill the desired course";
      break;
    case "gender":
      message = "Please select the gender";
      break;
    case "password":
      message = "Password is required!";
      break;
    case "confirmPassword":
      message = "Confirm password is required";
      break;
    case "courseName":
      message = "Course name is required";
      break;
    case "teacher":
      message = "Teacher name is required";
      break;
    case "studentLimit":
      message = "Student Limit is required";
      break;
    case "startingDate":
      message = "Starting date is required";
      break;
    case "endingDate":
      message = "Ending date is required";
      break;
    case "fee":
      message = "Course fee is required";
      break;
    case "courseImageUpload":
      message = "Choose At least one Course image.";
      break;
    case "details":
      message = "Details must be filled";
      break;
    default:
      message = "";
      break;
  }
  const rules = [
    {
      //   type: name === "email" && "email",
      required: true,
      message: message,
    },
  ];

  const formItems = () => {
    if (name === "gender") {
      return (
        <Form.Item
          label="Gender"
          name="gender"
          labelCol={{ sm: 24 }}
          labelAlign="left"
          rules={rules}
        >
          <Radio.Group
            style={{
              display: "flex",
              width: "60%",
              justifyContent: "space-between",
            }}
          >
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>
      );
    } else if (name === "desiredCourse") {
      return (
        <Form.Item
          label="Desired Course"
          name="desired course"
          labelCol={{ sm: 24 }}
          labelAlign="left"
          rules={rules}
        >
          <Select size="large">
            <Select.Option value="course one">Course 1</Select.Option>
            <Select.Option value="course two">Course 2</Select.Option>
            <Select.Option value="course three">Course 3</Select.Option>
          </Select>
        </Form.Item>
      );
    } else if (name === "password" || name === "confirmPassword") {
      return (
        <Form.Item
          label={label}
          name={name}
          labelCol={{ sm: 24 }}
          labelAlign="left"
          rules={rules}
        >
          <Input.Password placeholder="input password" />
        </Form.Item>
      );
    } else if (name === "courseImageUpload") {
      return (
        <Form.Item name={name} rules={rules} style={{ margin: "0 10px" }}>
          <Upload
            beforeUpload={() => false}
            listType="picture"
            maxCount={3}
            multiple
            accept="image/*"
            onChange={(response) => {
              let blobbedImages = response?.fileList?.map((image) =>
                blogChanger(image)
              );
              response.fileList = blobbedImages;
              setImages(blobbedImages);
            }}
            defaultFileList={value}
          >
            <Button icon={<UploadOutlined />}>Upload (Max: 3)</Button>
          </Upload>
        </Form.Item>
      );
    } else if (name === "details") {
      return (
        <Form.Item
          label={label}
          name={name}
          labelCol={{ sm: 24 }}
          labelAlign="left"
          rules={rules}
        >
          <TextArea rows={6} />
        </Form.Item>
      );
    } else {
      return (
        <Form.Item
          label={label}
          name={name}
          labelCol={{ sm: 24 }}
          labelAlign="left"
          rules={rules}
        >
          {label.includes("Date") ? (
            <DatePicker
              //TODO: minimum date must be today
              size="large"
              format="DD-MM-YYYY"
              style={{ width: "90%" }}
            />
          ) : (
            <Input size="large" className={classes.input} />
          )}
        </Form.Item>
      );
    }
  };

  return <>{formItems()}</>;
};

export default FormItem1;
