import React, { useContext, useEffect, useState } from "react";
import classes from "./LibraryDetail.module.css";
import { Button } from "antd";
import Moment from "react-moment";
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react/swiper-react";

// import "swiper/swiper-bundle.min.css";
// import "swiper/swiper.min.css";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";
// import { AdvancedImage } from "@cloudinary/react";
import ModalPopUp from "../Modal/ModalPopUp";
import { AdvancedImage } from "@cloudinary/react";
// import { scale } from "@cloudinary/url-gen/actions/resize";
// import { quality } from "@cloudinary/url-gen/actions/delivery";
// import { auto } from "@cloudinary/url-gen/";

const url =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_BACKEND_URL
    : process.env.REACT_APP_DEV_BACKEND_URL;

export const BookDetail = (props) => {
  // console.log(props);
  const [isLoggedIn] = useContext(UserContext);
  const [modalVisibile, setModalVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  console.log(modalVisibile);
  // console.log(props.location.state?.item);
  const {
    _id,
    bookImageUpload,
    book_name,
    author,
    category,
    details,
    publisher,
    publish_date,
    bookUrl,
  } = props.location.state.item;

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
      apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
    },
  });

  function deleteBook() {
    axios
      .delete(`${url}/deleteBook/${_id}`)
      .then((res) => {
        if (res.status === 200) {
          props.history.replace("/library");
        }
      })
      .catch((err) => console.log(err));
  }

  if (isSubmit) {
    deleteBook();
    setIsSubmit(false);
  }
  console.log(bookImageUpload);
  // console.log(props.location.state.course);
  return (
    <div className={classes.body}>
      <div>
        {bookImageUpload.map((image, index) => (
          <AdvancedImage
            key={index}
            cldImg={cld
              .image(image?.public_id)
              // .resize(scale().width(600).height(400))
              .format("png")
              .quality(100)}
            className={classes.image}
          />
        ))}
      </div>
      <div className={classes.text}>
        <h2>{book_name}</h2>
        Author : {author}
        <br />
        Category : {category}
        <br />
        Publisher : {publisher}
        <br />
        Published Date : <Moment date={publish_date} format={"DD/MM/YYYY"} />
        <br />
        <h5>Details</h5>
        {details}
        <br />
        <div style={{ display: "flex" }}>
          <a href={bookUrl} target={"_blank"}>
            <Button
              type="primary"
              className={classes.btn}
              disabled={bookUrl ? false : true}
            >
              {bookUrl ? "Download Book" : "No Download Link"}
            </Button>
          </a>
          {isLoggedIn && (
            <div>
              <Link
                to={{
                  pathname: "/editBook",
                  state: { ...props.location.state.item, isEdit: true },
                }}
              >
                <Button type="ghost" className={classes.btn}>
                  EDIT
                </Button>
              </Link>
              <Button
                danger
                className={classes.btn}
                onClick={() => setModalVisible(true)}
              >
                DELETE
              </Button>
            </div>
          )}
        </div>
        {modalVisibile && (
          <ModalPopUp
            title={"Delete?"}
            description={"Are you sure you wanna delete this shit?"}
            setModalVisible={setModalVisible}
            setIsSubmit={setIsSubmit}
          />
        )}
      </div>
    </div>
  );
};
