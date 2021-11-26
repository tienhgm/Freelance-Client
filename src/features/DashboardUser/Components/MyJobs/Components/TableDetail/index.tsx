import { Space, Table, Tag, Button } from 'antd';
import { handleGetStatusEarning, handleGetJobProgress } from 'helpers/Dashboard';
import { statusApply } from 'utils/enum';
interface IProps {
  data: any | null;
}
export default function TableDetail({ data }: IProps) {
  const handleDetail = (e: any) => {
    console.log(e);
  };
  const handleDelete = (e: any) => {
    console.log(e);
  };
  const columns = [
    {
      title: 'Job Name',
      dataIndex: 'job_name',
      key: 'job_name',
      render: (text: string) => <div className="font-medium">{text}</div>,
    },
    {
      title: 'Job Progress',
      dataIndex: 'job_progress',
      key: 'job_progress',
      render: (job_progress: number) => (
        <>
          {job_progress === 0 && <Tag color="#00BFFF">{handleGetJobProgress(job_progress)}</Tag>}
          {job_progress === 1 && <Tag color="#FFA500">{handleGetJobProgress(job_progress)}</Tag>}
          {job_progress === 2 && <Tag color="#87d068">{handleGetJobProgress(job_progress)}</Tag>}
          {job_progress === 3 && <Tag color="#FF0000">{handleGetJobProgress(job_progress)}</Tag>}
        </>
      ),
    },
    {
      title: 'Company',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (
        <>
          {status === 0 && <Tag color="#FF00FF">{handleGetStatusEarning(status)}</Tag>}
          {status === 1 && <Tag color="#87d068">{handleGetStatusEarning(status)}</Tag>}
          {status === 2 && <Tag color="#FF0000">{handleGetStatusEarning(status)}</Tag>}
         
        </>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment',
      render: (payment: number) => <div className="font-medium"> {payment > 0 && '$ ' + payment}</div>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button size="small" onClick={() => handleDetail(record)}>
            Detail
          </Button>
          {[statusApply.Waiting,statusApply.Rejected].includes(record.status) && (
            <Button danger size="small" onClick={() => handleDelete(record)}>
              Delete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} />;
}
