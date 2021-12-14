import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DownCircleTwoTone,
  MinusSquareTwoTone,
  PauseCircleTwoTone,
  PlayCircleTwoTone,
  PlusCircleTwoTone,
  ShoppingOutlined,
  ToolOutlined,
  ToolTwoTone,
  UpCircleTwoTone,
} from '@ant-design/icons';
import { Badge, Modal } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { handleGetAnalysistCompany, handleGetAnalysistUser } from 'app/slices/userSlice';
import { useEffect, useState } from 'react';
import Chart from './Components/Chart';
import ChartRadialBarCompany from './Components/RadioChartCompany';
import ChartRadialBarFreelancer from './Components/RadioChartFreelancer';
import TableListSkillCompany from './Components/TableListSkillCompany';
import './index.scss';
export default function Dashboard() {
  const userRole = useAppSelector((state) => state.user.curUser.role);
  const userId = useAppSelector((state) => state.user.curUser.id);
  const companyId = useAppSelector((state) => state.user.curUser?.company?.id);
  const dispatch = useAppDispatch();
  const [companyAnalysis, setCompanyAnalysis] = useState<any>();
  const [userAnalysis, setUserAnalysis] = useState<any>();
  const [listSkillCompany, setListSkillCompany] = useState<any>([]);
  const getAnalysisUser = async (userId: string) => {
    const { payload } = await dispatch(handleGetAnalysistUser(userId));
    if (payload) {
      setUserAnalysis(payload);
    }
  };
  const getAnalysisCompany = async (companyId: string) => {
    const { payload } = await dispatch(handleGetAnalysistCompany(companyId));
    if (payload) {
      setCompanyAnalysis(payload);
      let clonePayload = [...payload.skills];
      setListSkillCompany(
        clonePayload.map((item: any) => {
          return { ...item, key: Math.random() };
        })
      );
    }
  };
  const infoTotalPosted = (companyAnalysis: any) => {
    Modal.info({
      title: 'JOB ANALYSIS',
      content: (
        <div className="text-base">
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(200px)' }}>
              Total jobs await:{' '}
            </div>
            <div className="font-medium">{companyAnalysis.totalAwaitJobs}</div>
            <PlayCircleTwoTone />
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(200px)' }}>
              Total jobs working:{' '}
            </div>
            <div className="font-medium">{companyAnalysis.currentWorkingJobs}</div>
            <ToolTwoTone twoToneColor="#096dd9" />
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(200px)' }}>
              Total jobs doned:{' '}
            </div>
            <div className="font-medium">{companyAnalysis.totalDoneJobs}</div>
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(200px)' }}>
              Total jobs pending:{' '}
            </div>
            <div className="font-medium">{companyAnalysis.totalPendingJobs}</div>
            <PauseCircleTwoTone twoToneColor="#faad14" />
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(200px)' }}>
              Total jobs canceled:{' '}
            </div>
            <div className="font-medium">{companyAnalysis.totalCancelJobs}</div>
            <CloseCircleTwoTone twoToneColor="#f5222d" />
          </div>
        </div>
      ),
      onOk() {},
    });
  };
  const infoTotalEmployees = (companyAnalysis: any) => {
    Modal.info({
      title: 'EMPLOYEE ANALYSIS',
      content: (
        <div className="text-base">
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(200px)' }}>
              Employees working:
            </div>
            <div className="font-medium">{companyAnalysis.currentEmployeesWorking}</div>
            <ToolTwoTone twoToneColor="#096dd9" />
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(200px)' }}>
              Employees hired:
            </div>
            <div className="font-medium">{companyAnalysis.totalHiredEmployees}</div>
            <MinusSquareTwoTone twoToneColor="#f5222d" />
          </div>
        </div>
      ),
      onOk() {},
    });
  };
  const infoReviewCompany = (companyAnalysis: any) => {
    Modal.info({
      title: 'REVIEW ANALYSIS',
      content: (
        <div className="text-base">
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(200px)' }}>
              Total reviews:
            </div>
            <div className="font-medium">{companyAnalysis.totalReviews}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(200px)' }}>
              Total reviews written:
            </div>
            <div className="font-medium">{companyAnalysis.totalReviewsWritten}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(200px)' }}>
              The highest review point :
            </div>
            <div className="font-medium">{companyAnalysis.highestReviewPoint}</div>
            <UpCircleTwoTone twoToneColor="#52c41a" />
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(200px)' }}>
              The lowest review point :
            </div>
            <div className="font-medium">{companyAnalysis.lowestReviewPoint}</div>
            <DownCircleTwoTone twoToneColor="#f5222d" />
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(200px)' }}>
              Rate point :
            </div>
            <div className="font-medium">{companyAnalysis.rate.toFixed(2)}</div>
          </div>
        </div>
      ),
      onOk() {},
    });
  };
  const infoJobUser = (userAnalysis: any) => {
    Modal.info({
      title: 'JOBS ANALYSIS',
      content: (
        <div className="text-base">
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(250px)' }}>
              Current working jobs:{' '}
            </div>
            <div className="font-medium">{userAnalysis.currentWorkingJobs}</div>
            <ToolTwoTone twoToneColor="#096dd9" />
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(250px)' }}>
              Total jobs doned:{' '}
            </div>
            <div className="font-medium">{userAnalysis.totalDoneJobs}</div>
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(250px)' }}>
              Total on time jobs{' '}
            </div>
            <div className="font-medium">{userAnalysis.totalOnTimeJobs}</div>
            <PlayCircleTwoTone />
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(250px)' }}>
              Total approved jobs:{' '}
            </div>
            <div className="font-medium">{userAnalysis.totalApprovedJobs}</div>
            <PlusCircleTwoTone twoToneColor="#f759ab" />
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(250px)' }}>
              Total rejected jobs:{' '}
            </div>
            <div className="font-medium">{userAnalysis.totalRejectedJobs}</div>
            <CloseCircleTwoTone twoToneColor="#f5222d" />
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(250px)' }}>
              Total time removed from jobs:{' '}
            </div>
            <div className="font-medium">{userAnalysis.totalTimeRemovedFromJob}</div>
            <CloseCircleTwoTone twoToneColor="#f5222d" />
          </div>
        </div>
      ),
      onOk() {},
    });
  };
  const infoReviewUser = (userAnalysis: any) => {
    Modal.info({
      title: 'REVIEW ANALYSIS',
      content: (
        <div className="text-base">
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(225px)' }}>
              Total reviews from company:
            </div>
            <div className="font-medium">{userAnalysis.totalReviewsByCompany}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(225px)' }}>
              Total reviews written:
            </div>
            <div className="font-medium">{userAnalysis.totalReviewsWritten}</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(225px)' }}>
              The highest review point :
            </div>
            <div className="font-medium" style={{ width: 'calc(25px)' }}>
              {userAnalysis.highestReviewPoint}
            </div>
            <UpCircleTwoTone twoToneColor="#52c41a" />
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(225px)' }}>
              The lowest review point :
            </div>
            <div className="font-medium" style={{ width: 'calc(25px)' }}>
              {userAnalysis.lowestReviewPoint}
            </div>
            <DownCircleTwoTone twoToneColor="#f5222d" />
          </div>
          <div className="flex items-center gap-3">
            <div className="font-medium" style={{ width: 'calc(225px)' }}>
              Rate point :
            </div>
            <div className="font-medium">{userAnalysis.rate.toFixed(2)}</div>
          </div>
        </div>
      ),
      onOk() {},
    });
  };
  useEffect(() => {
    if (userRole === 2) {
      getAnalysisUser(userId);
    }
    if (userRole === 1) {
      getAnalysisCompany(companyId);
    }
  }, [userRole]);
  return (
    <div className="h-full dashboard">
      <h1 className="mb-8 text-2xl">Hi Tien!</h1>
      <div className="flex flex-wrap w-full gap-6">
        {userRole === 2 ? (
          <>
            <div className="dashboard__block">
              <div className="flex flex-col text-xl">
                <div className="mb-1 font">Balance</div>
                <div className="text-2xl font-bold">$ {userAnalysis && userAnalysis.totalSalary.toFixed(2)}</div>
              </div>
              <div className="dashboard__icon1">
                <ToolOutlined />
              </div>
            </div>
            <div className="dashboard__block" onClick={() => infoJobUser(userAnalysis)}>
              <div className="flex flex-col text-xl">
                <div className="mb-1">Jobs analysis</div>
                {/* <div className="text-2xl font-bold ">4</div> */}
              </div>
              <div className="dashboard__icon2">
                <ShoppingOutlined />
              </div>
            </div>
            <div className="dashboard__block" onClick={() => infoReviewUser(userAnalysis)}>
              <div className="flex flex-col text-xl">
                <div className="mb-1">Reviews analysis</div>
              </div>
              <div className="dashboard__icon3">
                <ToolOutlined />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="dashboard__block" onClick={() => infoTotalPosted(companyAnalysis)}>
              <div className="flex flex-col text-xl">
                <div className="mb-1">Total Jobs</div>
                <div className="text-2xl font-bold ">{companyAnalysis && companyAnalysis.totalPostedJobs}</div>
              </div>
              <div className="dashboard__icon1">
                <ToolOutlined />
              </div>
            </div>
            <div className="dashboard__block" onClick={() => infoTotalEmployees(companyAnalysis)}>
              <div className="flex flex-col text-xl">
                <div className="mb-1">Total employees</div>
                <div className="text-2xl font-bold ">{companyAnalysis && companyAnalysis.currentEmployeesWorking}</div>
              </div>
              <div className="dashboard__icon2">
                <ShoppingOutlined />
              </div>
            </div>
            <div className="dashboard__block" onClick={() => infoReviewCompany(companyAnalysis)}>
              <div className="flex flex-col text-xl">
                <div className="mb-1">Reviews analysis</div>
              </div>
              <div className="dashboard__icon3">
                <ToolOutlined />
              </div>
            </div>
          </>
        )}
      </div>
      {userRole === 1 ? (
        <div className="flex-wrap dashboard__chart">
          <div className="dashboard__chart__left">
            <div className="m-3 text-xl font-medium">Your Company Profile Views</div>
            <Chart />
          </div>
          <div className="dashboard__chart__right">
            <div className="m-3 text-xl font-medium">Salary Analytics</div>
            {companyAnalysis && <ChartRadialBarCompany companyAnalysis={companyAnalysis} />}
            <div className="flex flex-col justify-center">
              <div className="flex justify-between px-4 mt-4 text-lg">
                <div className="flex gap-2">
                  <Badge color="#36c361" size="default" /> <p>Total salary pay</p>
                </div>
                {userAnalysis && <div className="font-bold">{userAnalysis.totalSalaryPay}</div>}
              </div>
              <div className="flex justify-between px-4 text-lg">
                <div className="flex gap-2">
                  <Badge color="#2194ff" size="default" /> <p>The highest salary pay</p>
                </div>
                {userAnalysis && <div className="font-bold">{userAnalysis.highestJobSalaryPay}</div>}
              </div>
              <div className="flex justify-between px-4 text-lg">
                <div className="flex gap-2">
                  <Badge color="#FA6CA4" size="default" /> <p>The lowest salary pay</p>
                </div>
                {userAnalysis && <div className="font-bold">{userAnalysis.lowestJobSalaryPay}</div>}
              </div>
              {/* <div className="flex justify-between px-4 text-lg">
                <div className="flex gap-2">
                  <Badge color="#7B46BE" size="default" /> <p>Total Jobs</p>
                </div>
                <div className="font-bold">123</div>
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-wrap dashboard__chart">
            <div className="dashboard__chart__left">
              <div className="m-3 text-xl font-medium">Your Profile Views</div>
              <Chart />
            </div>
            <div className="dashboard__chart__right">
              <div className="m-3 text-xl font-medium">Salary Analytics</div>
              {userAnalysis && <ChartRadialBarFreelancer userAnalysis={userAnalysis} />}
              <div className="flex flex-col justify-center">
                <div className="flex justify-between px-4 mt-4 text-lg">
                  <div className="flex gap-2">
                    <Badge color="#36c361" size="default" /> <p>Total salary earned</p>
                  </div>
                  {userAnalysis && <div className="font-bold">{userAnalysis.totalSalary.toFixed(2)}</div>}
                </div>
                <div className="flex justify-between px-4 text-lg">
                  <div className="flex gap-2">
                    <Badge color="#2194ff" size="default" /> <p>The highest salary earned</p>
                  </div>
                  {userAnalysis && <div className="font-bold">{userAnalysis.highestJobSalary}</div>}
                </div>
                <div className="flex justify-between px-4 text-lg">
                  <div className="flex gap-2">
                    <Badge color="#FA6CA4" size="default" /> <p>The lowest salary earned</p>
                  </div>
                  {userAnalysis && <div className="font-bold">{userAnalysis.lowestJobSalary}</div>}
                </div>
                {/* <div className="flex justify-between px-4 text-lg">
                <div className="flex gap-2">
                  <Badge color="#7B46BE" size="default" /> <p>Total Jobs</p>
                </div>
                <div className="font-bold">123</div>
              </div> */}
              </div>
            </div>
          </div>
        </>
      )}
      {userRole === 1 ? <TableListSkillCompany data={listSkillCompany} /> : <></>}
    </div>
  );
}
