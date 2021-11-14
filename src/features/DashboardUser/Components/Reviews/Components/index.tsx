import { Modal, Rate, Input, Form, Button, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
type Popup = {
  isVisible: boolean;
  handleConfirm: (values: any) => any;
  handleCancelConfirm: () => any;
};

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
}
const { TextArea } = Input;

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Review"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            // form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            // console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <div className="flex items-center justify-center text-lg font-bold">
          Rate for job &nbsp; <span style={{ color: 'blue' }}>Simulator TechNich</span>
        </div>
        <div className="mt-3 text-lg font-medium">
          <div>
            Your rating <span style={{ color: 'red' }}>*</span>
          </div>
          <Form.Item name="rate" rules={[{ required: true, message: 'Please rate Star' }]} >
            <Rate allowHalf />
          </Form.Item>
        </div>
        <div className="mt-3 ">
          <div className="text-lg font-medium">
            Comment <span style={{ color: 'red' }}>*</span>
          </div>
          <Form.Item name="comment" rules={[{ required: true, message: 'Please input your Comment' }]}>
            <TextArea showCount autoSize={{ minRows: 4, maxRows: 6 }} maxLength={200} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
export default function CollectionsPage({ isVisible, handleConfirm, handleCancelConfirm }: Popup) {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(isVisible), [isVisible]);
  const onCreate = (values: any) => {
    handleConfirm(values);
    // setVisible(false);
  };
  const handleCancel = () => {
    handleCancelConfirm();
    setVisible(false);
  };
  return (
    <div>
      <CollectionCreateForm visible={visible} onCreate={onCreate} onCancel={handleCancel} />
    </div>
  );
}
