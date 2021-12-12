import { Table } from 'antd';
import './index.scss'
interface IProps {
  data: any | null;
}
export default function TableListSkillCompany({ data }: IProps) {
  const columns = [
    {
      title: 'Skill',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <div className="font-medium">{name}</div>,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (total: string) => <div>{total}</div>,
    },
  ];

  return <Table className="mt-6 pr-9 style-table" tableLayout="fixed" columns={columns} pagination={false} dataSource={data} />;
}
