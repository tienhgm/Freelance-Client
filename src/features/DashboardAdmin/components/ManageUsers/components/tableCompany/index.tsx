import React from 'react';
import { Table, Tag, Space } from 'antd';
interface IProps {
  data: any | null;
  columns: any;
  load: any;
}

function TableCompany({ data, columns, load}: IProps) {
  const dataCompany: any = [];

  data.map((item: any) => {
    dataCompany.push({
      key: item.id,
      avatar: item.avatar,
      name: `${item.lastName} ${item.firstName}`,
      email: item.email,
      isActivated: `${item.isActivated}`,
      isLock: `${item.isLock}`,
    });
  })
    return (
        <div>
            <Table columns={columns} dataSource={dataCompany} loading={load} scroll={{ y: 400 }} />
        </div>
    );
}

export default TableCompany;