import { Modal, Rate, Input, Form } from 'antd';
import { useAppSelector } from 'app/hooks';
import React, { useEffect, useState } from 'react';
type Popup = {
  isVisible: boolean;
  handleConfirm: (values: any) => any;
  handleCancelConfirm: () => any;
};

interface CollectionCreateFormProps {
  data: any;
  visible: boolean;
  onCreate: (values: any) => void;
  onCancel: () => void;
}
const { TextArea } = Input;

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({ data, visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const userRole = useAppSelector((state) => state.user.curUser.role);
  const [viewMode, setViewMode] = useState(false);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        rate: data.rate,
        comment: data.comment,
      });
    }
    if ((data?.reviewBy === "Company" && userRole === 1)
      || (data?.reviewBy === "Freelance" && userRole !== 1)) {
      setViewMode(false);
    } else {
      setViewMode(true);
    }

  }, [data, userRole])

  return (
    <Modal
      visible={visible}
      title="Review"
      okText={viewMode ? "Close" : "Save"}
      cancelText={"Cancel"}
      cancelButtonProps={{ghost: viewMode}}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onCreate(values);
          })
          .catch((info) => {
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <div className="flex items-center justify-center text-lg font-bold">
          Rate for job &nbsp; <span style={{ color: 'blue' }}>{data.jobTitle}</span>
        </div>
        <div className="mt-3 text-lg font-medium">
          <div>
            Rating <span style={{ color: 'red' }}>*</span>
          </div>
          <Form.Item name="rate" rules={[{ required: true, message: 'Please rate Star' }]}>
            <Rate allowHalf disabled={viewMode} />
          </Form.Item>
        </div>
        <div className="mt-3">
          <div className="text-lg font-medium">
            Comment <span style={{ color: 'red' }}>*</span>
          </div>
          <Form.Item name="comment" rules={[{ required: true, message: 'Please input your Comment' }]}>
            <TextArea showCount autoSize={{ minRows: 5, maxRows: 6 }} maxLength={200} disabled={viewMode} />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};
export default function CollectionsPage({ isVisible, handleConfirm, handleCancelConfirm }: Popup) {
  const data = useAppSelector(state => state.app.reviewData);
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(isVisible), [isVisible]);
  const onCreate = (values: any) => {
    handleConfirm({
      ...data,
      ...values
    });
  };
  const handleCancel = () => {
    handleCancelConfirm();
    setVisible(false);
  };
  return (
    <div>
      <CollectionCreateForm visible={visible} onCreate={onCreate} onCancel={handleCancel} data={data} />
    </div>
  );
}
