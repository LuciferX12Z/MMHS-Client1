import { Col, Row } from "antd";
import React from "react";
import { CardComponent } from "../Exporter/Exporter";
import { useEffect, useState } from "react";
import axios from "axios";

export const Courses = (props) => {
  const [courses, setCourses] = useState([]);

  // set "withCredentials : true" to send cookies with every request
  useEffect(() => {
    axios
      .get("http://localhost:5000/getcourse/", {
        withCredentials: true,
      })
      .then((res) => setCourses(res.data));
  }, []);
  return (
    <div>
      <Row wrap justify>
        {courses?.course?.map((item) => (
          <Col
            key={item._id}
            lg={6}
            md={12}
            sm={12}
            xs={24}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {" "}
            <CardComponent course={item} history={props.history} />{" "}
          </Col>
        ))}
      </Row>
    </div>
  );
};
