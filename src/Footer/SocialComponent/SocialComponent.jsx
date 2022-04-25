import { FacebookFilled } from "@ant-design/icons";
import { Typography } from "antd";
import React from "react";
const { Title, Text } = Typography;

export const SocialComponent = ({ icon, image, classes, link }) => {
  return (
    <div style={{ width: "fit-content" }}>
      <a href={link} target="_blank" rel="noreferrer">
        <img
          src={image}
          alt=""
          color="white"
          width={32}
          height={32}
          className={classes}
        />
        {icon}
      </a>
    </div>
  );
};
