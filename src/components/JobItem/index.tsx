import React, { useState } from 'react';
import defaultCompanyLogo from 'assets/images/company-logo-default.png';
import Skeletons from 'react-loading-skeleton';
import { Skeleton, Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import { timeFromNow, formatDate } from 'helpers/generate';
import './styles.scss';
import JobItemProps from 'types/jobItemProps';
import { useAppSelector } from 'app/hooks';
// import isLogin from 'helpers/isUserLogin';

export default function JobItem({
  company,
  companyLogo,
  jobTitle,
  location,
  jobType,
  salary,
  postTime,
  loading,
  startDate,
  endDate,
  skills,
  level,
  id,
}: JobItemProps) {
  const history = useHistory();
  const userRole = useAppSelector((state) => state.user.curUser.role);
  const [bookmark, setBookmark] = useState(false);
  // let isUserLogin = isLogin();
  // const addOrRemoveBookmark = () => {
  //   setBookmark(!bookmark);
  // };

  const gotoDetailPage = (id: any) => {
    history.push(`find-jobs/${id}`);
  };
  const compareTimeAvailableWithNow = (endDate: any) => {
    let timeNow = new Date().getTime();
    let endTime = new Date(endDate).getTime();
    return endTime > timeNow ? 'green' : 'red';
  };
  return (
    <Skeleton active loading={loading}>
      <div className="relative transition-all shadow-md job-item__wrapper hover:shadow-xl">
        {/* {userRole === 1 || !isUserLogin ? (
          <></>
        ) : (
          <div
            className={`content__bookmark transition-all top-24 ${bookmark ? 'added' : ''}`}
            style={{ zIndex: 99 }}
            onClick={addOrRemoveBookmark}
          >
            <div className="bookmark__animation"></div>
            <i className="transition-all bx bxs-star"></i>
          </div>
        )} */}

        <div className="job-item" onClick={() => gotoDetailPage(id)}>
          <div className="flex w-full p-8 job-item__content">
            <div className="relative mr-3 content__logo w-14 h-14 ">
              <Skeletons height={56} />
              <img
                src={companyLogo || defaultCompanyLogo}
                alt="company logo"
                width="56"
                height="56"
                className="absolute top-0 z-50"
              />
            </div>
            <div className="flex-grow content__text">
              <span className="flex gap-1 content__company-name">
                <div style={{ width: 'calc(70%)' }}>{company}</div>
                <div>
                  <div>
                    <Tag color={compareTimeAvailableWithNow(endDate)}>
                      {formatDate(startDate)} -{'>'} {formatDate(endDate)}
                    </Tag>
                  </div>
                </div>
              </span>

              <h5 className="text-xl content__job-title">{jobTitle}</h5>
              <div className="flex gap-1 flex-nowrap">
                {skills &&
                  skills.map((item: any) => (
                    <Tag color="geekblue" key={Math.random()}>
                      {item.name}
                    </Tag>
                  ))}
              </div>
            </div>
          </div>
          <div className="p-8 bg-gray-100 job-item__footer">
            <div className="flex flex-wrap gap-3 footer__info">
              <div className="flex items-center gap-1 info__location flex-nowrap w-min">
                <i className="icon icon__location"></i>
                <span className="font-medium">{location}</span>
              </div>
              <div className="flex items-center gap-1 info__salary flex-nowrap">
                {/* <RocketOutlined /> */} <span className="font-medium"> Level: </span>
                <span className="font-medium">{level}</span>
              </div>
              <div className="flex items-center gap-1 info__job-type flex-nowrap">
                <i className="icon icon__bag"></i>
                <span className="font-medium">{jobType}</span>
              </div>
              <div className="flex items-center gap-1 info__salary flex-nowrap">
                <i className="icon icon__wallet"></i>
                <span className="font-medium">${salary}</span>
              </div>

              <div className="flex items-center gap-1 info__post-time flex-nowrap">
                <i className="icon icon__time"></i>
                <span className="font-medium">{timeFromNow(postTime)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  );
}
