import { Badge, Modal, Skeleton, Timeline, Tooltip } from 'antd';
import { useAppDispatch } from 'app/hooks';
import { useEffect, useState } from 'react';
import { handleGetDetailFreelancer } from 'app/slices/userSlice';
import './index.scss';
import {
  ArrowRightOutlined,
  ExperimentOutlined,
  Html5Outlined,
  MailOutlined,
  SolutionOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { formatDate, formatDateMonth, getGender } from 'helpers/generate';
import RadioChartFreelancer from 'features/Freelancers/pages/FreelancerProfile/components/RadioChartFreelancer';
type ModalDetail = {
  title: string;
  isVisible: boolean;
  handleConfirm: (id?: any) => any;
  handleCancelConfirm: () => any;
  userId: string;
};
export default function ModalDetailEmloyee({
  isVisible,
  handleConfirm,
  title,
  handleCancelConfirm,
  userId,
}: ModalDetail) {
  const [visible, setVisible] = useState(false);
  const [freelancerDetail, setFreelancerDetail] = useState<any>({});
  const [jobs, setJobs] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    setVisible(false);
    handleConfirm();
  };
  const handleCancel = () => {
    handleCancelConfirm();
    setVisible(false);
  };
  const dispatch = useAppDispatch();
  const getDetailFreelancer = async (id: string) => {
    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetDetailFreelancer(id));
      if (!!payload) {
        const { cv, jobsAnalysis } = payload;
        setFreelancerDetail(cv);
        setJobs(jobsAnalysis);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };
  useEffect(() => {
    if (userId && !!visible) {
      getDetailFreelancer(userId);
    }
  }, [userId, visible]);
  useEffect(() => setVisible(isVisible), [isVisible]);
  return (
    <>
      <Modal
        className="custom-modal"
        width={1100}
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Skeleton active loading={loading}>
          <div className="detail">
            <div className="left">
              <div className="left__avatar">
                <img
                  src={freelancerDetail && `http://${freelancerDetail.avatar}`}
                  width="100"
                  height="100"
                  style={{ borderRadius: '50%' }}
                  alt="avatar"
                />
              </div>
              <div className="info">
                <div className="info__title">
                  <UserOutlined /> <span>Info</span>
                </div>
                <div className="info__content">
                  <div>
                    <div className="text-base font-medium">Full name </div>
                    <div>{freelancerDetail.firstName + ' ' + freelancerDetail.lastName}</div>
                  </div>
                  <div>
                    <div className="text-base font-medium">Email </div>
                    <div>{freelancerDetail.email}</div>
                  </div>
                  <div>
                    <div className="text-base font-medium">Phone number </div>
                    <div>{freelancerDetail.phoneNumber}</div>
                  </div>
                  <div>
                    <div className="text-base font-medium">Date of birth </div>
                    <div>{formatDate(freelancerDetail.birthOfDate)}</div>
                  </div>
                  <div>
                    <div className="text-base font-medium">Gender </div>
                    <div>{getGender(freelancerDetail.gender)}</div>
                  </div>
                  <div>
                    <div className="text-base font-medium">Area </div>
                    {freelancerDetail.area && freelancerDetail.area.name && <div>{freelancerDetail.area.name}</div>}
                  </div>
                  <div>
                    <div className="text-base font-medium">Certifications </div>
                    <div className="flex flex-wrap gap-1">
                      {freelancerDetail.certifications &&
                        freelancerDetail.certifications.map((item: any, idx: number) => (
                          <a
                            href={`http://${item}`}
                            target="_blank"
                            key={idx}
                            rel="noreferrer"
                            className="text-base"
                            style={{ color: '#1890FF' }}
                          >
                            Certificate {idx + 1}
                          </a>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="flex justify-between">
                <div>
                  <div className="educations">
                    <div className="educations__title">
                      <Html5Outlined /> <span>Educations</span>
                    </div>
                    <div
                      className="educations__content"
                      dangerouslySetInnerHTML={{ __html: freelancerDetail.educations }}
                    ></div>
                  </div>
                  <div className="skills">
                    <div className="skills__title">
                      <ExperimentOutlined /> <span>Skills</span>
                    </div>
                    <div className="skills__content">
                      {freelancerDetail.skills &&
                        freelancerDetail.skills.map((item: any) => (
                          <div className="skills__tag" key={item.id}>
                            <Tooltip color="geekblue" title={item.experience} placement="bottom">
                              <span style={{ cursor: 'context-menu' }}>{item.name}</span>
                            </Tooltip>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="experiences">
                    <div className="experiences__title">
                      <SolutionOutlined /> <span>Experiences</span>
                    </div>
                    <div className="experiences__content">
                      <Timeline>
                        {freelancerDetail.experiences &&
                          freelancerDetail.experiences.map((item: any) => (
                            <Timeline.Item key={item.id}>
                              <div key={item.id} className="flex flex-col gap-2 mt-4">
                                {/* <div className="flex items-center gap-4">
                          <ArrowRightOutlined style={{ color: '#2e3fe5' }} /> */}
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
                  </div>
                </div>
                <div className="pr-3 mb-4 jobAnalyst">
                  <div className="mb-2 experiences__title">
                    <SolutionOutlined /> <span>Job analysis</span>
                  </div>
                  <div
                    style={{
                      boxShadow: 'rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
                      width: 'calc(400px)',
                    }}
                  >
                    {jobs && <RadioChartFreelancer freelancerAnalysis={jobs} />}
                    <div className="flex flex-col justify-center">
                      <div className="flex justify-between px-4 mt-4 text-base">
                        <div className="flex gap-2">
                          <Badge color="#36c361" size="default" /> <p>Total done job</p>
                        </div>
                        {jobs && <div className="font-bold">{jobs.totalDoneJobs}</div>}
                      </div>
                      <div className="flex justify-between px-4 text-base">
                        <div className="flex gap-2">
                          <Badge color="#2194ff" size="default" /> <p>Total on time job</p>
                        </div>
                        {jobs && <div className="font-bold">{jobs.totalOnTimeJobs}</div>}
                      </div>
                      <div className="flex justify-between px-4 text-base">
                        <div className="flex gap-2">
                          <Badge color="#FA6CA4" size="default" /> <p>Current applied job</p>
                        </div>
                        {jobs && <div className="font-bold">{jobs.currentAppliedJobs}</div>}
                      </div>
                      <div className="flex justify-between px-4 text-base">
                        <div className="flex gap-2">
                          <Badge color="#722ed1" size="default" /> <p>Total rejected job</p>
                        </div>
                        {jobs && <div className="font-bold">{jobs.totalRejectedJobs}</div>}
                      </div>
                      <div className="flex justify-between px-4 text-base">
                        <div className="flex gap-2">
                          <Badge color="#cf1322" size="default" /> <p>Total time removed from job</p>
                        </div>
                        {jobs && <div className="font-bold">{jobs.totalTimeRemovedFromJob}</div>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Skeleton>
      </Modal>
    </>
  );
}
