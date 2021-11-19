import JobItem from "components/JobItem";
import { Select, Pagination } from "antd";
import JobItemProps from "types/jobItemProps";
import "./styles.scss";
import Sidebar from "components/Sidebar";
import { useAppDispatch } from "app/hooks";
import { handleGetJobs } from "app/slices/jobSlice";
import { useEffect } from "react";
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
  const dispatch = useAppDispatch();
  const handleGetListJob = async(filters: any) => {
    
    // const result = await dispatch(handleGetJobs())
  }
  const handleGetSideBar = async(values: any) => {
    
    // const result = await dispatch(handleGetJobs())
    console.log(values);
  }
  useEffect(() => {
    let filters = 2
    handleGetListJob(filters);
  }, [])
  return (  
    <div className="flex flex-col find-job-page sm:flex-row">
      <div className="flex-shrink-0 w-full p-8 pb-0 overflow-y-auto find-job-page__sidebar md:w-60 lg:w-72" style={{ backgroundColor: '#fff', boxShadow: `0 0 4px rgba(0, 0, 0, 0.2)` }}>
        <Sidebar handleGetSideBar={handleGetSideBar} />
      </div>
      <div className="w-full p-6 overflow-y-auto find-job-page__content">
        <div className="flex items-center justify-between px-4 py-2 mb-5 bg-gray-300 rounded-md content__header">
          <h2 className="font-normal header__title">Search Results</h2>
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
        <div className="grid flex-grow grid-cols-1 gap-5 transition-all content__list-items lg:grid-cols-2 xl:grid-cols-3">
          {jobList.map((job, index) => (
            <JobItem {...job} key={index} />
          ))}
        </div>
        <div className="flex justify-center mt-8 find-job-page__paginate">
          <Pagination defaultCurrent={1} total={100} responsive={true} />
        </div>
      </div>
    </div>
  );
}
