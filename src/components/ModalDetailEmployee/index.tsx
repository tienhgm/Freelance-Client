import { Modal } from "antd";
import React, { useEffect } from "react";
type Popup = {
  title: string;
  isVisible: boolean;
  handleConfirm: (id?:any) => any;
  handleCancelConfirm: () => any;
};
export default function ModalDetailEmloyee({
  isVisible,
  handleConfirm,
  handleCancelConfirm,
  title,
}: Popup) {
  const [visible, setVisible] = React.useState(false);

  useEffect(() => setVisible(isVisible), [isVisible]);
  const handleOk = () => {
    setVisible(false);
    handleConfirm();
  };

  const handleCancel = () => {
    handleCancelConfirm();
    setVisible(false);
  };

  return (
    <>
      <Modal
        width={1000}
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
          <div>heeloo worl</div>
      </Modal>
    </>
  );
}
