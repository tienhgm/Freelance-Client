import { useEffect, useState } from 'react';
import { Modal, Form, Input, Rate } from 'antd';
import './index.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { handleGetReviewJobByCompanyOrUser } from 'app/slices/jobSlice';
import { ClockCircleOutlined } from '@ant-design/icons';
import { formatDateMonth } from 'helpers/generate';
import _ from 'lodash';
const { TextArea } = Input;
interface ModalForm {
  isVisible: boolean;
  handleCancelConfirm: () => any;
  record?: any;
  type?: any;
}
export default function ModalSeeReview({ record, type, isVisible, handleCancelConfirm }: ModalForm) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const userId = useAppSelector((state) => state.user.curUser.id);
  const handleCancel = () => {
    form.resetFields();
    handleCancelConfirm();
  };
  const [timePost, setTimePost] = useState<any>();
  const dispatch = useAppDispatch();
  const handleGetReviewOfUser = async () => {
    let data = {
      userId: record.user?.id,
      jobId: record.jobId,
      type: 'byUser',
    };
    const { payload } = await dispatch(handleGetReviewJobByCompanyOrUser(data));
    if (payload) {
      form.setFieldsValue({
        rate: payload.rate,
        comment: payload.comment,
      });
      setTimePost(payload.createdAt);
    }
  };
  const handleGetReviewOfCompany = async () => {
    if (userId) {
      let data = {
        userId: userId,
        jobId: record.jobId,
        type: 'byCompany',
      };
      const { payload } = await dispatch(handleGetReviewJobByCompanyOrUser(data));
      if (payload) {
        form.setFieldsValue({
          rate: payload.rate,
          comment: payload.comment,
        });
        setTimePost(payload.createdAt);
      }
    }
  };
  useEffect(() => {
    if (record && type === 'forCompany') {
      handleGetReviewOfUser();
    }
    if (record && type === 'forUser') {
      handleGetReviewOfCompany();
    }
    setVisible(isVisible);
    return () => {
      form.resetFields();
    };
  }, [isVisible]);
  return (
    <Modal
      visible={visible}
      className="custom-review"
      title={'Review'}
      okText={'Ok'}
      cancelText="Cancel"
      onCancel={handleCancel}
      onOk={handleCancel}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <div className="flex justify-between">
          {record && record.wroteReview && timePost && (
            <div style={{ color: '#888' }} className="flex items-center gap-2 text-base">
              <ClockCircleOutlined /> <span>{formatDateMonth(timePost)}</span>
            </div>
          )}
        </div>
        <Form.Item name="rate" label={'Rate'} rules={[{ required: true, message: 'Please rate' }]}>
          <Rate allowHalf allowClear disabled />
        </Form.Item>
        <Form.Item name="comment" label={'Comment'} rules={[{ required: true, message: 'Please input your comment' }]}>
          <TextArea placeholder={'Comment'} disabled autoSize={{ minRows: 5, maxRows: 6 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
