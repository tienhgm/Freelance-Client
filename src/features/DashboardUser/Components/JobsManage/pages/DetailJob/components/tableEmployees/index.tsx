import { Space, Table, Tag, Button } from 'antd';
import { getApplyStatus } from 'helpers/Dashboard';
import { formatDateMonth } from 'helpers/generate';
interface IProps {
  data: any | null;
  loading: boolean;
}
export default function TableDetail({ data, loading }: IProps) {
  const handleDetail = (e: any) => {
    console.log(e);
  };
  const handleDelete = (e: any) => {
    console.log(e);
  };
  const handleAccept = (e: any) => {
    console.log(e);
  };
  const columns = [
    {
      title: 'Avatar',
      dataIndex: ['user', 'avatar'],
      key: 'Avatar',
      render: (avatar: string) => (
        <div className="font-medium">
          <img src={`http://${avatar}`} width="40" height="40" alt="avt" style={{ borderRadius: '50%' }} />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (fullName: string) => <div className="font-medium">{fullName}</div>,
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'email',
      render: (email: string) => <div className="font-medium">{email}</div>,
    },
    {
      title: 'Apply date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: any) => <div className="font-medium">{formatDateMonth(createdAt)}</div>,
    },
    {
      title: 'Apply status',
      dataIndex: 'applyStatus',
      key: 'applyStatus',
      render: (applyStatus: string) => <Tag color={getApplyStatus(applyStatus)}>{applyStatus}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button size="small" onClick={() => handleDetail(record)}>
            Detail
          </Button>

          <Button type="primary" size="small" onClick={() => handleAccept(record)}>
            Accept
          </Button>
          <Button danger size="small" onClick={() => handleDelete(record)}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return <Table loading={loading} columns={columns} dataSource={data} pagination={false} />;
}
