import { useEffect, useState } from 'react';
import { Modal, Form, Input, Rate } from 'antd';
import './index.scss';
const { TextArea } = Input;
interface ModalForm {
  isVisible: boolean;
  handleConfirm: (values: any) => any;
  handleCancelConfirm: () => any;
  record?: any;
}
export default function ModalForm({ record, isVisible, handleConfirm, handleCancelConfirm }: ModalForm) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const handleCancel = () => {
    form.resetFields();
    handleCancelConfirm()
  }
  useEffect(() => {
    setVisible(isVisible);
  }, [isVisible]);
  return (
    <Modal
      visible={visible}
      className="custom-review"
      title={'Review'}
      okText={record && record.hasBeenReview ? 'Ok' : 'Save'}
      cancelText="Cancel"
      onCancel={handleCancel}
      onOk={() => {
        if (record && record.hasBeenReview) {
          handleCancel();
        } else {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleConfirm(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <Form.Item name="rate" label={'Rate'} rules={[{ required: true, message: 'Please rate' }]}>
          <Rate allowHalf allowClear disabled={record && record.hasBeenReview} />
        </Form.Item>
        <Form.Item name="comment" label={'Comment'} rules={[{ required: true, message: 'Please input your comment' }]}>
          <TextArea
            placeholder={'Comment'}
            disabled={record && record.hasBeenReview}
            autoSize={{ minRows: 5, maxRows: 6 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
