// @ts-nocheck
import './index.scss';
import { Tabs, Input, Select, Tag, Button, Tooltip } from 'antd';
import TableCandidates from './components/tableCandidates';
import TableEmployees from './components/tableEmployees';
import {
  handleChangeApplyStatus,
  handleDeleteEmployeeFromJob,
  handleFinishJob,
  handleGetDetailJob,
  handleGetJobCandidates,
  handleGetJobEmployees,
  handlePostAReview,
} from 'app/slices/jobSlice';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'app/hooks';
import { applyStatus, jobEmployeeStatus } from 'utils/enum';
import queryString from 'query-string';
import { getJobStatus } from 'helpers/Dashboard';
import { CheckOutlined } from '@ant-design/icons';
import { handleUpdateReviewByCompany } from 'app/slices/userSlice';
import { getJobCandidatesSuggest } from 'apis/jobModule';
const { TabPane } = Tabs;
const { Option } = Select;
export default function DetailJob() {
  const history = useHistory();
  const location = useLocation();
  const route = useRouteMatch<any>();
  const [key, setKey] = useState<any>(
    queryString.parse(location.search).key ? queryString.parse(location.search).key : '1'
  );
  const [infoNeed, setInfoNeed] = useState<any>({
    maxEmployees: 0,
    totalEmployees: 0,
    jobStatus: '',
  });
  function callback(key: string) {
    setKey(key);
  }
  const [listJobCandidates, setListJobCandidates] = useState<any>([]);
  const [listJobEmployees, setListJobEmployees] = useState<any>([]);
  const [isGetSuggest, setIsGetSuggest] = useState<any>(false);
  const [filtersCandidate, setFiltersCandidate] = useState<any>({
    name: '',
    applyStatus: null,
    appliedAt: '',
  });
  const [filtersEmployee, setFiltersEmployee] = useState<any>({
    name: '',
    jobEmployeeStatus: null,
    joinedAt: '',
  });
  const [jobName, setJobName] = useState('');
  const [jobStatus, setJobStatus] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const match = useRouteMatch<any>();
  let jobId = match.params.id;
  const dispatch = useAppDispatch();
  const getListCandidates = async (jobId: string) => {
    let listFilter = { ...filtersCandidate, page: 1, records: 999 };
    for (const key in listFilter) {
      if (listFilter[key] === undefined || listFilter[key] === null || listFilter[key] === '') {
        delete listFilter[key];
      }
    }
    const data = [jobId, listFilter];
    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetJobCandidates(data));
      if (payload) {
        setInfoNeed((prev: any) => ({
          ...prev,
          maxEmployees: payload.maxEmployees,
          totalEmployees: payload.totalEmployees,
          jobStatus: payload.jobStatus,
        }));
        setJobStatus(payload.jobStatus);
        let candidates = payload.candidates.map((item: any) => {
          return {
            ...item,
            fullName: item.user.firstName + ' ' + item.user.lastName,
            key: Math.random(),
          };
        });
        setListJobCandidates(candidates);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };
  const getListEmployees = async (jobId: string) => {
    let listFilter = { ...filtersEmployee, page: 1, records: 999 };
    for (const key in listFilter) {
      if (listFilter[key] === undefined || listFilter[key] === null || listFilter[key] === '') {
        delete listFilter[key];
      }
    }
    const data = [jobId, listFilter];
    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetJobEmployees(data));
      if (payload) {
        setInfoNeed((prev: any) => ({
          ...prev,
          maxEmployees: payload.maxEmployees,
          totalEmployees: payload.totalEmployees,
        }));
        setJobStatus(payload.jobStatus);
        let employees = payload.employees.map((item: any) => {
          return {
            ...item,
            fullName: item.user.firstName + ' ' + item.user.lastName,
            key: Math.random(),
          };
        });
        setListJobEmployees(employees);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };
  const getSuggestList = async (jobId: string) => {
    try {
      setLoading(true);
      const { data } = await getJobCandidatesSuggest(jobId);
      if (data) {
        setInfoNeed((prev: any) => ({
          ...prev,
          maxEmployees: data.maxEmployees,
          totalEmployees: data.totalEmployees,
          jobStatus: data.jobStatus,
        }));
        setJobStatus(data.jobStatus);
        let candidates = data.candidates.map((item: any) => {
          return {
            ...item,
            fullName: item.user.firstName + ' ' + item.user.lastName,
            key: Math.random(),
          };
        });
        setListJobCandidates(candidates);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleGetJobName = async () => {
    try {
      const { payload } = await dispatch(handleGetDetailJob(route.params.id));
      if (payload) {
        setJobName(payload.jobDetail.title);
      }
    } catch (error) {}
  };
  const handleSearchNameEmployee = (e: any) => {
    setFiltersEmployee((prev: any) => ({ ...prev, name: e.target.value }));
  };
  const handleSearchNameCandidate = (e: any) => {
    setFiltersCandidate((prev: any) => ({ ...prev, name: e.target.value }));
  };
  const handleApplyStatus = (value: any) => {
    setFiltersCandidate((prev: any) => ({ ...prev, applyStatus: value }));
  };
  const handleWorkingStatus = (value: any) => {
    setFiltersEmployee((prev: any) => ({ ...prev, jobEmployeeStatus: value }));
  };
  const handleUpdateApplyStatus = async (data: any) => {
    try {
      await dispatch(handleChangeApplyStatus(data));
    } catch (error) {}
  };
  const handleDeleteEmployee = async (data: any) => {
    try {
      await dispatch(handleDeleteEmployeeFromJob(data));
    } catch (error) {}
  };
  const handlePostReview = async (data: any) => {
    try {
      await dispatch(handlePostAReview(data));
    } catch (error) {}
  };
  const handleUpdateReviewCompany = async (data: any) => {
    delete data.review.isEdit;
    delete data.review.reviewId;
    try {
      if (data.reviewId) {
        await dispatch(handleUpdateReviewByCompany(data));
      }
    } catch (error) {}
  };
  const handleDoneJob = async () => {
    await dispatch(handleFinishJob(jobId));
  };
  useEffect(() => {
    handleGetJobName();
    history.push({
      pathname: `/dashboard/jobs-manage/${jobId}`,
      search: `?key=${key}`,
    });
    if (key === '2' && isGetSuggest) {
      getSuggestList(jobId);
    } else if (key === '2' && !isGetSuggest) {
      getListCandidates(jobId);
    }
    if (key === '1') {
      getListEmployees(jobId);
    }
  }, [jobId, key, filtersCandidate, filtersEmployee, isGetSuggest]);

  useEffect(() => {
    if (key === '2') {
      setFiltersEmployee({ name: '', jobEmployeeStatus: null, joinedAt: '' });
    }
    if (key === '1') {
      setFiltersCandidate({ name: '', applyStatus: null, appliedAt: '' });
    }
  }, [key]);
  const goToDetailJob = (jobId: any) => {
    window.open(`/find-jobs/${jobId}`, '_blank');
  };
  return (
    <div className="h-full candidate-manage">
      <div className="flex gap-2 mb-4 text-lg font-medium">
        <Link to="/dashboard/jobs-manage">Manage jobs</Link> {' > '}
        {route.params && route.params.id && (
          <div style={{ color: '#1892ff', cursor: 'pointer' }} onClick={() => goToDetailJob(jobId)}>
            {jobName + ' >'}
          </div>
        )}
        <div>
          {key === '1' && 'Manage employees'}
          {key === '2' && 'Manage candidates'}
        </div>
      </div>
      <div className="candidate">
        <div>
          <div className="flex justify-between gap-3 px-6">
            {jobStatus?.length > 0 ? (
              <div className="flex items-center gap-2">
                {jobStatus !== 'Done' && key === '1' && (
                  <div>
                    <Tooltip color="geekblue" title="Done">
                      <Button icon={<CheckOutlined />} onClick={handleDoneJob} />
                    </Tooltip>
                  </div>
                )}
                <div className="font-medium">Job status: </div>
                <div>{<Tag color={getJobStatus(jobStatus)}>{jobStatus}</Tag>}</div>
              </div>
            ) : (
              <div></div>
            )}
            <div className="flex justify-end gap-3">
              {key === '1' && (
                <>
                  <div style={{ width: 'calc(160px)' }}>
                    <Input
                      value={filtersEmployee.name}
                      onChange={handleSearchNameEmployee}
                      placeholder="Search by name..."
                    />
                  </div>
                  <div style={{ width: 'calc(160px)' }}>
                    <Select
                      placeholder="Work status"
                      allowClear
                      style={{ width: 150 }}
                      value={filtersEmployee.applyStatus}
                      onChange={handleWorkingStatus}
                    >
                      {jobEmployeeStatus.map((item) => (
                        <Option value={item} key={item}>
                          {item}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </>
              )}
              {key === '2' && (
                <>
                  {!isGetSuggest && (
                    <>
                      <div style={{ width: 'calc(160px)' }}>
                        <Input
                          value={filtersCandidate.name}
                          onChange={handleSearchNameCandidate}
                          placeholder="Search by name..."
                        />
                      </div>
                      <div style={{ width: 'calc(160px)' }}>
                        <Select
                          placeholder="Apply status"
                          allowClear
                          style={{ width: 150 }}
                          value={filtersCandidate.applyStatus}
                          onChange={handleApplyStatus}
                        >
                          {applyStatus.map((item) => (
                            <Option value={item} key={item}>
                              {item}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </>
                  )}
                  <div style={{ width: 'calc(160px)' }}>
                    <Button onClick={() => setIsGetSuggest(!isGetSuggest)}>
                      {isGetSuggest ? 'View all' : 'Suggest'}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* @ts-ignore */}
          <Tabs size="large" defaultActiveKey={key} onChange={callback}>
            <TabPane tab="List employees" key="1">
              <TableEmployees
                handleUpdateWorkStatus={handleDeleteEmployee}
                handlePostReview={handlePostReview}
                handleUpdateReviewCompany={handleUpdateReviewCompany}
                data={listJobEmployees}
                loading={loading}
                infoNeed={infoNeed}
              />
            </TabPane>
            <TabPane tab="List candidates" key="2">
              <TableCandidates
                handleUpdateApplyStatus={handleUpdateApplyStatus}
                data={listJobCandidates}
                loading={loading}
                infoNeed={infoNeed}
                isGetSuggest={isGetSuggest}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
