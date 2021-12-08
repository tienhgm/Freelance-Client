import { Space, Table, Tag, Button } from 'antd';
import ModalReview from 'components/ModalReview';
import { getJobStatus, getWorkingStatus } from 'helpers/Dashboard';
import { formatDateMonth } from 'helpers/generate';
import { useState } from 'react';
interface IProps {
  data: any | null;
  loading: boolean;
  handlePostReview: (data: any) => void;
}
export default function TableJoined({ data, loading, handlePostReview }: IProps) {
  const handleDetail = (record: any) => {
    window.open(`/find-jobs/${record.jobId}`, 'blank');
  };
  const handleDelete = (e: any) => {
    console.log(e);
  };
  const [openModalReview, setOpenModalReview] = useState(false);
  const [record, setRecord] = useState<any>();
  const handleOpenModalReview = (record: any) => {
    setRecord(record);
    setOpenModalReview(true);
  };
  const handleReview = (value: any) => {
    console.log(record);
    console.log(value);
    if (record) {
    //   let data = {
    //     userId: record.user.id,
    //     jobId: record.jobId,
    //     review: value,
    //   };
      //   handlePostReview(data);
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
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (status: number) => (
    //     <>
    //       {status === 0 && <Tag color="#FF00FF">{handleGetStatusEarning(status)}</Tag>}
    //       {status === 1 && <Tag color="#87d068">{handleGetStatusEarning(status)}</Tag>}
    //       {status === 2 && <Tag color="#FF0000">{handleGetStatusEarning(status)}</Tag>}
    //     </>
    //   ),
    // },
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
    // {
    //   title: 'Payment',
    //   dataIndex: 'payment',
    //   key: 'payment',
    //   render: (payment: number) => <div className="font-medium"> {payment > 0 && '$ ' + payment}</div>,
    // },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button size="small" onClick={() => handleDetail(record)}>
            Detail
          </Button>
          {['Remove'].includes(record.workStatus) && (
            <Button danger size="small" onClick={() => handleDelete(record)}>
              Delete
            </Button>
          )}
          {record.jobEmployeeStatus === 'Done' && (
            <Button size="small" onClick={() => handleOpenModalReview(record)}>
              Review
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} pagination={false} loading={loading} dataSource={data} />
      <ModalReview
        isVisible={openModalReview}
        record={record}
        handleConfirm={handleReview}
        handleCancelConfirm={() => setOpenModalReview(false)}
      />
    </>
  );
}
