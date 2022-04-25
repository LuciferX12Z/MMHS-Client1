import React, { useContext, useState } from "react";
import background from "../dummyImages/dummyLongBackground.jpg";
import classes from "../Apply/Apply.module.css";
import { Row, Col, Typography, Form, Button } from "antd";
import FormItem1 from "../Apply/FormItem1";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
const leftBackground = {
  backgroundImage: `url(${background})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "600px",
};

export const Login = ({history}) => {
  const [inputs, setInputs] = useState();
  const [isLoggedIn, setIsLoggedIn] = useContext(UserContext);


  const onFinish = (values) => {
    setInputs(values);
    // set "withCredentials : true" to send cookies with every request
    axios
      .post(
        "http://localhost:5000/login",
        { ...values },
        {
          withCredentials: true,
        }
      )
      .then((value) => {
        console.log(value);
        if (value && value?.data?.message === "ok") {
          setIsLoggedIn(true);
          history.push("/")
        }
      });
  };

  return (
    <>
      <Row>
        <Col md={16}>
          <div style={leftBackground}></div>
        </Col>
        <Col md={8} className={classes.rightPanel}>
          <Typography.Text className={classes.title}>Login</Typography.Text>
          <div className={classes.wrapper}>
            <Form colon={false} onFinish={onFinish} requiredMark={false}>
              <Row justify="space-between">
                <Col md={24} sm={24} xs={24}>
                  <FormItem1 label="G-Mail" name="email" />
                  <FormItem1 label="Password" name="password" />
                </Col>
              </Row>
              <Row
                style={{ display: "flex", flexDirection: "column" }}
                gutter={[0, 10]}
              >
                <Link to="/recoverPwd">
                  <span>Forgot Password</span>
                </Link>
                <Button
                  type="primary"
                  size="large"
                  style={{ width: "35%", borderRadius: "10px" }}
                  htmlType="submit"
                >
                  Login
                </Button>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};
