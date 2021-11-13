import {
  AccountBookOutlined,
  CheckSquareOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  FieldTimeOutlined,
  LaptopOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import avatarDefault from 'assets/images/user-avatar-placeholder.png';
import { Tooltip, Rate, Pagination } from 'antd';
import './index.scss';
import { useState } from 'react';
import PopupCfJob from 'components/Popup';
import PopupCfFreelancer from 'components/Popup';

export default function Bookmarks() {
  const [curPageJobs, setCurPageJobs] = useState(1);
  const changePageIndexJob = (idx: number) => {
    setCurPageJobs(idx);
  };
  const [curPageFreelancers, setCurPageFreelancers] = useState(1);
  const changePageIndexFreelancer = (idx: number) => {
    setCurPageFreelancers(idx);
  };
  const [openDialogCfJob, setOpenDialogCfJob] = useState(false);
  const [openDialogCfFreelancer, setOpenDialogCfFreelancer] = useState(false);
  const handleDeleteJob = () => {
    console.log('delete');
    setOpenDialogCfJob(false);
  };
  const handleDeleteFreelancer = () => {
    console.log('delete');
    setOpenDialogCfFreelancer(false);
  };
  return (
    <div className="h-full bookmarks">
      <h1 className="text-2xl">Bookmarks</h1>
      <div className="jobs">
        <div className="jobs__title">
          <div className="flex items-center mb-4 ">
            <CheckSquareOutlined style={{ color: '#2e3fe5' }} className="mt-1 mr-4" />
            Bookmarked Jobs
          </div>
          <div className="h-32 box__item">
            {/* left */}
            <div className="flex items-center">
              <AccountBookOutlined style={{ fontSize: 45 }} />
              <div className="flex flex-col ml-4">
                <div className="text-lg box__item__title">Bilingual Event Support Speciallist</div>
                <div className="flex flex-wrap gap-4 box__item__content">
                  <div className="flex items-center">
                    <EnvironmentOutlined className="mt-1" />
                    <div className="ml-1">Ha Noi</div>
                  </div>
                  <div className="flex items-center">
                    <LaptopOutlined className="mt-1" />
                    <div className="ml-1">Fulltime</div>
                  </div>
                  <div className="flex items-center">
                    <FieldTimeOutlined className="mt-1" />
                    <div className="ml-1">2 days ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* end left */}
            {/* right */}

            <div className="btn btn__delete">
              <Tooltip placement="left" title="Delete">
                <DeleteOutlined onClick={() => setOpenDialogCfJob(true)} />
              </Tooltip>
              <PopupCfJob
                title="Confirm"
                isVisible={openDialogCfJob}
                popupText="Delete this Jobs From Bookmarks"
                handleConfirm={handleDeleteJob}
                handleCancelConfirm={() => setOpenDialogCfJob(false)}
              />
            </div>
            {/* end right */}
          </div>
          <Pagination className="mt-4" total={100} current={curPageJobs} onChange={changePageIndexJob} />
        </div>
      </div>
      <div className="mt-10 jobs">
        <div className="jobs__title">
          <div className="flex items-center mb-4 ">
            <SmileOutlined style={{ color: '#2e3fe5' }} className="mt-1 mr-4" />
            Bookmarked Freelancers
          </div>
          <div className="h-32 box__item">
            {/* left */}
            <div className="flex items-center">
              <img src={avatarDefault} style={{ width: '80px', height: '80px', borderRadius: '50%' }} alt="avatar" />
              <div className="flex flex-col ml-4">
                <div className="text-lg box__item__title">Bilingual Event Support Speciallist</div>
                <div className="box__item__content">IOS Developer</div>
                <div>
                  <Rate disabled defaultValue={2} />
                </div>
              </div>
            </div>
            {/* end left */}
            {/* right */}

            <div className="btn btn__delete">
              <Tooltip placement="left" title="Delete">
                <DeleteOutlined onClick={() => setOpenDialogCfFreelancer(true)}/>
              </Tooltip>
              <PopupCfFreelancer
                title="Confirm"
                isVisible={openDialogCfFreelancer}
                popupText="Delete Freelancer From Bookmarks"
                handleConfirm={handleDeleteFreelancer}
                handleCancelConfirm={() => setOpenDialogCfFreelancer(false)}
              />
            </div>
            {/* end right */}
          </div>
          <Pagination className="mt-4" total={100} current={curPageFreelancers} onChange={changePageIndexFreelancer} />
        </div>
      </div>
    </div>
  );
}
