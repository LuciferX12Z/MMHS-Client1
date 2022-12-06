// import React from 'react'

// export const Library = () => {
//     return (
//         <div>
//             Library
//         </div>
//     )
// }

import { Col, Row } from "antd";
import React, { useContext } from "react";
import { Button } from "antd";
import { CardComponent } from "../Exporter/Exporter";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

const url =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_BACKEND_URL
    : process.env.REACT_APP_DEV_BACKEND_URL;

export const Library = (props) => {
  const [library, setLibrary] = useState([]);
  const [isLoggedIn] = useContext(UserContext);
  console.log(library);
  // set "withCredentials : true" to send cookies with every request
  useEffect(() => {
    axios
      .get(`${url}/getlibrary/`, {
        withCredentials: true,
      })
      .then((res) => setLibrary(res.data));
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
              pathname: "/addBook",
              state: { ...props?.location?.state?.book, isEdit: false },
            }}
          >
            <Button type="primary">Add New Book</Button>
          </Link>
        </div>
      )}
      <Row wrap justify>
        {library?.book?.map((item) => {
          const bookItem = {
            ...item,
            image: item.bookImageUpload,
            name: item.book_name,
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
                item={bookItem}
                history={props?.history}
                path={"book"}
              />{" "}
            </Col>
          );
        })}
      </Row>
    </>
  );
};
