import { Col, Row } from "antd";
import React, { useContext } from "react";
import { Button } from "antd";
import { CardComponent } from "../Exporter/Exporter";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { image } from "@cloudinary/url-gen/qualifiers/source";

const url =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_BACKEND_URL
    : process.env.REACT_APP_DEV_BACKEND_URL;

export const Courses = (props) => {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn] = useContext(UserContext);

  // set "withCredentials : true" to send cookies with every request
  useEffect(() => {
    axios
      .get(`${url}/getcourse/`, {
        withCredentials: true,
      })
      .then((res) => setCourses(res.data));
  }, []);
  return (
    <>
      {isLoggedIn && (
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            margin: "1rem 1rem 0 0",
          }}
        >
          <Link
            to={{
              pathname: "/addCourse",
              state: { ...props?.location?.state?.course, isEdit: false },
            }}
          >
            <Button type="primary">Add New Course</Button>
          </Link>
        </div>
      )}
      <Row wrap justify>
        {courses?.course?.map((item) => {
          const courseItem = {
            ...item,
            image: item.courseImageUpload,
            name: item.courseName,
          };
          return (
            <Col
              key={item._id}
              lg={6}
              md={12}
              sm={12}
              xs={24}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {" "}
              <CardComponent
                item={courseItem}
                history={props?.history}
                path={"course"}
              />{" "}
            </Col>
          );
        })}
      </Row>
    </>
  );
};
