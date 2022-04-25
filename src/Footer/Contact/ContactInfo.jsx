import React from "react";

export const ContactInfo = ({icon, text}) => {
  return (
    <>
      {icon}
      <span style={{ paddingLeft: 10, color: "white" }}>
        {text}
      </span>
    </>
  );
};
