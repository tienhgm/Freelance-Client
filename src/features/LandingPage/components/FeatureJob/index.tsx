import {
  AccountBookOutlined,
  DoubleRightOutlined,
  EnvironmentOutlined,
  FieldTimeOutlined,
  LaptopOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { handleApplyJob, handleGetJobs } from 'app/slices/jobSlice';
import { formatDateMonth } from 'helpers/generate';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import ModalFormApply from 'components/ModalForm';
import './index.scss';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';

export default function FeatureJob() {
  const [listJob, setListJob] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [openModalApply, setOpenModalApply] = useState(false);
  const [jobId, setJobId] = useState<any>('');
  const dispatch = useAppDispatch();
  const history = useHistory();
  const userRole = useAppSelector((state) => state.user.curUser.role);
  const handleOpenApply = (id: string) => {
    if (!userRole) {
      history.push('/login');
    } else {
      setJobId(id);
      setOpenModalApply(true);
    }
  };
  const handleApplyToJob = async (values: any) => {
    const payload = {
      introduceMessage: values.introduceMessage,
      jobId: jobId,
    };
    await dispatch(handleApplyJob(payload));
  };
  const goToDetailJob = (id: string) => {
    history.push(`/find-jobs/${id}`);
  };
  const handleGetListJob = async () => {
    try {
      let listFilter = { records: 4, page: 1 };
      const { payload } = await dispatch(handleGetJobs(listFilter));
      if (payload) {
        const { jobs } = payload;
        setListJob(jobs);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };
  useEffect(() => {
    handleGetListJob();
  }, []);
  return (
    <div className="feature lg:px-36 md:px-32 xs:px-28">
      <ScrollOverPack className="container">
        <QueueAnim height={500} key="text" duration={1000} type="bottom" leaveReverse>
          <div key="div">
            <div className="flex justify-between mb-10">
              <div className="text-2xl font-medium">New Jobs</div>
              <div className="text-base">
                <p onClick={() => history.push('/find-jobs')} className="flex items-center cursor-pointer view-more">
                  Browse all jobs <DoubleRightOutlined className="mt-1 ml-1" />
                </p>
              </div>
            </div>
            <div className="shadow-2xl box">
              {listJob &&
                listJob.map((item: any) => (
                  <Skeleton active loading={loading} key={item.id}>
                    <div className="h-40 box__item">
                      {/* left */}
                      <div className="flex items-center">
                        <AccountBookOutlined style={{ fontSize: 45 }} />
                        <div className="flex flex-col ml-4 flex-nowrap">
                          <div
                            className="text-lg cursor-pointer box__item__title"
                            onClick={() => goToDetailJob(item.id)}
                          >
                            {item.title}
                          </div>
                          <div className="flex flex-wrap gap-4 box__item__content">
                            <div className="flex flex-wrap items-center">
                              <WalletOutlined />
                              <div className="ml-1">{item.salary}$</div>
                            </div>
                            <div className="flex items-center">
                              <EnvironmentOutlined className="mt-1" />
                              {item.area && <div className="ml-1">{item.area?.name}</div>}
                            </div>
                            <div className="flex flex-wrap items-center">
                              <LaptopOutlined className="flex-wrap mt-1" />
                              <div className="ml-1">{item.workMode}</div>
                            </div>
                            <div className="flex flex-wrap items-center">
                              <FieldTimeOutlined className="mt-1" />
                              <div className="ml-1">{formatDateMonth(item.createdAt)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* end left */}
                      {/* right */}
                      <div className="flex flex-col gap-3">
                        {userRole === 1 ? (
                          <></>
                        ) : (
                          <div className="cursor-pointer btn btn__apply" onClick={() => handleOpenApply(item.id)}>
                            Apply
                          </div>
                        )}
                      </div>
                      {/* end right */}
                    </div>
                  </Skeleton>
                ))}
            </div>
          </div>
        </QueueAnim>
      </ScrollOverPack>

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
    </div>
  );
}
