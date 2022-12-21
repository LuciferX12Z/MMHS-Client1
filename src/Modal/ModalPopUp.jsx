import React, { useState } from "react";
import { Modal, Button } from "antd";

const ModalPopUp = (props) => {
  const [visible, setVisible] = useState(true);
  function onOkHandler() {
    setVisible(false);
    props?.setIsSubmit(true);
    props?.setModalVisible(false);
  }

  function onCancelHandler() {
    setVisible(false);
    props?.setIsSubmit(false);
    props?.setModalVisible(false);
  }
  return (
    <div>
      <Modal
        title={props?.title}
        centered
        open={visible}
        onOk={onOkHandler}
        onCancel={onCancelHandler}
      >
        <p>{props?.description}</p>
      </Modal>
    </div>
  );
};

export default ModalPopUp;
