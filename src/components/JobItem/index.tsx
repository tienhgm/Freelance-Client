import React from "react";
import JobItemProps from "types/jobItemProps";
import defaultCompanyLogo from "assets/images/company-logo-default.png";
import "./styles.scss";

export default function JobItem({
  company,
  companyLogo,
  jobTitle,
  location,
  jobType,
  salary,
  postTime,
}: JobItemProps) {
  return (
    <div className="job-item__wrapper transition-all shadow-md hover:shadow-xl">
      <div className="job-item">
        <div className="job-item__content flex m-8">
          <div className="content__logo mr-3">
            <img
              src={companyLogo || defaultCompanyLogo}
              alt="company logo"
              width="56"
              height="56"
            />
          </div>
          <div className="content__text">
            <span className="content__company-name">{company}</span>
            <h4 className="content__job-title">{jobTitle}</h4>
          </div>
          <div className="content__bookmark"></div>
        </div>
        <div className="job-item__footer p-8 bg-gray-100">
          <div className="footer__info flex flex-wrap gap-3">
            <div className="info__location flex flex-nowrap gap-1 items-center">
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
