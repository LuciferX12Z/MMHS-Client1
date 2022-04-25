import React from "react";
import classes from "./Apply.module.css";
import { Form, Radio, Input, Select } from "antd";

const FormItem = ({ label, name, courses = [] }) => {
  let message = "";
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
    default:
      message = "";
      break;
  }
  const rules = [
    {
      type: name === "email" && "email",
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
          name="desiredCourse"
          labelCol={{ sm: 24 }}
          labelAlign="left"
          rules={rules}
        >
          <Select size="large" style={{ width: "80%" }}>
            {courses?.course?.map((course) => (
              <Select.Option value={course._id}>
                {course.courseName}
              </Select.Option>
            ))}
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
          <Input.Password
            placeholder="input password"
            style={{ width: "80%" }}
          />
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
          <Input
            size="large"
            className={classes.input}
            style={{ width: "80%" }}
          />
        </Form.Item>
      );
    }
  };

  return <>{formItems()}</>;
};

export default FormItem;
