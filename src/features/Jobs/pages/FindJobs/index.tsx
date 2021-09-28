import DropdownInput from "components/DropdownInput";
import JobItem from "components/JobItem";
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
  { id: 1, label: "Relevance" },
  { id: 2, label: "Newest" },
  { id: 3, label: "Oldest" },
  { id: 4, label: "Random" },
];

export default function FindJobs() {
  return (
    <div className="find-job-page flex">
      <div className="find-job-page__sidebar md:w-64 flex-shrink-0"></div>
      <div className="find-job-page__content">
        <div className="content__header flex content">
          <h2 className="header__title">Search Results</h2>
          <div className="header__filter">
            <DropdownInput label={"Sort By"} listItem={[]} />
          </div>
        </div>
        <div className="grid-cols-2 content__list-items flex-grow grid gap-5 md:grid-cols-3">
          {jobList.map((job) => (
            <JobItem {...job} />
          ))}
        </div>
      </div>
    </div>
  );
}
