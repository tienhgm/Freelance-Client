import { useEffect, useState } from 'react';
import { Modal, Form, Input, Rate, Button } from 'antd';
import './index.scss';
import { useAppDispatch } from 'app/hooks';
import { handleGetReviewJobByCompanyOrUser } from 'app/slices/jobSlice';
import { ClockCircleOutlined } from '@ant-design/icons';
import { formatDateMonth } from 'helpers/generate';
import _ from 'lodash';
const { TextArea } = Input;
interface ModalForm {
  isVisible: boolean;
  handleConfirm: (values: any) => any;
  handleCancelConfirm: () => any;
  record?: any;
}
export default function ModalFormOfCompany({ record, isVisible, handleConfirm, handleCancelConfirm }: ModalForm) {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [reviewId, setReviewId] = useState<any>();
  const handleCancel = () => {
    form.resetFields();
    handleCancelConfirm();
  };
  const [disabledReview, setDisabledReview] = useState(false);
  const [initialInfo, setInitialInfo] = useState<any>({});
  const [timePost, setTimePost] = useState<any>();
  const dispatch = useAppDispatch();
  const handleGetReviewOfCompany = async () => {
    let data = {
      userId: record.user?.id,
      jobId: record.jobId,
      type: 'byCompany',
    };
    const { payload } = await dispatch(handleGetReviewJobByCompanyOrUser(data));
    if (payload) {
      form.setFieldsValue({
        rate: payload.rate,
        comment: payload.comment,
      });
      setInitialInfo({
        rate: payload.rate,
        comment: payload.comment,
      });
      setReviewId(payload.id);
      setTimePost(payload.createdAt);
    }
  };
  const editReview = () => {
    setDisabledReview((prev: any) => !prev);
  };
  useEffect(() => {
    if (record && record.hasBeenReview === true) {
      handleGetReviewOfCompany();
    }
    if (record) {
      setDisabledReview(record.hasBeenReview);
    }
    setVisible(isVisible);
    return () => {
      form.resetFields();
      if (record) {
        setDisabledReview(record.hasBeenReview);
      }
      setInitialInfo({});
      setReviewId(null);
    };
  }, [isVisible]);
  useEffect(() => {
    if (disabledReview) {
      form.setFieldsValue({
        rate: initialInfo.rate,
        comment: initialInfo.comment,
      });
    }
  }, [disabledReview]);
  return (
    <Modal
      visible={visible}
      className="custom-review"
      title={'Review'}
      okText={record && record.hasBeenReview ? 'Ok' : 'Save'}
      cancelText="Cancel"
      onCancel={handleCancel}
      onOk={() => {
        if (disabledReview === true) {
          handleCancel();
        } else {
          form
            .validateFields()
            .then((values) => {
              if (_.isEqual(initialInfo, values) || Object.entries(initialInfo).length === 0) {
                values.isEdit = false;
                handleConfirm(values);
              } else if(!_.isEqual(initialInfo, values) ) {
                values.isEdit = true;
                console.log('edit');
                values.reviewId = reviewId;
                handleConfirm(values);
              }
              form.resetFields();
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal" initialValues={{ modifier: 'public' }}>
        <div className="flex justify-between">
          {record && record.hasBeenReview && timePost && (
            <div style={{ color: '#888' }} className="flex items-center gap-2 text-base">
              <ClockCircleOutlined /> <span>{formatDateMonth(timePost)}</span>
            </div>
          )}
          {record && record.hasBeenReview && (
            <div>
              <Button onClick={editReview}>{disabledReview === true ? 'Edit' : 'Cancel edit'}</Button>
            </div>
          )}
        </div>

        <Form.Item name="rate" label={'Rate'} rules={[{ required: true, message: 'Please rate' }]}>
          <Rate allowHalf allowClear disabled={disabledReview} />
        </Form.Item>
        <Form.Item name="comment" label={'Comment'} rules={[{ required: true, message: 'Please input your comment' }]}>
          <TextArea placeholder={'Comment'} disabled={disabledReview} autoSize={{ minRows: 5, maxRows: 6 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
