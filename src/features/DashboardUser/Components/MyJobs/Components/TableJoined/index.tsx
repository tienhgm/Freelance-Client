import { Space, Table, Tag, Button } from 'antd';
import { useAppDispatch } from 'app/hooks';
import { handleCompletedJobByUser } from 'app/slices/jobSlice';
import ModalReview from 'components/ModalReviewOfCompany';
import { getJobStatus, getWorkingStatus } from 'helpers/Dashboard';
import { formatDateMonth } from 'helpers/generate';
import { useState } from 'react';
import PopupConfirm from 'components/PopupConfirm';
import ModalReviewOfUser from 'components/ModalReviewOfUser';
interface IProps {
  data: any | null;
  loading: boolean;
  handlePostReview: (data: any) => void;
  handleUpdateReviewFreelancer: (data: any) => void;
}
export default function TableJoined({ data, loading, handlePostReview, handleUpdateReviewFreelancer }: IProps) {
  const handleDetail = (record: any) => {
    window.open(`/find-jobs/${record.jobId}`, 'blank');
  };
  const dispatch = useAppDispatch();
  const handleDelete = (e: any) => {
    console.log(e);
  };
  const [openModalReview, setOpenModalReview] = useState(false);
  const [record, setRecord] = useState<any>();
  const [openDialogComplete, setOpenDialogComplete] = useState(false);
  const handleOpenModalReview = (record: any) => {
    setRecord(record);
    setOpenModalReview(true);
  };

  const handleOpenDialogComplete = (record: any) => {
    setRecord(record);
    setOpenDialogComplete(true);
  };
  const handleCompletedJob = async () => {
    const jobId = record.jobId;
    await dispatch(handleCompletedJobByUser(jobId));
  };
  const handleReview = (value: any) => {
    if (record) {
      let data = {
        jobId: record.jobId,
        review: value,
      };
      let updateData = {
        review: value,
        reviewId: value?.reviewId,
      };
      value.isEdit === false ? handlePostReview(data) : handleUpdateReviewFreelancer(updateData);
      setOpenModalReview(false)
    }
  };
  const columns = [
    {
      title: 'Job Name',
      dataIndex: 'jobName',
      key: 'jobName',
      render: (text: string) => <div className="font-medium">{text}</div>,
    },
    {
      title: 'Job status',
      dataIndex: 'jobStatus',
      key: 'jobStatus',
      render: (jobStatus: string) => <Tag color={getJobStatus(jobStatus)}>{jobStatus}</Tag>,
    },
    {
      title: 'Joined at',
      dataIndex: 'joinedAt',
      key: 'joinedAt',
      render: (joinedAt: any) => <div className="font-medium">{formatDateMonth(joinedAt)}</div>,
    },
    {
      title: 'Working status',
      dataIndex: 'jobEmployeeStatus',
      key: 'jobEmployeeStatus',
      render: (jobEmployeeStatus: string) => <Tag color={getWorkingStatus(jobEmployeeStatus)}>{jobEmployeeStatus}</Tag>,
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary: number) => <div className="font-medium"> {'$' + salary}</div>,
    },
    {
      width: 250,
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button size="small" onClick={() => handleDetail(record)}>
            Detail
          </Button>
          {record.jobEmployeeStatus !== 'Completed by user' && record.jobStatus === 'Inprogress' && (
            <Button size="small" onClick={() => handleOpenDialogComplete(record)}>
              Complete
            </Button>
          )}

          {['Remove'].includes(record.workStatus) && (
            <Button danger size="small" onClick={() => handleDelete(record)}>
              Delete
            </Button>
          )}
          {record.jobEmployeeStatus === 'Done' && (
            <Button size="small" onClick={() => handleOpenModalReview(record)}>
              {record.wroteReview ? 'See review' : 'Review'}
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} pagination={false} loading={loading} dataSource={data} />
      <ModalReviewOfUser
        isVisible={openModalReview}
        record={record}
        handleConfirm={handleReview}
        handleCancelConfirm={() => setOpenModalReview(false)}
      />
      <PopupConfirm
        title="Confirm"
        isVisible={openDialogComplete}
        popupText="Completed?"
        handleConfirm={handleCompletedJob}
        handleCancelConfirm={() => setOpenDialogComplete(false)}
      />
    </>
  );
}
