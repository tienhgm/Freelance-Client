import React from 'react';
import { useAppDispatch } from 'app/hooks';
import { handleGetDetailCompany } from 'app/slices/companySlice';
import JobItem from 'components/JobItem';
import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Breadcrumb, Rate, Skeleton } from 'antd';
import './index.scss';
import ReviewItem from './ReviewItem';
import { FileProtectOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const jobList: Array<any> = [
  {
    company: 'Hexagon',
    companyLogo: 'https://www.vasterad.com/themes/hireo/images/company-logo-01.png',
    jobTitle: 'Bilingual Event Support Specialist',
    location: 'San Francisco',
    jobType: 'Full Time',
    salary: '$35.000 - $38.000',
    postTime: '2 days ago',
  },
  {
    company: 'Hexagon',
    companyLogo: 'https://www.vasterad.com/themes/hireo/images/company-logo-01.png',
    jobTitle: 'Bilingual Event Support Specialist',
    location: 'San Francisco',
    jobType: 'Full Time',
    salary: '$35.000 - $38.000',
    postTime: '2 days ago',
  },
  {
    company: 'Hexagon',
    companyLogo: 'https://www.vasterad.com/themes/hireo/images/company-logo-01.png',
    jobTitle: 'Bilingual Event Support Specialist',
    location: 'San Francisco',
    jobType: 'Full Time',
    salary: '$35.000 - $38.000',
    postTime: '2 days ago',
  },
];
export default function CompanyDetails() {
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState<any>('');
  const [isVerified, setIsVerified] = useState(false);
  const [country, setCountry] = useState<any>('');
  const [rate, setRate] = useState<any>();
  const [info, setInfo] = useState<any>();
  const [logo, setLogo] = useState();
  const route = useRouteMatch();
  const dispatch = useAppDispatch();
  // @ts-ignore
  let companyId = route.params.id;
  const getDetail = async () => {
    try {
      const { payload } = await dispatch(handleGetDetailCompany(companyId));
      if (!!payload) {
        setCompanyName(payload.name);
        setIsVerified(payload.isVerified);
        setCountry(payload.country);
        setRate(payload.stars);
        setInfo(payload.information);
        setLogo(payload.logo);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  const history = useHistory();
  useEffect(() => {
    document.querySelector('.header > div > ul > li:nth-child(2) > a')?.classList.add('active');
    return () => {
      document.querySelector('.header > div > ul > li:nth-child(2) > a')?.classList.remove('active');
    };
  }, [history.location.pathname]);
  useEffect(() => {
    getDetail();
  }, [companyId]);
  return (
    <div className="job-details-page company">
      <div className="relative px-2 mb-10 bg-gray-100 header-wrapper">
        <div className="absolute right-0 w-1/2 header__background"></div>
        <Skeleton loading={loading} active paragraph={{ rows: 4, width: '100' }} className="p-6">
          <div className="container relative flex flex-col justify-between m-auto page__header items-left lg:items-center lg:flex-row">
            <div className="flex flex-col gap-5 header__left items-left lg:items-center pt-14 lg:py-14 lg:flex-row">
              <div className="shadow-xl company-logo w-min">
                <img src={`http://${logo}`} alt={companyName} />
              </div>
              <div className="general-info">
                <h2 className="text-2xl info__job-title">{companyName}</h2>
                <div className="flex gap-4 font-medium">
                  {info && (
                    <div className="flex items-center mr-5">
                      <PhoneOutlined className="mr-2" /> Phone number: {info.phoneNumber}
                    </div>
                  )}
                  {info && (
                    <div className="flex items-center">
                      <FileProtectOutlined className="mr-2" /> Tax number: {info.paxNumber}
                    </div>
                  )}
                </div>
                <div className="flex items-center mt-2 text-base info__company gap-9">
                  {rate && (
                    <div className="flex items-center gap-1 company__rate">
                      <div className="px-2 font-bold text-white bg-yellow-400 rounded-sm rate__scores">{rate}</div>
                      <Rate disabled allowHalf defaultValue={rate} />
                    </div>
                  )}
                  <div className="flex items-center gap-1 company__loca">
                    <div className="loca__flag">
                      <div>{country && country.emoji}</div>
                    </div>
                    <div className="loca__text">{country && country.name}</div>
                  </div>
                  {isVerified && (
                    <div className="flex items-center text-white bg-green-500 rounded-md company__status--verified">
                      <div className="px-1 bg-green-400 status__icon rounded-l-md">
                        <i className="bx bx-check"></i>
                      </div>
                      <span className="px-3 text-sm">Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>
      <div className="container flex flex-col m-auto content mt-14 lg:flex-row">
        <div className="w-full px-4 lg:pr-10 content__main lg:w-2/3">
          <div className="mb-6 font-semibold">
            {loading ? (
              <Skeleton.Button active={true} size="small" style={{ width: 'calc(340px)' }} />
            ) : (
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">
                    <HomeOutlined className="relative -top-1" /> Home
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link to="/browse-companies">Browse companies</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{companyName}</Breadcrumb.Item>
              </Breadcrumb>
            )}
          </div>
          <div className="job-description" style={{ minHeight: '400px' }}>
            <h2 className="mt-2 mb-10 text-xl">About Company</h2>
            {loading ? (
              <Skeleton active paragraph={{ rows: 14, width: '100%' }} />
            ) : (
              <>
                {info && (
                  <div className="mb-10 text-base text-justify job-description__content">
                    <div dangerouslySetInnerHTML={{ __html: info.description }}></div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="mb-10 similar-jobs">
            <h2 className="flex flex-wrap mt-2 mb-10 text-xl">Open Positions</h2>
            {jobList.map((job, index) => (
              <div className="inline-block w-full p-3" key={index}>
                <Skeleton active loading={loading} >
                  <JobItem {...job} key={index} />
                </Skeleton>
              </div>
            ))}
          </div>
          <div className="mb-10 location">
            <h2 className="px-6 py-3 mb-0 text-xl font-normal bg-gray-300">
              <i className="mr-3 bx bx-like"></i>Reviews
            </h2>
            <div className="overflow-y-auto reviews-list">
              <Skeleton active loading={loading}>
                <ReviewItem
                  ratingPoint={4.5}
                  title={'Doing things the right way'}
                  content={
                    'Great company and especially ideal for the career-minded individual. The company is large enough to offer a variety of jobs in all kinds of interesting locations. Even if you never change roles, your job changes and evolves as the company grows, keeping things fresh.'
                  }
                  reviewTime={'August 2019'}
                  index={0}
                />
                <ReviewItem
                  ratingPoint={4.5}
                  title={'Doing things the right way'}
                  content={
                    'Great company and especially ideal for the career-minded individual. The company is large enough to offer a variety of jobs in all kinds of interesting locations. Even if you never change roles, your job changes and evolves as the company grows, keeping things fresh.'
                  }
                  reviewTime={'August 2019'}
                  index={1}
                />
              </Skeleton>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-10 px-8 content__sidebar lg:w-1/3">
          <div className="w-full mb-12 text-base job-review">
            <h2 className="mt-2 mb-10 text-xl">Location</h2>
            <Skeleton active loading={loading} paragraph={{ rows: 5 }}>
              {info?.addresses[0] && (
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDAHhcUacKG8mW34H9OPSh54v6ICnTZZMM&q=${info?.addresses[0]}`}
                  height="300"
                  frameBorder="0"
                  title="border:0;"
                  allowFullScreen={true}
                  aria-hidden="false"
                  tabIndex={0}
                  className="w-full"
                />
              )}
            </Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
