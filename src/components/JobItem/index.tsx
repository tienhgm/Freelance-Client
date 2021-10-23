import React, { useState } from "react";
import JobItemProps from "types/jobItemProps";
import defaultCompanyLogo from "assets/images/company-logo-default.png";
import Skeleton from "react-loading-skeleton";
import { useHistory } from 'react-router-dom';
import "./styles.scss";
import routesConfiguration from "routers/routesConfig";


export default function JobItem({
  company,
  companyLogo,
  jobTitle,
  location,
  jobType,
  salary,
  postTime,
}: JobItemProps) {
  const history = useHistory();
  const [bookmark, setBookmark] = useState(false);
  const addOrRemoveBookmark = () => {
    setBookmark(!bookmark);
  };

  const gotoDetailPage = () => {
    history.push(routesConfiguration.jobDetails.cPath+'1')
  }

  return (
    <div className="job-item__wrapper transition-all shadow-md hover:shadow-xl" onClick={gotoDetailPage}>
      <div className="job-item">
        <div className="job-item__content flex p-8">
          <div className="content__logo mr-3 w-14 h-14 relative">
            <Skeleton height={56} />
            <img
              src={companyLogo || defaultCompanyLogo}
              alt="company logo"
              width="56"
              height="56"
              className="absolute top-0 z-50"
            />
          </div>
          <div className="content__text">
            <span className="content__company-name">{company}</span>
            <h4 className="content__job-title">{jobTitle}</h4>
          </div>
          <div
            className={`content__bookmark transition-all ${bookmark ? "added" : ""}`}
            onClick={addOrRemoveBookmark}
          >
            <div className="bookmark__animation"></div>
            <i className="bx bxs-star transition-all"></i>
          </div>
        </div>
        <div className="job-item__footer p-8 bg-gray-100">
          <div className="footer__info flex flex-wrap gap-3">
            <div className="info__location flex flex-nowrap gap-1 items-center w-min">
              <i className="icon icon__location"></i>
              <span>{location}</span>
            </div>
            <div className="info__job-type flex flex-nowrap gap-1 items-center">
              <i className="icon icon__bag"></i>
              <span>{jobType}</span>
            </div>
            <div className="info__salary flex flex-nowrap gap-1 items-center">
              <i className="icon icon__wallet"></i>
              <span>{salary}</span>
            </div>
            <div className="info__post-time flex flex-nowrap gap-1 items-center">
              <i className="icon icon__time"></i>
              <span>{postTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
