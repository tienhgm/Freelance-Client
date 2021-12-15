import { Space, Table, Tag } from 'antd';
interface IProps {
  data: any | null;
  load: any;
}

function TableCompany({ data, load }: IProps) {
  const columns = [
    {
      title: 'Logo',
      dataIndex: 'logo',
      key: 'logo',
      width: 100,
      render: (logo: any) => (
        <div className="font-medium">
          <img src={`http://${logo}`} width="40" height="40" alt="avt" style={{ borderRadius: '50%' }} />
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Verfied',
      dataIndex: 'isVerified',
      key: 'isVerified',
      render: (isVerified: any) => (
        <>
          {!isVerified && <Tag color="error">not verify</Tag>}
          {isVerified && <Tag color="success">verified</Tag>}
        </>
      ),
    },
    {
      title: 'Stars',
      dataIndex: 'stars',
      key: 'stars',
      render: (stars: any) => (
        <>
          {stars}
        </>
      ),
    },
    {
      title: 'Review point',
      dataIndex: 'reviewPoint',
      key: 'reviewPoint',
      render: (reviewPoint: any) => (
        <>
          {reviewPoint}
        </>
      ),
    },
    {
      title: 'Total reviews',
      dataIndex: 'totalReviews',
      key: 'totalReviews',
      render: (totalReviews: any) => (
        <>
          {totalReviews}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 250,
      render: (text: any, record: any) => (
        <Space size="middle">
          <a>edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} loading={load} scroll={{ y: 400 }} />
    </div>
  );
}

export default TableCompany;
