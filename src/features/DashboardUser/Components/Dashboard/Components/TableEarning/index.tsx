import { Table, Tag } from 'antd';
import { handleGetStatusEarning } from 'utils/Dashboard';
export default function TableEarning() {
  const columns = [
    {
      title: 'Job Name',
      dataIndex: 'job_name',
      key: 'job_name',
      render: (text: string) => <div className="font-medium">{text}</div>,
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
          {status === 1 && <Tag color="#00BFFF">{handleGetStatusEarning(status)}</Tag>}
          {status === 2 && <Tag color="#FFA500">{handleGetStatusEarning(status)}</Tag>}
          {status === 3 && <Tag color="#87d068">{handleGetStatusEarning(status)}</Tag>}
          {status === 4 && <Tag color="#FF0000">{handleGetStatusEarning(status)}</Tag>}
        </>
      ),
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment',
      render: (payment: number) => <div className="font-medium"> {payment > 0 && '$ ' + payment}</div>,
    },
  ];

  const data = [
    {
      key: '1',
      job_name: 'Service organization',
      company_name: 'Josh Etc',
      status: 1,
      payment: 100,
    },
    {
      key: '2',
      job_name: 'Work numui',
      company_name: 'Anemia',
      status: 2,
      payment: 0,
    },
    {
      key: '3',
      job_name: 'Chat application',
      company_name: 'SuTek Co',
      status: 3,
      payment: 300,
    },
    {
      key: '4',
      job_name: 'Bot fake auth',
      company_name: 'Memi Co',
      status: 4,
      payment: 0,
    },
  ];
  return <Table columns={columns} dataSource={data}  />;
}
