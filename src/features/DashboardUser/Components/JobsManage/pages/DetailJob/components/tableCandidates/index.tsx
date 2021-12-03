import { Space, Table, Tag, Button } from 'antd';
import ModalFormReject from 'components/ModalForm';
import PopupAccept from 'components/PopupConfirm';
import { getApplyStatus } from 'helpers/Dashboard';
import { formatDateMonth } from 'helpers/generate';
import { useState } from 'react';
interface IProps {
  data: any | null;
  loading: boolean;
  handleUpdateApplyStatus: (data: any) => void;
}
export default function TableDetail({ data, loading, handleUpdateApplyStatus }: IProps) {
  const [record, setRecord] = useState<any>();
  const [openDialogAccept, setOpenDialogAccept] = useState(false);
  const [openModalReject, setOpenModalReject] = useState(false);
  const handleOpenDialogAccept = (record: any) => {
    setRecord(record);
    setOpenDialogAccept(true);
  };
  const handleOpenDialogReject = (record: any) => {
    setRecord(record);
    setOpenModalReject(true);
  };
  const handleDetail = (e: any) => {
    console.log(e);
  };
  const handleDelete = (e: any) => {
    console.log(e);
  };
  const handleAccept = async () => {
    if (record) {
      let data = {
        jobId: record.jobId,
        candidateId: record.user.id,
        applyStatus: 'Approve',
      };
      handleUpdateApplyStatus(data);
    }
  };
  const handleRejectCandidate = async (values: any) => {
    if (record) {
      let data = {
        jobId: record.jobId,
        candidateId: record.user.id,
        applyStatus: 'Reject',
        rejectMessage: values.rejectMessage,
      };
      handleUpdateApplyStatus(data);
    }
  };
  const columns = [
    {
      title: 'Avatar',
      dataIndex: ['user', 'avatar'],
      key: 'Avatar',
      width: 100,
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
      title: 'Introduce',
      dataIndex: 'introduceMessage',
      key: 'introduceMessage',
      width: 200,
      render: (introduceMessage: any) => <div className="font-medium">{introduceMessage}</div>,
    },
    {
      title: 'Apply status',
      dataIndex: 'applyStatus',
      key: 'applyStatus',
      render: (applyStatus: string) => <Tag color={getApplyStatus(applyStatus)}>{applyStatus}</Tag>,
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 250,
      render: (record: any) => (
        <Space size="middle">
          <Button size="small" onClick={() => handleDetail(record)}>
            Detail
          </Button>
          {record.applyStatus === 'Waiting' && (
            <Button type="primary" size="small" onClick={() => handleOpenDialogAccept(record)}>
              Accept
            </Button>
          )}
          {record.applyStatus === 'Waiting' && (
            <Button danger size="small" onClick={() => handleOpenDialogReject(record)}>
              Reject
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* @ts-ignore */}
      <Table loading={loading} columns={columns} dataSource={data} pagination={false} scroll={{ y: 400 }} />
      <PopupAccept
        title="Accept"
        isVisible={openDialogAccept}
        popupText="Want to accept?"
        handleConfirm={handleAccept}
        handleCancelConfirm={() => setOpenDialogAccept(false)}
      />
      <ModalFormReject
        visible={false}
        title={'Apply job'}
        okText={'Apply'}
        isVisible={openModalReject}
        handleConfirm={handleRejectCandidate}
        handleCancelConfirm={() => setOpenModalReject(false)}
        fieldName={'rejectMessage'}
        labelField={'Reject message'}
        ruleMessage={'Please input reject message'}
      />
    </>
  );
}
