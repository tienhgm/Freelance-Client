import { useEffect, useState } from 'react';
import { Modal, Form, Input, Rate } from 'antd';
import './index.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { handleGetReviewJobByCompanyOrUser } from 'app/slices/jobSlice';
import { ClockCircleOutlined } from '@ant-design/icons';
import { formatDateMonth } from 'helpers/generate';
const { TextArea } = Input;
interface ModalForm {
  isVisible: boolean;
  handleConfirm: (values: any) => any;
  handleCancelConfirm: () => any;
  record?: any;
}
export default function ModalFormOfUser({ record, isVisible, handleConfirm, handleCancelConfirm }: ModalForm) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const handleCancel = () => {
    form.resetFields();
    handleCancelConfirm();
  };
  const [timePost, setTimePost] = useState<any>();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.curUser.id);
  const handleGetReviewOfUser = async () => {
    let data = {
      userId: userId,
      jobId: record.jobId,
      type: 'byUser',
    };
    const { payload } = await dispatch(handleGetReviewJobByCompanyOrUser(data));
    console.log(payload);
    if (payload) {
      form.setFieldsValue({
        rate: payload.rate,
        comment: payload.comment,
      });
      setTimePost(payload.createdAt);
    }
  };
  useEffect(() => {
    if (record && record.wroteReview === true) {
      handleGetReviewOfUser();
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
      okText={record && record.wroteReview ? 'Ok' : 'Save'}
      cancelText="Cancel"
      onCancel={handleCancel}
      onOk={() => {
        if (record && record.wroteReview) {
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
        {record && record.hasBeenReview && timePost && (
          <div style={{ color: '#888' }} className="flex items-center gap-2 text-base">
            <ClockCircleOutlined /> <span>{formatDateMonth(timePost)}</span>
          </div>
        )}
        <Form.Item name="rate" label={'Rate'} rules={[{ required: true, message: 'Please rate' }]}>
          <Rate allowHalf allowClear disabled={record && record.wroteReview} />
        </Form.Item>
        <Form.Item name="comment" label={'Comment'} rules={[{ required: true, message: 'Please input your comment' }]}>
          <TextArea
            placeholder={'Comment'}
            disabled={record && record.wroteReview}
            autoSize={{ minRows: 5, maxRows: 6 }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
