import JobItem from "components/JobItem";
import React from "react";
import JobItemProps from "types/jobItemProps";
import { Button } from "antd";
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
];
export default function JobDetails() {
  return (
    <div className="job-details-page">
      <div className="header-wrapper px-2 bg-gray-100 relative">
        <div className="header__background absolute right-0 w-1/2"></div>
        <div className="page__header container flex flex-col items-left lg:items-center m-auto relative justify-between lg:flex-row">
          <div className="header__left flex flex-col items-left lg:items-center gap-5 pt-14 lg:py-14 lg:flex-row">
            <div className="company-logo shadow-xl w-min">
              <img
                src="https://www.vasterad.com/themes/hireo/images/company-logo-03a.png"
                alt="king"
              />
            </div>
            <div className="general-info">
              <h2 className="info__job-title text-2xl">
                Restaurant General Manager
              </h2>
              <p className="info__employer text-base font-semibold">
                About the Employer
              </p>
              <div className="info__company flex items-center gap-9 text-base">
                <div className="company__name">
                  <i className="bx bxs-buildings mr-1"></i>
                  <span>King</span>
                </div>
                <div className="company__rate flex items-center gap-1">
                  <div className="rate__scores px-2 font-bold bg-yellow-400 text-white rounded-sm">
                    4.9
                  </div>
                  <div className="rate__stars flex gap-1 text-yellow-400">
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                  </div>
                </div>
                <div className="company__loca flex items-center gap-1">
                  <div className="loca__flag">
                    <img
                      src="https://www.vasterad.com/themes/hireo/images/flags/gb.svg"
                      alt="United Kingdom"
                      width="25"
                    />
                  </div>
                  <div className="loca__text">United Kingdom</div>
                </div>
                <div className="company__status--verified text-white flex items-center bg-green-500 rounded-md">
                  <div className="status__icon bg-green-400 rounded-l-md px-1">
                    <i className="bx bx-check"></i>
                  </div>
                  <span className="px-3 text-sm">Verified</span>
                </div>
              </div>
            </div>
          </div>
          <div className="header_right pt-3 pb-14 lg:py-6 lg:px-12 lg:rounded-md lg:bg-white lg:shadow-lg">
            <span className="text-base text-gray-400">Annual Salary</span>
            <br />
            <span className="text-2xl">$35k - $38k</span>
          </div>
        </div>
      </div>
      <div className="content container m-auto mt-14 flex flex-col lg:flex-row">
        <div className="content__main w-full lg:w-2/3 pr-10">
          <div className="job-description">
            <h2 className="text-xl mt-2 mb-10">Job Description</h2>
            <div className="job-description__content text-justify text-base mb-10">
              <p>
                Leverage agile frameworks to provide a robust synopsis for high
                level overviews. Iterative approaches to corporate strategy
                foster collaborative thinking to further the overall value
                proposition. Organically grow the holistic world view of
                disruptive innovation via workplace diversity and empowerment.
              </p>
              <p>
                Bring to the table win-win survival strategies to ensure
                proactive domination. At the end of the day, going forward, a
                new normal that has evolved from generation X is on the runway
                heading towards a streamlined cloud solution. User generated
                content in real-time will have multiple touchpoints for
                offshoring.
              </p>
              <p>
                Capitalize on low hanging fruit to identify a ballpark value
                added activity to beta test. Override the digital divide with
                additional clickthroughs from DevOps. Nanotechnology immersion
                along the information highway will close the loop on focusing
                solely on the bottom line.
              </p>
            </div>
          </div>
          <div className="location  mb-10">
            <h2 className="text-xl mt-2 mb-10">Location</h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.131535965436!2d105.83325081538527!3d21.02742229319891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9926e7bd67%3A0x580e078874d5df1e!2sTemple%20Of%20Literature!5e0!3m2!1sen!2s!4v1635015151319!5m2!1sen!2s"
              height="300"
              frameBorder="0"
              title="border:0;"
              allowFullScreen={true}
              aria-hidden="false"
              tabIndex={0}
              className="w-full"
            />
          </div>
          <div className="similar-jobs mb-10">
            <h2 className="text-xl mt-2 mb-10">Similar Jobs</h2>
            {jobList.map((job, index) => (
              <div className="w-1/2 inline-block p-3">
                <JobItem {...job} key={index} />
              </div>
            ))}
          </div>
        </div>
        <div className="content__sidebar w-full lg:w-1/3 flex flex-col px-8 gap-10">
          <Button>
            Apply Now <i className="bx bx-right-arrow-alt"></i>
          </Button>
          <div className="job-summary w-full text-base mb-12">
            <h2 className="py-5 px-6 mb-0 text-xl font-normal bg-gray-300">Job Summary</h2>
            <div className="location py-5 px-6 flex items-center bg-gray-200">
              <div className="icon mr-5">
                <i className="bx bx-location-plus text-2xl" />
              </div>
              <div className="content">
                <span className="font-medium">Location</span>
                <br />
                <span>London, United Kingdom</span>
              </div>
            </div>
            <div className="job-type py-5 px-6 flex items-center bg-gray-200">
              <div className="icon mr-5">
                <i className="bx bxs-shopping-bags text-2xl"></i>
              </div>
              <div className="content">
                <span className="font-medium">Job Type</span>
                <br />
                <span>Full Time</span>
              </div>
            </div>
            <div className="salary py-5 px-6 flex items-center bg-gray-200">
              <div className="icon mr-5">
                <i className="bx bx-dollar-circle text-2xl"></i>
              </div>
              <div className="content">
                <span className="font-medium">Salary</span>
                <br />
                <span>$35k - $38k</span>
              </div>
            </div>
            <div className="date-posted py-5 px-6 flex items-center bg-gray-200">
              <div className="icon mr-5">
                <i className="bx bx-time-five text-2xl"></i>
              </div>
              <div className="content">
                <span className="font-medium">Date Posted</span>
                <br />
                <span>2 days ago</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
