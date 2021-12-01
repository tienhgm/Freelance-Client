import React from 'react';
import { Button, Table, Tag } from 'antd';
import { useHistory } from 'react-router';
interface IProps {
  data: any | null;
}



function TableJobs({ data }: IProps) {
  const history = useHistory();

  const handleDetail = (job: any) => {
    history.push(`/find-jobs/${job.key}`)
  };
  const handleDelete = (e: any) => {
    console.log(e);
  };

  const columns: any = [
    {
      title: 'Name',
      width: 200,
      dataIndex: 'name',
      key: 'title',
      fixed: 'left',
      render: (text: string) => <div className="font-medium">{text}</div>,
    },
    { title: 'Company', dataIndex: 'companyName', key: 'company', width: 150 },
    { title: 'Experience', dataIndex: 'experience', key: 'experience', width: 150 },
    { title: 'Salary', dataIndex: 'salary', key: 'salary', width: 150 },
    { title: 'Location', dataIndex: 'location', key: 'location', width: 150 },
    { title: 'Work Mode', dataIndex: 'workMode', key: 'workMode', width: 150 },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: string) => (
        <>
          {status === "Pending" && <Tag color="#00BFFF">{status}</Tag>}
          {status === 'Inprogress' && <Tag color="#FFA500">{status}</Tag>}
          {status === 'Await' && <Tag color="purple">{status}</Tag>}
          {status === 'Done' && <Tag color="#87d068">{status}</Tag>}
          {status === 'Cancel' && <Tag color="#FF0000">{status}</Tag>}
        </>
      ),
    },
    { title: 'Business Fields', dataIndex: 'businessFields', key: 'businessFields', width: 200 },
    { title: 'Skills', dataIndex: 'skills', key: 'skills', width: 150 },
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate', width: 150 },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate', width: 150 },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 100,
      render: (record: any) => (
        <div>
          <Button className="mb-1" size="small" onClick={() => handleDetail(record)}>
            Detail
          </Button>
          <Button danger size="small" onClick={() => handleDelete(record)}>
              Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      scroll={{ x: 1500, y: 445 }}
      style={{ height: 'calc(100vh - 236px)' }}
      pagination={false}
    />
  );
}

export default TableJobs;
