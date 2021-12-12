import { Space, Table, Tag, Button, Modal } from 'antd';
import { useAppDispatch } from 'app/hooks';
import { leaveJobWhenAwait } from 'app/slices/jobSlice';
import PopupConfirm from 'components/PopupConfirm';
import { getJobStatus, getApplyStatus } from 'helpers/Dashboard';
import { formatDateMonth } from 'helpers/generate';
import { useState } from 'react';
interface IProps {
  data: any | null;
  loading: boolean;
}
export default function TableApplied({ data, loading }: IProps) {
  const handleDetail = (record: any) => {
    window.open(`/find-jobs/${record.jobId}`, 'blank');
  };
  const [openModalLeaveJob, setOpenModalLeaveJob] = useState(false);
  const [record, setRecord] = useState<any>();

  const errorPopup = (content: string) => {
    Modal.error({
      title: 'Reject reason',
      content,
    });
  };
  const handleLeave = (item:any) => {
    setRecord(item);
    setOpenModalLeaveJob(true)
  }
  const dispatch = useAppDispatch();
  const leaveJob = async() => {
    await dispatch(leaveJobWhenAwait(record.jobId))
  }
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
      title: 'Applied at',
      dataIndex: 'appliedAt',
      key: 'appliedAt',
      render: (appliedAt: any) => <div className="font-medium">{formatDateMonth(appliedAt)}</div>,
    },
    {
      title: 'Applied status',
      dataIndex: 'jobApplyStatus',
      key: 'jobApplyStatus',
      render: (jobApplyStatus: string) => <Tag color={getApplyStatus(jobApplyStatus)}>{jobApplyStatus}</Tag>,
    },
    // {
    //   title: 'Payment',
    //   dataIndex: 'payment',
    //   key: 'payment',
    //   render: (payment: number) => <div className="font-medium"> {payment > 0 && '$ ' + payment}</div>,
    // },
    {
      width: 300,
      title: 'Action',
      key: 'action',
      render: (item: any) => (
        <Space size="middle">
          <Button size="small" onClick={() => handleDetail(item)}>
            Detail
          </Button>
          {['Waiting'].includes(item.jobApplyStatus) && (
            <Button danger size="small" onClick={() => handleLeave(item)}>
              Leave
            </Button>
          )}
          {item.jobApplyStatus === 'Rejected' && (
            <Button size="small" onClick={() => errorPopup(item.rejectMessage)}>
              Reject reason
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} pagination={false} loading={loading} dataSource={data} />
      <PopupConfirm
        title="Confirm"
        isVisible={openModalLeaveJob}
        popupText="You want to leave this application?"
        handleConfirm={leaveJob}
        handleCancelConfirm={() => setOpenModalLeaveJob(false)}
      />
    </>
  );
}
