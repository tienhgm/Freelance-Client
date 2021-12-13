import { useAppDispatch } from 'app/hooks';
import { handleGetDetailCompany, handleGetListJobManage } from 'app/slices/companySlice';
import JobItem from 'components/JobItem';
import { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router';
import { Avatar, Breadcrumb, Pagination, Rate, Skeleton, Tooltip, Comment } from 'antd';
import './index.scss';
import { CommentOutlined, FileProtectOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { handleGetReviewsOfCompany } from 'app/slices/userSlice';
const API_KEY = process.env.REACT_APP_API_KEY;

export default function CompanyDetails() {
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState<any>('');
  const [isVerified, setIsVerified] = useState(false);
  const [country, setCountry] = useState<any>('');
  const [rate, setRate] = useState<any>();
  const [info, setInfo] = useState<any>();
  const [logo, setLogo] = useState();
  const [listJob, setListJob] = useState<any>([]);
  const [totalReviewFromUserToCompany, setTotalReviewFromUserToCompany] = useState(0);
  const [isLoadingFromUserToCompany, setIsLoadingFromUserToCompany] = useState(false);
  const [pageIdxFromUserToCompany, setPageIdxFromUserToCompany] = useState(1);
  const [reviewFromUserToCompany, setReviewFromUserToCompany] = useState([]);
  const route = useRouteMatch<any>();
  const dispatch = useAppDispatch();
  let companyId = route.params.id;
  const getDetail = async () => {
    try {
      const { payload } = await dispatch(handleGetDetailCompany(companyId));
      if (payload) {
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
      }, 400);
    }
  };
  const getReviewsFromUserToCompany = async () => {
    let filters = { page: pageIdxFromUserToCompany, records: 4 };
    const data = {
      companyId: companyId,
      type: 'fromUser',
      filters,
    };
    try {
      setIsLoadingFromUserToCompany(true);
      const { payload } = await dispatch(handleGetReviewsOfCompany(data));
      if (payload) {
        setReviewFromUserToCompany(payload.reviews);
        setTotalReviewFromUserToCompany(payload.totalRecords);
      }
    } catch (error) {
    } finally {
      setIsLoadingFromUserToCompany(false);
    }
  };
  const changePageIdxFromUserToCompany = (idx: any) => {
    setPageIdxFromUserToCompany(idx);
  };
  const handleGetJobManage = async (id: any, statusJob?: any, page?: number) => {
    let filters: any = {
      status: statusJob,
      page,
      records: 4,
    };
    const data = [id, filters];
    try {
      setLoading(true);
      const { payload }: any = await dispatch(handleGetListJobManage(data));
      if (payload.statusCode === 200) {
        setListJob(payload.data.jobs);
      }
    } catch (error) {
    } finally {
      setLoading(false);
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
    handleGetJobManage(companyId, 'Inprogress', 1);
  }, [companyId]);
  useEffect(() => {
    getReviewsFromUserToCompany();
  }, [pageIdxFromUserToCompany]);
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
            {listJob.length > 0 &&
              listJob.map((item: any) => (
                <div className="inline-block w-full p-3" key={item.id}>
                  <Skeleton active loading={loading}>
                    <JobItem
                      key={item.id}
                      company={companyName}
                      jobTitle={item.title}
                      location={item.area?.name}
                      jobType={item.businessFields[0]?.name}
                      salary={item.salary}
                      postTime={item.createdAt}
                      loading={loading}
                      startDate={item.startDate}
                      endDate={item.endDate}
                      id={item.id}
                      skills={item.skills}
                      level={item.experience}
                      companyLogo={`http://${logo}`}
                    />
                  </Skeleton>
                </div>
              ))}
          </div>
          {/* <div className="mb-10 location">
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
          </div> */}
          <div className="mb-12 comment">
            <div className="mb-3 headline">
              <h3 className="m-0 text-lg">
                <CommentOutlined className="like relative -top-1.5 mr-2" /> Comment
              </h3>
            </div>
            {reviewFromUserToCompany &&
              reviewFromUserToCompany.map((item: any) => (
                <Skeleton active loading={isLoadingFromUserToCompany} key={item.id}>
                  <Comment
                    author={
                      <span className="text-sm font-semibold">
                        {item.reviewer?.firstName + ' ' + item.reviewer?.lastName}
                      </span>
                    }
                    avatar={<Avatar src={`http://${item.reviewer?.avatar}`} alt="alt" />}
                    content={<p>{item.comment}</p>}
                    datetime={
                      <Tooltip title={moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment(item.createdAt).fromNow()}</span>
                      </Tooltip>
                    }
                  />
                </Skeleton>
              ))}
            {isLoadingFromUserToCompany ? (
              <Skeleton.Button active={true} size="small" style={{ width: 'calc(200px)', marginTop: '20px' }} />
            ) : (
              <Pagination
                onChange={changePageIdxFromUserToCompany}
                className="mt-3"
                size="small"
                defaultCurrent={pageIdxFromUserToCompany}
                pageSize={4}
                total={totalReviewFromUserToCompany}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col w-full gap-10 px-8 content__sidebar lg:w-1/3">
          <div className="w-full mb-12 text-base job-review">
            <h2 className="mt-2 mb-10 text-xl">Location</h2>
            <Skeleton active loading={loading} paragraph={{ rows: 5 }}>
              {info?.addresses[0] && (
                <iframe
                  // src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${info?.addresses.reduce((prev: string, cur: string) => prev + ' ' + cur)}`}
                  src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${info?.addresses[0]}`}
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
