import React, { useState } from "react";
import background from "../dummyImages/dummyLongBackground.jpg";
import classes from "../Apply/Apply.module.css";
import { Row, Col, Typography, Form, Button } from "antd";
import FormItem from "../Apply/FormItem";
import axios from "axios";

const leftBackground = {
  backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "800px",
};

export const Register = () => {
  const [inputs, setInputs] = useState();

  const onFinish = (values) => {
    setInputs(values);
    axios
      .post("http://localhost:5000/register", { ...values })
      .then((value) => console.log(value));
    console.log(values);
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <div style={leftBackground}></div>
        </Col>
        <Col md={16} className={classes.rightPanel}>
          <Typography.Text className={classes.title}>Register</Typography.Text>
          <div className={classes.wrapper}>
            <Form colon={false} onFinish={onFinish} requiredMark={false}>
              <Row justify="space-between">
                <Col md={12} sm={24} xs={24}>
                  <FormItem label="Name" name="name" />
                  <FormItem label="Phone Number" name="phoneNumber" />
                  <FormItem label="Role" name="role" />
                  <FormItem label="Gender" name="gender" />
                </Col>
                <Col md={12} sm={24} xs={24}>
                  <FormItem label="Age" name="age" />
                  <FormItem label="E-mail" name="email" />
                  <FormItem label="Password" name="password" />
                  <FormItem label="Confirm Password" name="confirmPassword" />
                </Col>
                <Button
                  type="primary"
                  size="large"
                  style={{ width: "35%", borderRadius: "10px" }}
                  htmlType="submit"
                >
                  Apply
                </Button>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};
