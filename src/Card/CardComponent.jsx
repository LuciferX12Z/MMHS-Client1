import React from "react";
import { Card } from "antd";
import classes from "./CardComponent.module.css";
import { CardStyles } from "../Exporter/Exporter";
import { Link } from "react-router-dom";
const { Meta } = Card;

export const CardComponent = (props) => {
  // console.log(props);
  return (
    <Link
      to={{
        pathname: `/${props.path}/${props.item._id}`,
        state: {
          item: props.item,
        },
      }}
    >
      <div className={classes.container}>
        <Card
          className={classes.card}
          cover={<img src={props?.item?.image[0]?.url} alt="" />}
          style={CardStyles.card}
          hoverable
        >
          <Meta title={props.item.name} description={props.item.details} />
        </Card>
      </div>
    </Link>
  );
};
