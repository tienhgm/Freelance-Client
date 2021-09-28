import JobItem from "components/JobItem";
import { Select } from "antd";
import React from "react";
import JobItemProps from "types/jobItemProps";
import "./styles.scss";
const jobList: Array<JobItemProps> = [
  {
    company: "Hexagon",
    companyLogo:
      "https://www.vasterad.com/themes/hireo/images/company-logo-01.png",
    jobTitle: "Bilingual Event Support Specialist",
    location: "San Francisco",
    jobType: "Full Time",
    salary: "$35.000 - $38.000",
    postTime: "2 days ago",
  },
  {
    company: "Hexagon",
    companyLogo:
      "https://www.vasterad.com/themes/hireo/images/company-logo-01.png",
    jobTitle: "Bilingual Event Support Specialist",
    location: "San Francisco",
    jobType: "Full Time",
    salary: "$35.000 - $38.000",
    postTime: "2 days ago",
  },
  {
    company: "Hexagon",
    companyLogo:
      "https://www.vasterad.com/themes/hireo/images/company-logo-01.png",
    jobTitle: "Bilingual Event Support Specialist",
    location: "San Francisco",
    jobType: "Full Time",
    salary: "$35.000 - $38.000",
    postTime: "2 days ago",
  },
  {
    company: "Hexagon",
    companyLogo:
      "https://www.vasterad.com/themes/hireo/images/company-logo-01.png",
    jobTitle: "Bilingual Event Support Specialist",
    location: "San Francisco",
    jobType: "Full Time",
    salary: "$35.000 - $38.000",
    postTime: "2 days ago",
  },
  {
    company: "Hexagon",
    companyLogo:
      "https://www.vasterad.com/themes/hireo/images/company-logo-01.png",
    jobTitle: "Bilingual Event Support Specialist",
    location: "San Francisco",
    jobType: "Full Time",
    salary: "$35.000 - $38.000",
    postTime: "2 days ago",
  },
  {
    company: "Hexagon",
    companyLogo:
      "https://www.vasterad.com/themes/hireo/images/company-logo-01.png",
    jobTitle: "Bilingual Event Support Specialist",
    location: "San Francisco",
    jobType: "Full Time",
    salary: "$35.000 - $38.000",
    postTime: "2 days ago",
  },
  {
    company: "Hexagon",
    companyLogo:
      "https://www.vasterad.com/themes/hireo/images/company-logo-01.png",
    jobTitle: "Bilingual Event Support Specialist",
    location: "San Francisco",
    jobType: "Full Time",
    salary: "$35.000 - $38.000",
    postTime: "2 days ago",
  },
  {
    company: "Hexagon",
    companyLogo:
      "https://www.vasterad.com/themes/hireo/images/company-logo-01.png",
    jobTitle: "Bilingual Event Support Specialist",
    location: "San Francisco",
    jobType: "Full Time",
    salary: "$35.000 - $38.000",
    postTime: "2 days ago",
  },
  {
    company: "Hexagon",
    jobTitle: "Bilingual Event Support Specialist",
    location: "San Francisco",
    jobType: "Full Time",
    salary: "$35.000 - $38.000",
    postTime: "2 days ago",
  },
];

const sortByItems = [
  { value: 1, label: "Relevance" },
  { value: 2, label: "Newest" },
  { value: 3, label: "Oldest" },
  { value: 4, label: "Random" },
];

const { Option } = Select;

export default function FindJobs() {
  return (
    <div className="find-job-page flex flex-col sm:flex-row">
      <div className="find-job-page__sidebar w-52 md:w-60 lg:w-72 flex-shrink-0"></div>
      <div className="find-job-page__content w-full p-6">
        <div className="content__header flex items-center justify-between px-4 py-2 bg-gray-300 rounded-md mb-5">
          <h2 className="header__title font-normal">Search Results</h2>
          <div className="header__filter">
            <span>Sort by:</span>
            <Select
              labelInValue
              defaultValue={sortByItems[0]}
              style={{ width: 120 }}
              className="select-footer"
            >
              {sortByItems.map((item) => (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div className="transition-all grid-cols-1 content__list-items flex-grow grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobList.map((job) => (
            <JobItem {...job} />
          ))}
        </div>
      </div>
    </div>
  );
}
