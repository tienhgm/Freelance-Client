import { useEffect, useState } from 'react';
import { Button, Tag, Breadcrumb, Skeleton, Pagination, Avatar, Tooltip, Comment } from 'antd';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { handleApplyJob, handleGetDetailJob } from 'app/slices/jobSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { timeFromNow, formatDate } from 'helpers/generate';
import { UserOutlined, HomeOutlined, CommentOutlined } from '@ant-design/icons';
import './styles.scss';
import JobItem from 'components/JobItem';
import ModalFormApply from 'components/ModalForm';
import isLogin from 'helpers/isUserLogin';
import { getReviewsJob } from 'apis/userModule';
import moment from 'moment';
const API_KEY = process.env.REACT_APP_API_KEY;

export default function JobDetails() {
  const userRole = useAppSelector((state) => state.user.curUser.role);
  let isUserLogin = isLogin();
  const route = useRouteMatch<any>();
  const dispatch = useAppDispatch();
  let jobId = route.params.id;
  const [jobDetail, setJobDetail] = useState<any>({});
  // const [bookmarkTag, setBookmarkTag] = useState(false);
  const [relatedJobs, setRelatedJobs] = useState<any>([]);
  const [openModalApply, setOpenModalApply] = useState(false);
  const [loading, setLoading] = useState(true);
  const listCanApply = ['Inprogress', 'Await'];
  const [reviewList, setReviewList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIdx, setPageIdx] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // const handleChange = () => {
  //   setBookmarkTag((i) => (i = !i));
  // };
  const getDetailJob = async () => {
    try {
      const { payload } = await dispatch(handleGetDetailJob(jobId));
      if (!!payload) {
        setJobDetail(payload.jobDetail);
        setRelatedJobs(payload.relatedJobs);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  };
  const handleApplyToJob = async (values: any) => {
    const payload = {
      introduceMessage: values.introduceMessage,
      jobId: jobId,
    };
    await dispatch(handleApplyJob(payload));
  };

  const getReviewsOfFreelance = async () => {
    let filters = { page: pageIdx, records: 4 };
    try {
      setIsLoading(true);
      const payload = await getReviewsJob(jobId, 'byUserAndByCompany', filters);
      // @ts-ignore
      if (payload.data) {
        // @ts-ignore
        setReviewList(payload.data.reviews);
        // @ts-ignore
        setTotalRecords(payload.data.totalRecords);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  const history = useHistory();
  useEffect(() => {
    document.querySelector('.header > div > ul > li:nth-child(3) > a')?.classList.add('active');
    return () => {
      document.querySelector('.header > div > ul > li:nth-child(3) > a')?.classList.remove('active');
    };
  }, [history.location.pathname]);
  useEffect(() => {
    getDetailJob();
    getReviewsOfFreelance();
  }, [jobId]);
  return (
    <div className="job-details-page">
      <div className="relative mb-10 bg-gray-100 px-28 header-wrapper">
        <div className="absolute right-0 w-full header__background"></div>

        <div className="container relative flex flex-col justify-between m-auto page__header items-left lg:items-center lg:flex-row">
          <Skeleton active loading={loading} paragraph={{ rows: 4, width: 200 }} className="p-6">
            <div className="flex flex-col gap-5 header__left items-left lg:items-center pt-14 lg:py-14 lg:flex-row">
              <div className="general-info">
                <h2 className="text-3xl info__job-title">{jobDetail.title}</h2>
                {jobDetail.businessFields &&
                  jobDetail.businessFields.map((item: any) => (
                    <Tag className="text-xl font-medium" color="#2e3fe5" key={item.id}>
                      {item.name}
                    </Tag>
                  ))}
                <div className="flex items-center mt-2 text-base info__company gap-9">
                  <div className="company__name">
                    <i className="mr-1 text-xl bx bxs-buildings"></i>
                    <span>{jobDetail.company && jobDetail.company.name}</span>
                  </div>
                  <div className="flex items-center gap-1 company__rate">
                    <div className="px-2 font-bold text-white bg-yellow-400 rounded-sm rate__scores">
                      {jobDetail.company && jobDetail.company.stars.toFixed(2)}
                    </div>
                    {/* <Rate disabled defaultValue={jobDetail.company && Math.floor(jobDetail.company.stars)} /> */}
                    {jobDetail.company && jobDetail.company.stars && (
                      <div className="flex gap-1 text-yellow-400 rate__stars">
                        {Array(Math.floor(jobDetail.company.stars))
                          .fill(0)
                          .map((item: any) => (
                            <i className="text-2xl bx bxs-star" key={Math.random()}></i>
                          ))}
                      </div>
                    )}
                  </div>
                  {jobDetail.company && jobDetail.company.isVerified && (
                    <div className="flex items-center text-white bg-green-500 rounded-md company__status--verified">
                      <div className="px-1 bg-green-400 status__icon rounded-l-md">
                        <i className="bx bx-check"></i>
                      </div>
                      <span className="px-3 text-sm">Verified</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 info__post-time flex-nowrap">
                  <i className="text-xl bx bx-time-five"></i>
                  <span className="font-medium">{timeFromNow(jobDetail.createdAt)}</span>
                </div>
              </div>
            </div>
          </Skeleton>
          <Skeleton active loading={loading} paragraph={{ rows: 4 }} className="p-6">
            <div className="pt-3 mr-3 header_right pb-14 lg:py-6 lg:px-12 lg:rounded-md lg:bg-white lg:shadow-lg">
              <span className="text-base text-gray-400">Annual Salary</span>
              <br />
              <span className="flex justify-center text-2xl">${jobDetail.salary}</span>
            </div>
          </Skeleton>
        </div>
      </div>
      <div className="container flex flex-col m-auto px-28 content mt-14 lg:flex-row">
        <div className="w-full pl-6 lg:pr-10 content__main lg:w-2/3">
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
                  <Link to="/find-jobs">Find Jobs</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{jobDetail.title}</Breadcrumb.Item>
              </Breadcrumb>
            )}
          </div>
          <div className="job-description">
            <h2 className="mt-2 mb-8 text-xl">Job Description</h2>
            {loading ? (
              <Skeleton active paragraph={{ rows: 14, width: '100%' }} />
            ) : (
              <div
                className="mb-10 text-base text-justify job-description__content"
                dangerouslySetInnerHTML={{ __html: jobDetail.description }}
              ></div>
            )}
          </div>
          <div className="mb-8 location">
            <h2 className="mt-2 mb-10 text-xl">Location</h2>
            <Skeleton active loading={loading} paragraph={{ rows: 7, width: '100%' }}>
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${jobDetail.area && jobDetail.area.name
                  }`}
                height="300"
                frameBorder="0"
                title="border:0;"
                allowFullScreen={true}
                aria-hidden="false"
                tabIndex={0}
                className="w-full"
              />
            </Skeleton>
          </div>
          <div className="mb-10 similar-jobs">
            <h2 className="flex flex-wrap mt-2 mb-10 text-xl">Similar Jobs</h2>
            {relatedJobs.map((job: any) => (
              <div className="inline-block w-full py-2" key={job.id}>
                <Skeleton active loading={loading}>
                  <JobItem
                    key={job.id}
                    id={job.id}
                    skills={job.skills}
                    company={job.company && job.company.name}
                    companyLogo={job.company && `http://${job.company.logo}`}
                    jobTitle={job.title}
                    location={job.area && job.area.name}
                    jobType={job.workMode}
                    salary={job.salary}
                    postTime={job.createdAt}
                    startDate={job.startDate}
                    endDate={job.endDate}
                    level={job.experience}
                    loading={loading}
                  />
                </Skeleton>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full gap-8 px-8 content__sidebar lg:w-1/3">
          {userRole === 1 || !isUserLogin ? (
            <></>
          ) : (
            <>
              {listCanApply.includes(jobDetail.status) && (
                <Skeleton active loading={loading} paragraph={{ rows: 1 }}>
                  <Button onClick={() => setOpenModalApply(true)}>
                    Apply Now <i className="ml-2 bx bx-right-arrow-alt"></i>
                  </Button>
                </Skeleton>
              )}
            </>
          )}
          <ModalFormApply
            title={'Apply job'}
            okText={'Apply'}
            isVisible={openModalApply}
            handleConfirm={handleApplyToJob}
            handleCancelConfirm={() => setOpenModalApply(false)}
            fieldName={'introduceMessage'}
            labelField={'Introduce message'}
            ruleMessage={'Please input introduce message'}
          />
          <div className="w-full text-base job-summary">
            <h2 className="px-6 py-3 mb-0 text-xl font-medium bg-gray-200">Job Summary</h2>
            <Skeleton active loading={loading} paragraph={{ rows: 8, width: '100%' }}>
              <div className="flex items-center px-6 py-3 salary" style={{ background: '#f3f3f3' }}>
                <div className="mr-5 icon">
                  <i className="text-2xl bx bx-dollar-circle" style={{ color: '#2e3fe5' }}></i>
                </div>
                <div className="content">
                  <span className="font-normal">Salary</span>
                  <br />
                  <span className="font-medium">${jobDetail.salary}</span>
                </div>
              </div>
              <div className="flex items-center px-6 py-3 job-type" style={{ background: '#f3f3f3' }}>
                <div className="mr-5 icon">
                  <i className="text-2xl bx bxs-shopping-bags" style={{ color: '#2e3fe5' }}></i>
                </div>
                <div className="content">
                  <span className="font-normal">Work Mode</span>
                  <br />
                  <span className="font-medium">{jobDetail.workMode}</span>
                </div>
              </div>

              <div className="flex items-center px-6 py-3 job-type" style={{ background: '#f3f3f3' }}>
                <div className="mr-5 icon">
                  <UserOutlined className="text-2xl" style={{ color: '#2e3fe5' }} />
                  {/* <i className="text-2xl bx bxs-shopping-bags" style={{ color: '#2e3fe5' }}></i> */}
                </div>
                <div className="content">
                  <span className="font-normal">Level</span>
                  <br />
                  <span className="font-medium">{jobDetail.experience}</span>
                </div>
              </div>

              <div className="flex items-center px-6 py-3 date-posted" style={{ background: '#f3f3f3' }}>
                <div className="mr-5 icon">
                  <i className="text-2xl bx bx-time-five" style={{ color: '#2e3fe5' }}></i>
                </div>
                <div className="content">
                  <span className="font-normal">Available Time</span>
                  <br />
                  <span className="font-medium">
                    {formatDate(jobDetail.startDate)} -{'>'} {formatDate(jobDetail.endDate)}
                  </span>
                </div>
              </div>
            </Skeleton>
          </div>
          <div className="mt-4 skills">
            <div className="text-xl font-medium">Skills require</div>
            <div className="block mt-2 skills-tags">
              <Skeleton active loading={loading} paragraph={{ rows: 1, width: '100%' }}>
                {jobDetail.businessFields &&
                  jobDetail.skills.map((item: any) => <span key={item.id}>{item.name}</span>)}
              </Skeleton>
            </div>
          </div>
          <div className="mb-12 comment">
            <div className="mb-3 headline">
              <h3 className="m-0 text-lg">
                <CommentOutlined className="like relative -top-1.5 mr-2" /> Comment
              </h3>
            </div>
            {reviewList &&
              reviewList.map((item: any) => (
                <Skeleton active loading={isLoading} key={item.id}>
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
            {isLoading ? (
              <Skeleton.Button active={true} size="small" style={{ width: 'calc(200px)', marginTop: '20px' }} />
            ) : (
              <Pagination
                onChange={setPageIdx}
                className="mt-3"
                size="small"
                defaultCurrent={pageIdx}
                pageSize={4}
                total={totalRecords}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
