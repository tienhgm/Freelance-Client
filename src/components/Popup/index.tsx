import { Modal } from "antd";
import React, { useMemo } from "react";
type Popup = {
  popupText: string;
  title: string;
  isVisible: boolean;
  handleConfirm: () => any;
  handleCancelConfirm: () => any;
};
export default function Popup({ popupText, isVisible, handleConfirm, handleCancelConfirm, title }: Popup) {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  useMemo(() => setVisible(isVisible), [isVisible]);
  const handleOk = () => {
    setConfirmLoading(true);
    setVisible(false);
    handleConfirm();
  };

  const handleCancel = () => {
    handleCancelConfirm()
    setVisible(false);
  };

  return (
    <>
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{popupText}</p>
      </Modal>
    </>
  );
}
