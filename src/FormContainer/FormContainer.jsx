import { Form } from "antd";
import React from "react";

const FormContainer = ({
  onFinish,
  isEdit,
  valueObj,
  style,
  requiredMark,
  children,
}) => {
  return (
    <Form
      colon={false}
      onFinish={onFinish}
      requiredMark={requiredMark}
      initialValues={isEdit && { ...valueObj }}
      style={style}
      encType="multipart/form-data"
    >
      {children}
    </Form>
  );
};

export default FormContainer;
