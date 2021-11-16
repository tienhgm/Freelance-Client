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
      <div className="relative px-2 bg-gray-100 header-wrapper mb-10">
        <div className="absolute right-0 w-1/2 header__background"></div>
        <div className="container relative flex flex-col justify-between m-auto page__header items-left lg:items-center lg:flex-row">
          <div className="flex flex-col gap-5 header__left items-left lg:items-center pt-14 lg:py-14 lg:flex-row">
            <div className="shadow-xl company-logo w-min">
              <img
                src="https://www.vasterad.com/themes/hireo/images/company-logo-03a.png"
                alt="king"
              />
            </div>
            <div className="general-info">
              <h2 className="text-2xl info__job-title">
                Restaurant General Manager
              </h2>
              <p className="text-base font-semibold info__employer">
                About the Employer
              </p>
              <div className="flex items-center text-base info__company gap-9">
                <div className="company__name">
                  <i className="mr-1 bx bxs-buildings"></i>
                  <span>King</span>
                </div>
                <div className="flex items-center gap-1 company__rate">
                  <div className="px-2 font-bold text-white bg-yellow-400 rounded-sm rate__scores">
                    4.9
                  </div>
                  <div className="flex gap-1 text-yellow-400 rate__stars">
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                  </div>
                </div>
                <div className="flex items-center gap-1 company__loca">
                  <div className="loca__flag">
                    <img
                      src="https://www.vasterad.com/themes/hireo/images/flags/gb.svg"
                      alt="United Kingdom"
                      width="25"
                    />
                  </div>
                  <div className="loca__text">United Kingdom</div>
                </div>
                <div className="flex items-center text-white bg-green-500 rounded-md company__status--verified">
                  <div className="px-1 bg-green-400 status__icon rounded-l-md">
                    <i className="bx bx-check"></i>
                  </div>
                  <span className="px-3 text-sm">Verified</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-3 header_right pb-14 lg:py-6 lg:px-12 lg:rounded-md lg:bg-white lg:shadow-lg">
            <span className="text-base text-gray-400">Annual Salary</span>
            <br />
            <span className="text-2xl">$35k - $38k</span>
          </div>
        </div>
      </div>
      <div className="container flex flex-col m-auto content mt-14 lg:flex-row">
        <div className="w-full lg:pr-10 content__main lg:w-2/3">
          <div className="job-description">
            <h2 className="mt-2 mb-10 text-xl">Job Description</h2>
            <div className="mb-10 text-base text-justify job-description__content">
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
          <div className="mb-10 location">
            <h2 className="mt-2 mb-10 text-xl">Location</h2>
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
          <div className="mb-10 similar-jobs">
            <h2 className="mt-2 mb-10 text-xl flex flex-wrap">Similar Jobs</h2>
            {jobList.map((job, index) => (
              <div className="inline-block w-full p-3 md:w-1/2">
                <JobItem {...job} key={index} />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full gap-10 px-8 content__sidebar lg:w-1/3">
          <Button>
            Apply Now <i className="ml-2 bx bx-right-arrow-alt"></i>
          </Button>
          <div className="w-full mb-12 text-base job-summary">
            <h2 className="px-6 py-3 mb-0 text-xl font-normal bg-gray-300">Job Summary</h2>
            <div className="flex items-center px-6 py-3 bg-gray-200 location">
              <div className="mr-5 icon">
                <i className="text-2xl bx bx-location-plus" />
              </div>
              <div className="content">
                <span className="font-medium">Location</span>
                <br />
                <span>London, United Kingdom</span>
              </div>
            </div>
            <div className="flex items-center px-6 py-3 bg-gray-200 job-type">
              <div className="mr-5 icon">
                <i className="text-2xl bx bxs-shopping-bags"></i>
              </div>
              <div className="content">
                <span className="font-medium">Job Type</span>
                <br />
                <span>Full Time</span>
              </div>
            </div>
            <div className="flex items-center px-6 py-3 bg-gray-200 salary">
              <div className="mr-5 icon">
                <i className="text-2xl bx bx-dollar-circle"></i>
              </div>
              <div className="content">
                <span className="font-medium">Salary</span>
                <br />
                <span>$35k - $38k</span>
              </div>
            </div>
            <div className="flex items-center px-6 py-3 bg-gray-200 date-posted">
              <div className="mr-5 icon">
                <i className="text-2xl bx bx-time-five"></i>
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
