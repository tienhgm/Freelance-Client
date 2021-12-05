import { Space, Table, Tag, Button } from 'antd';
import { getWorkingStatus } from 'helpers/Dashboard';
import { formatDateMonth } from 'helpers/generate';
import PopupRemove from 'components/PopupConfirm';
import { useState } from 'react';
import ModalDetailEmloyee from 'components/ModalDetailEmployee';
type InfoNeed = {
  maxEmployees: number;
  totalEmployees: number;
};
interface IProps {
  data: any | null;
  loading: boolean;
  infoNeed: InfoNeed;
  handleUpdateWorkStatus: (data: any) => void;
}
export default function TableEmployees({ data, loading, infoNeed, handleUpdateWorkStatus }: IProps) {
  const [openDialogRemove, setOpenDialogRemove] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [userIdRow, setUserIdRow] = useState<any>('');
  const [record, setRecord] = useState<any>();
  const handleDetail = (e: any) => {
    console.log(e);
  };
  const handleOpenModalDetail = (record: any) => {
    setOpenModalDetail(true);
    setUserIdRow(record.user.id);
  }
  const handleOpenDialogRemove = (record: any) => {
    setRecord(record);
    setOpenDialogRemove(true);
  };
  const handleRemove = () => {
    if (record) {
      let data = {
        jobId: record.jobId,
        employeeId: record.user.id,
      };
      handleUpdateWorkStatus(data);
    }
  };
  const columns = [
    {
      title: 'Avatar',
      dataIndex: ['user', 'avatar'],
      key: 'avatar',
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
      title: 'Join date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (createdAt: any) => <div className="font-medium">{formatDateMonth(createdAt)}</div>,
    },
    {
      title: 'Working status',
      dataIndex: 'employeeStatus',
      key: 'employeeStatus',
      render: (employeeStatus: string) => <Tag color={getWorkingStatus(employeeStatus)}>{employeeStatus}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: any) => (
        <Space size="middle">
          <Button size="small" onClick={() => handleOpenModalDetail(record)}>
            Detail
          </Button>
          {record.employeeStatus === 'Working' && (
            <Button danger size="small" onClick={() => handleOpenDialogRemove(record)}>
              Remove
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        title={() => (
          <div className="flex gap-2 text-base">
            <div>
              <span>Max employees require: </span>
              <span className="font-medium">{infoNeed.maxEmployees}</span>
            </div>
            <div>
              <span>| &nbsp; Current Employees: </span>
              <span className="font-medium">{infoNeed.totalEmployees}</span>
            </div>
          </div>
        )}
        dataSource={data}
        pagination={false}
      />
      <PopupRemove
        title="Accept"
        isVisible={openDialogRemove}
        popupText="Want to Remove?"
        handleConfirm={handleRemove}
        handleCancelConfirm={() => setOpenDialogRemove(false)}
      />
      <ModalDetailEmloyee
        title={'DETAIL'}
        isVisible={openModalDetail}
        handleCancelConfirm={() => setOpenModalDetail(false)}
        handleConfirm={() => setOpenModalDetail(false)}
        userId={userIdRow}
      />
    </>
  );
}
