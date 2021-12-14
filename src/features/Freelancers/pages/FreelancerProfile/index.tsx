import {
  LikeOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  MailOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import {
  Col,
  Pagination,
  Progress,
  Row,
  Breadcrumb,
  Tabs,
  Skeleton,
  Timeline,
  Avatar,
  Comment,
  Tooltip,
  Badge,
} from 'antd';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { handleGetDetailFreelancer } from 'app/slices/userSlice';
import { formatDateMonth, getGender, subContent } from 'helpers/generate';

import './styles.scss';
import isLogin from 'helpers/isUserLogin';
import { setPartner } from 'app/slices/appSlice';
import { createNewRoom } from 'firebaseServices/firestore';
import { getReviewsByFreelance } from 'apis/userModule';
import moment from 'moment';
import RadioChartFreelancer from './components/RadioChartFreelancer';
const { TabPane } = Tabs;

function FreelancerProfile() {
  const curUser = useAppSelector((state) => state.user.curUser);
  let isUserLogin = isLogin();
  const route = useRouteMatch<any>();
  const dispatch = useAppDispatch();
  const freelancerId = route.params.id;
  const [freelancerDetail, setFreelancerDetail] = useState<any>({});
  const [analysisJob, setAnalysisJob] = useState<any>([]);
  const [reviews, setReviews] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [reviewList, setReviewList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageIdx, setPageIdx] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const getDetailFreelancer = async (id: string) => {
    try {
      const { payload } = await dispatch(handleGetDetailFreelancer(id));
      if (!!payload) {
        const { cv, reviews, jobsAnalysis } = payload;
        setFreelancerDetail(cv);
        setReviews(reviews);
        setAnalysisJob(jobsAnalysis);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  };

  const gotoChat = () => {
    createNewRoom(
      {
        id: curUser.id,
        name: curUser.firstName + ' ' + curUser.lastName,
        avatar: curUser.avatar,
      },
      {
        id: freelancerId,
        name: freelancerDetail.firstName + ' ' + freelancerDetail.lastName,
        avatar: freelancerDetail.avatar,
      }
    ).then(() => {
      dispatch(
        setPartner({
          id: freelancerId,
          name: freelancerDetail.firstName + ' ' + freelancerDetail.lastName,
          avatar: freelancerDetail.avatar,
        })
      );

      history.push('/dashboard/message');
    });
  };

  const getReviewsOfFreelance = async () => {
    let filters = { page: pageIdx, records: 4 };
    try {
      setIsLoading(true);
      const payload = await getReviewsByFreelance(freelancerId, 'fromCompany', filters);
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
  };
  const history = useHistory();
  const goToDetailCompany = (id: any) => {
    window.open(`/browse-companies/${id}`, '_blank');
  };
  useEffect(() => {
    getReviewsOfFreelance();
  }, [freelancerId, pageIdx]);

  useEffect(() => {
    getDetailFreelancer(freelancerId);
  }, [freelancerId]);
  useEffect(() => {
    document.querySelector('.header > div > ul > li:nth-child(4) > a')?.classList.add('active');
    return () => {
      document.querySelector('.header > div > ul > li:nth-child(4) > a')?.classList.remove('active');
    };
  }, [history.location.pathname]);
  return (
    <div className="freelancer-profile">
      <div className="relative px-2 bg-gray-100 header-wrapper">
        <div className="absolute right-0 w-1/2 header__background"></div>
        <Skeleton active loading={loading} paragraph={{ rows: 3, width: '50%' }} className="p-10 px-16">
          <div className="container relative flex flex-col justify-between px-12 mx-auto page__header lg:items-center lg:flex-row">
            <div className="container flex flex-col gap-5 mx-auto header__left lg:items-center pt-14 lg:py-14 lg:flex-row">
              <div className="shadow-xl freelancer-logo w-min">
                <img src={`http://${freelancerDetail.avatar}`} alt="avatar" />
              </div>
              <div className="freelancer-info">
                <h2 className="text-2xl info__name">{freelancerDetail.lastName + ' ' + freelancerDetail.firstName}</h2>
                <p className="text-lg info__job">{freelancerDetail.briefIntroduce}</p>
                <div className="flex items-center gap-6 text-base info__user">
                  <div className="flex items-center gap-2 user__loca">
                    <EnvironmentOutlined />
                    {freelancerDetail.area && freelancerDetail.area.name && (
                      <div className="font-medium loca__text">
                        {freelancerDetail.address + `${freelancerDetail.address && ', '}` + freelancerDetail.area.name}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {freelancerDetail.country && (
                      <>
                        <div>{freelancerDetail?.country?.emoji}</div>
                        <div>{freelancerDetail?.country?.name}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Skeleton>
      </div>

      <div className="container mt-4 ml-40 font-semibold">
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
              <Link to="/find-freelancers">Find Freelancers</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{freelancerDetail.lastName + ' ' + freelancerDetail.firstName}</Breadcrumb.Item>
          </Breadcrumb>
        )}
      </div>
      <div className="flex-1 w-full mt-10 content">
        <Row justify="center" gutter={{ md: 16, lg: 24 }}>
          <Col className="content__left" md={24} lg={12} xl={12}>
            <Skeleton className="mb-4" active loading={loading} paragraph={{ rows: 18, width: '100%' }}>
              <div className="mb-10 card-container">
                <Tabs type="card" size="large">
                  <TabPane tab={<span>Overview</span>} key="1">
                    <div className="p-4 border-2 border-gray-200">
                      <h3 className="mb-3 text-xl">About Me</h3>
                      <div className="flex mb-3">
                        <div
                          style={{ width: 'calc(5%)', height: '4px', backgroundColor: '#2e3fe5', marginRight: '1.5px' }}
                        ></div>
                        <div
                          style={{ paddingBottom: '2px', height: '4px', width: 'calc(2%)', backgroundColor: '#2e3fe5' }}
                        ></div>
                      </div>
                      <div
                        className="text-base leading-7"
                        dangerouslySetInnerHTML={{ __html: freelancerDetail.introduce }}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab="Work experiences" key="2">
                    <div className="p-4 border-2 border-gray-200">
                      <h3 className="mb-3 text-xl">Work experiences</h3>
                      <div className="flex mb-3">
                        <div
                          style={{ width: 'calc(5%)', height: '4px', backgroundColor: '#2e3fe5', marginRight: '1.5px' }}
                        ></div>
                        <div
                          style={{ paddingBottom: '2px', height: '4px', width: 'calc(2%)', backgroundColor: '#2e3fe5' }}
                        ></div>
                      </div>
                      <Timeline>
                        {freelancerDetail.experiences &&
                          freelancerDetail.experiences.map((item: any) => (
                            <Timeline.Item key={item.id}>
                              <div key={item.id} className="flex flex-col gap-2 mt-4">
                                <div className="flex flex-col">
                                  <div className="text-lg font-medium">{item.role}</div>
                                  <div className="flex items-center gap-4">
                                    <div className="font-normal">{item.companyName} </div>
                                    <div className="flex items-center gap-2">
                                      <MailOutlined className="mt-1" />{' '}
                                      <div className="font-normal">{item.companyEmail}</div>
                                    </div>
                                  </div>
                                  <div style={{ color: '#2e3fe5' }}>
                                    {formatDateMonth(item.startDate)} - {formatDateMonth(item.endDate)}
                                  </div>
                                  <div className="mt-1 font-medium">{item.description}</div>
                                  {/* </div> */}
                                </div>
                              </div>
                            </Timeline.Item>
                          ))}
                      </Timeline>
                    </div>
                  </TabPane>
                  <TabPane tab="Educations" key="3">
                    <div className="p-4 border-2 border-gray-200">
                      <h3 className="mb-3 text-xl">Educations</h3>
                      <div className="flex mb-3">
                        <div
                          style={{ width: 'calc(5%)', height: '4px', backgroundColor: '#2e3fe5', marginRight: '1.5px' }}
                        ></div>
                        <div
                          style={{ paddingBottom: '2px', height: '4px', width: 'calc(2%)', backgroundColor: '#2e3fe5' }}
                        ></div>
                      </div>
                      {freelancerDetail.educations && (
                        <div
                          className="text-base leading-7"
                          dangerouslySetInnerHTML={{ __html: freelancerDetail.educations }}
                        ></div>
                      )}
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </Skeleton>
            <div className="mb-12 comment">
              <div className="mb-3 headline">
                <h3 className="m-0 text-lg">
                  <CommentOutlined className="like relative -top-1.5 mr-2" /> History feedback
                </h3>
              </div>
              {reviewList.length > 0 &&
                reviewList.map((item: any) => (
                  <Skeleton active loading={isLoading} key={item.id}>
                    <Comment
                      author={<span className="text-sm font-semibold">{item.company?.name}</span>}
                      avatar={
                        <div onClick={() => goToDetailCompany(item.company.id)}>
                          <Avatar src={`http://${item.company?.logo}`} alt="alt" />
                        </div>
                      }
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
                <>
                  {reviewList.length > 0 && (
                    <Pagination
                      onChange={setPageIdx}
                      className="mt-3"
                      size="small"
                      defaultCurrent={pageIdx}
                      pageSize={4}
                      total={totalRecords}
                    />
                  )}
                </>
              )}
            </div>
          </Col>
          <Col className="content__right" md={24} lg={12} xl={6}>
            {/* Overview */}
            <Skeleton active loading={loading} paragraph={{ rows: 4, width: '50%' }}>
              <div className="flex flex-wrap items-center mb-6 leading-6 overview ">
                <div className="overview__item">
                  <strong>Email</strong>
                  {freelancerDetail.email && freelancerDetail.email.length > 20 ? (
                    <Tooltip title={freelancerDetail.email} placement="bottom">
                      {subContent(freelancerDetail.email)}
                    </Tooltip>
                  ) : (
                    <span>{freelancerDetail.email}</span>
                  )}
                </div>
                <div className="overview__item">
                  <strong>Phone</strong>
                  <span>{freelancerDetail.phoneNumber}</span>
                </div>
                <div className="overview__item">
                  <strong>Gender</strong>
                  <span>{getGender(freelancerDetail.gender)}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center mb-6 leading-6 overview">
                <div className="overview__item">
                  <strong>Birth Date</strong>
                  {freelancerDetail.dateOfBirth && <span>{formatDateMonth(freelancerDetail.dateOfBirth)}</span>}
                </div>
              </div>
            </Skeleton>
            {curUser.id === freelancerId || !isUserLogin ? (
              <></>
            ) : (
              <Skeleton active loading={loading} paragraph={{ rows: 1, width: '100%' }}>
                <div className="mt-6 button-make">
                  <div
                    onClick={gotoChat}
                    className="cursor-pointer text-white block text-center shadow-lg bg-blue-600 py-3.5 transition text-lg rounded"
                  >
                    Let's Chat
                    <ArrowRightOutlined className="relative ml-3 text-white -top-1" />
                  </div>
                </div>
              </Skeleton>
            )}
            <Skeleton active loading={loading} paragraph={{ rows: 2, width: '100%' }}>
              <div className="mt-8 skills">
                <h4 className="text-xl font-medium">Languages</h4>
                <div className="block skills-tags">
                  {freelancerDetail.languages &&
                    freelancerDetail.languages.map((item: any) => <span key={item.id}>{item.name}</span>)}
                </div>
              </div>
            </Skeleton>
            <Skeleton active loading={loading} paragraph={{ rows: 2, width: '100%' }}>
              <div className="mt-8 skills">
                <h4 className="text-xl font-medium">Skills</h4>
                <div className="block skills-tags">
                  {freelancerDetail.skills &&
                    freelancerDetail.skills.map((item: any) => (
                      <Tooltip color="geekblue" title={item.experience} key={item.id}>
                        <span style={{ cursor: 'context-menu' }}>{item.name}</span>
                      </Tooltip>
                    ))}
                </div>
              </div>
            </Skeleton>
            <Skeleton active loading={loading} paragraph={{ rows: 2, width: '100%' }}>
              <div className="pb-4 mt-8 certifications">
                <h4 className="text-xl font-medium">Certifications</h4>
                <div className="flex flex-col gap-1">
                  {freelancerDetail.certifications &&
                    freelancerDetail.certifications.map((item: any, idx: number) => (
                      <a
                        href={`http://${item}`}
                        target="_blank"
                        key={idx}
                        rel="noreferrer"
                        className="ml-2 text-lg"
                        style={{ color: '#1890FF' }}
                      >
                        Certificate {idx + 1}
                      </a>
                    ))}
                </div>
              </div>
            </Skeleton>
            <Skeleton active loading={loading} paragraph={{ rows: 4, width: '100%' }}>
              <div className="mb-3 text-xl font-medium">Analysis</div>
              <div style={{ boxShadow: 'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px' }}>
                {analysisJob && <RadioChartFreelancer freelancerAnalysis={analysisJob} />}
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between px-4 mt-4 text-base">
                    <div className="flex gap-2">
                      <Badge color="#36c361" size="default" /> <p>Total done job</p>
                    </div>
                    {analysisJob && <div className="font-bold">{analysisJob.totalDoneJobs}</div>}
                  </div>
                  <div className="flex justify-between px-4 text-base">
                    <div className="flex gap-2">
                      <Badge color="#2194ff" size="default" /> <p>Total on time job</p>
                    </div>
                    {analysisJob && <div className="font-bold">{analysisJob.totalOnTimeJobs}</div>}
                  </div>
                  <div className="flex justify-between px-4 text-base">
                    <div className="flex gap-2">
                      <Badge color="#FA6CA4" size="default" /> <p>Current applied job</p>
                    </div>
                    {analysisJob && <div className="font-bold">{analysisJob.currentAppliedJobs}</div>}
                  </div>
                  <div className="flex justify-between px-4 text-base">
                    <div className="flex gap-2">
                      <Badge color="#722ed1" size="default" /> <p>Total rejected job</p>
                    </div>
                    {analysisJob && <div className="font-bold">{analysisJob.totalRejectedJobs}</div>}
                  </div>
                  <div className="flex justify-between px-4 text-base">
                    <div className="flex gap-2">
                      <Badge color="#cf1322" size="default" /> <p>Total time removed from job</p>
                    </div>
                    {analysisJob && <div className="font-bold">{analysisJob.totalTimeRemovedFromJob}</div>}
                  </div>
                </div>
              </div>
            </Skeleton>
            <br />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default FreelancerProfile;
