import React, { useState } from "react";
import classes from "./Apply.module.css";
import { Form, Radio, Input, Select, DatePicker, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function blogChanger(image) {
  const reader = new FileReader();
  if (image?.lastModifiedDate) {
    reader.readAsDataURL(image.originFileObj);
  }
  image.image = reader;
  return image;
}

const { TextArea } = Input;
const FormItem1 = ({
  label = "",
  name,
  value = null,
  exceptionName = "",
  imageMaxCount = 3,
}) => {
  const [images, setImages] = useState([]);
  let message = "";

  switch (name) {
    case name:
      message = `Please fill your ${label}`;
      break;
    default:
      message = "";
      break;
  }
  const rules = [
    {
      //   type: name === "email" && "email",
      required: exceptionName === name ? false : true,
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
    } else if (name.includes("Image")) {
      return (
        <Form.Item name={name} rules={rules} style={{ margin: "0 10px" }}>
          <Upload
            beforeUpload={() => false}
            listType="picture"
            maxCount={imageMaxCount}
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
            <Button icon={<UploadOutlined />}>
              Upload (Max: {imageMaxCount})
            </Button>
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
