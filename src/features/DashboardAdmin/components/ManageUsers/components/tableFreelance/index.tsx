import React from 'react';
import { Table, Tag, Space } from 'antd';
interface IProps {
  data: any | null,
  columns: any;
  load: any;
}


function TableFreelance({ data, columns, load }: IProps) {
  const dataFreelancer: any = [];

  data.map((item: any) => {
    dataFreelancer.push({
      key: item.id,
      avatar: item.avatar,
      name: `${item.lastName} ${item.firstName}`,
      email: item.email,
      isActivated: `${item.isActivated}`,
      isLock: `${item.isLock}`,
    });
  });
  return (
    <div>
      <Table columns={columns} dataSource={dataFreelancer} loading={load} scroll={{ y: 400 }} />
    </div>
  );
}

export default TableFreelance;
