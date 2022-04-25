import React from "react";
import classes from "./RecoverPwd.module.css";
import { Input, Row, Col, Button, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import dummyImage from "../dummyImages/dummyBackground.png";

const onFinish = (values) => {
  console.log("Success:", values);
};

export const RecoverPwd = () => {
  return (
    <div className={classes.all}>
      <Row>
        <Col lg={14} md={14} sm={0} xs={0}>
          <div className={classes.image}>
            <img src={dummyImage} className={classes.img} />
          </div>
        </Col>
        <Col lg={10} md={10} sm={24} xs={24}>
          <div className={classes.text}>
            <Form
              style={{
                padding: "3em",
                paddingTop: "6em",
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
              }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <h1>Recover Password</h1>
              <label>Username</label>
              <br />
              <Form.Item
                name="E-mail"
                rules={[
                  { required: true, message: "Please input your E-mail!" },
                ]}
              >
                <Input placeholder="...@gmail.com" />
                <br />
              </Form.Item>
              <label>Enter Passcode</label>
              <br />
              <Form.Item
                name="passcode"
                rules={[
                  { required: true, message: "Please input your passcode!" },
                ]}
              >
                <Input.Group compact block>
                  <Input
                    style={{ width: "calc(100% - 60px)" }}
                    placeholder="Enter Code"
                  />

                  <Button type="primary">Sent</Button>
                </Input.Group>
              </Form.Item>
              <br />
              <label>Enter New Password</label>
              <br />
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="New Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <br />
              <label>Confirm Password</label>
              <br />
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Confirm Password"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <br />
              <Row>
                <Col span={12}>
                  <Button type="primary" block htmlType="submit">
                    Login
                  </Button>
                </Col>
                <Col span={1}></Col>
                <Col span={11}>
                  <Button block>Cancel</Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};
