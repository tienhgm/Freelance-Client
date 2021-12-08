import { Space, Table, Tag, Button } from 'antd';
import { getJobStatus, getApplyStatus } from 'helpers/Dashboard';
import { formatDateMonth } from 'helpers/generate';
interface IProps {
  data: any | null;
  loading: boolean;
}
export default function TableApplied({ data, loading }: IProps) {
  const handleDetail = (record: any) => {
    window.open(`/find-jobs/${record.jobId}`, 'blank')
  };
  const handleDelete = (e: any) => {
    console.log(e);
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
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button size="small" onClick={() => handleDetail(record)}>
            Detail
          </Button>
          {['Waiting', 'Rejected'].includes(record.jobApplyStatus) && (
            <Button danger size="small" onClick={() => handleDelete(record)}>
              Leave
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return <Table columns={columns} pagination={false} loading={loading} dataSource={data} />;
}
