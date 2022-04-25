import React, { useContext, useEffect, useState } from "react";
import classes from "./CourseDetail.module.css";
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

export const CourseDetail = (props) => {
  console.log(props);
  const [isLoggedIn] = useContext(UserContext);
  const [modalVisibile, setModalVisible] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  console.log(modalVisibile);

  const {
    _id,
    courseImageUpload,
    courseName,
    teacher,
    startingDate,
    endingDate,
    studentLimit,
    fee,
    details,
  } = props.location.state.course;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getStudentCount/${_id}`, {
        withCreditentials: true,
      })
      .then((res) => console.log(res));
  }, [_id]);

  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
      apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
    },
  });

  function deleteCourse() {
    axios
      .delete(`http://localhost:5000/deleteCourse/${_id}`)
      .then((res) => {
        if (res.status === 200) {
          props.history.replace("/courses");
        }
      })
      .catch((err) => console.log(err));
  }

  if (isSubmit) {
    deleteCourse();
    setIsSubmit(false);
  }

  console.log(props.location.state.course);
  return (
    <div className={classes.body}>
      <div className={classes.img}>
        <Swiper
          spaceBetween={30}
          centeredSlides
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {courseImageUpload.map((image, index) => (
            <SwiperSlide>
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 50,
                }}
              >
                {
                  <AdvancedImage
                    cldImg={cld
                      .image(image?.public_id)
                      // .resize(scale().width(600).height(400))
                      .format("png")
                      .quality(100)}
                    className={classes.image}
                  />
                }
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={classes.text}>
        <h2>{courseName}</h2>
        Starting Date : <Moment date={startingDate} format={"DD/MM/YYYY"} />
        <br />
        Ending Date : <Moment date={endingDate} format={"DD/MM/YYYY"} />
        <br />
        Teacher : {teacher}
        <br />
        Course Fee : {fee} kyats
        <br />
        <h5>Details</h5>
        {details}
        <br />
        <div style={{ display: "flex" }}>
          <Button type="primary" className={classes.btn}>
            Apply Course
          </Button>
          {isLoggedIn && (
            <div>
              <Link
                to={{
                  pathname: "/editCourse",
                  state: { ...props.location.state.course, isEdit: true },
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
