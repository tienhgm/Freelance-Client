import './index.scss';
import { CheckSquareOutlined, DeleteOutlined, CalendarOutlined, EditOutlined, TeamOutlined } from '@ant-design/icons';
import { Tooltip, Button, Tag, Badge, Pagination } from 'antd';
import { useHistory } from 'react-router-dom';
import Popup from 'components/PopupConfirm';
import { useState } from 'react';

export default function ListJobs() {
  const history = useHistory();
  const goToDetail = () => {
    history.push('/dashboard/jobs-manage/1');
  };
  const goToEdit = () => {
    history.push('/dashboard/jobs-manage/edit/1');
  };
  const handleDeleteJob = () => {
    console.log("oke");
    setOpenDialogConfirm(false);
  };
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const handleOpenDialogConfirm = () => {
    setOpenDialogConfirm(true);
  };
  return (
    <div className="h-full jobs-manage">
      <h1 className="text-2xl">Manage Jobs</h1>
      <div className="jobs">
        <div className="jobs__title">
          <div className="flex items-center mb-4 ">
            <CheckSquareOutlined style={{ color: '#2e3fe5' }} className="mt-1 mr-4" />
            My Job Listings
          </div>
        </div>
        <div className="box">
          <div className="h-36 box__item">
            {/* left */}
            <div className="flex flex-col">
              <div className="flex gap-3">
                <div className="text-xl cursor-pointer">Nadoshiki organization</div>
                <div>
                  <Tag color="#87d068">Doned</Tag>
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <div className="flex items-center gap-2 box__item__content">
                  <CalendarOutlined /> Posted on 10 July, 2021
                </div>
              </div>
              <div className="mt-4">
                <Badge count={5}>
                  <Button type="primary" onClick={goToDetail}>
                    <TeamOutlined className="mb-1" />
                    Manage candidate
                  </Button>
                </Badge>
              </div>
            </div>

            {/* end left */}
            {/* right */}
            <div className="flex gap-3">
              <div className="cursor-pointer btn btn__edit" onClick={goToEdit}>
                <Tooltip placement="bottom" title="Edit">
                  <EditOutlined />
                </Tooltip>
              </div>
              <div className="cursor-pointer btn btn__delete" onClick={handleOpenDialogConfirm}>
                <Tooltip placement="bottom" title="Delete">
                  <DeleteOutlined />
                </Tooltip>
              </div>
            </div>
            {/* end right */}
          </div>
        </div>
      </div>
      <Popup
        title="Delete Job"
        isVisible={openDialogConfirm}
        popupText="Want to delete this job?"
        handleConfirm={handleDeleteJob}
        handleCancelConfirm={() => setOpenDialogConfirm(false)}
      />
      <Pagination className="mt-4" defaultCurrent={1} total={50} />
    </div>
  );
}
