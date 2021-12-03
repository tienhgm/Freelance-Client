import React, { useEffect, useState } from 'react';
import { Modal, Form, Input } from 'antd';
const { TextArea } = Input;
interface ModalForm {
  visible: boolean;
  title: string;
  okText: string;
  isVisible: boolean;
  fieldName: string;
  labelField: string;
  ruleMessage: string;
  handleConfirm: (values: any) => any;
  handleCancelConfirm: () => any;
}
export default function ModalForm({
  title,
  labelField,
  fieldName,
  isVisible,
  okText,
  ruleMessage,
  handleConfirm,
  handleCancelConfirm,
}: ModalForm) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(isVisible), [isVisible]);
  return (
    <Modal
      visible={visible}
      title={title}
      okText={okText}
      cancelText="Cancel"
      onCancel={handleCancelConfirm}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleConfirm(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <Form.Item
          name={fieldName}
          label={labelField}
          rules={[{ required: true, message: ruleMessage }]}
        >
          <TextArea placeholder={labelField} autoSize={{ minRows: 5, maxRows: 6 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
