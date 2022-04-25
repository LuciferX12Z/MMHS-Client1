import React from "react";
import { Card } from "antd";
import classes from "./CardComponent.module.css";
import { CardStyles } from "../Exporter/Exporter";
import { Link } from "react-router-dom";
const { Meta } = Card;

export const CardComponent = (props) => {
  return (
    <Link
      to={{
        pathname: `/courses/${props.course._id}`,
        state: {
          course: props.course,
        },
      }}
    >
      <div className={classes.container}>
        <Card
          className={classes.card}
          cover={<img src={props?.course?.courseImageUpload[0]?.url} alt="" />}
          style={CardStyles.card}
          hoverable
        >
          <Meta
            title={props.course.courseName}
            description={props.course.details}
          />
        </Card>
      </div>
    </Link>
  );
};
