import { useEffect, useState } from 'react';
import { Modal, Form, Input, Rate } from 'antd';
import './index.scss';
const { TextArea } = Input;
interface ModalForm {
  isVisible: boolean;
  handleConfirm: (values: any) => any;
  handleCancelConfirm: () => any;
}
export default function ModalForm({ isVisible, handleConfirm, handleCancelConfirm }: ModalForm) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(isVisible), [isVisible]);
  return (
    <Modal
      visible={visible}
      className="custom-review"
      title={'Review'}
      okText={'Save'}
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
        <Form.Item name="rate" label={'Rate'} rules={[{ required: true, message: 'Please rate' }]}>
          <Rate allowHalf allowClear/>
        </Form.Item>
        <Form.Item name="comment" label={'Comment'} rules={[{ required: true, message: 'Please input your comment' }]}>
          <TextArea placeholder={'Comment'} autoSize={{ minRows: 5, maxRows: 6 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
