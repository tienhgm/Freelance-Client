import './index.scss';
import { Tabs, Input, Select, Pagination } from 'antd';
import TableCandidates from './components/tableCandidates';
import { handleChangeApplyStatus, handleGetJobCandidates, handleGetJobEmployees } from 'app/slices/jobSlice';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'app/hooks';
import { applyStatus } from 'utils/enum';
import queryString from 'query-string';
const { TabPane } = Tabs;
const { Option } = Select;
export default function DetailJob() {
  const history = useHistory();
  const location = useLocation();
  const [key, setKey] = useState(queryString.parse(location.search).key);
  function callback(key: string) {
    setKey(key);
  }
  const [listJobCandidates, setListJobCandidates] = useState<any>([]);
  const [listJobEmployees, setListJobEmployees] = useState<any>([]);
  const [filters, setFilters] = useState<any>({
    name: '',
    applyStatus: null,
    appliedAt: '',
  });
  const [loading, setLoading] = useState(false);
  const match = useRouteMatch<any>();
  let jobId = match.params.id;
  const dispatch = useAppDispatch();
  const getListCandidates = async (jobId: string) => {
    let listFilter = { ...filters, page: 1, records: 99 };
    for (const key in listFilter) {
      if (listFilter[key] === undefined || listFilter[key] === null || listFilter[key] === '') {
        delete listFilter[key];
      }
    }
    const data = [jobId, listFilter];
    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetJobCandidates(data));
      if (payload.candidates) {
        let candidates = payload.candidates.map((item: any) => {
          return {
            ...item,
            fullName: item.user.firstName + ' ' + item.user.lastName,
          };
        });
        setListJobCandidates(candidates);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  const getListEmployees = async (jobId: string) => {
    let listFilter = { ...filters, page: 1, records: 99 };
    for (const key in listFilter) {
      if (listFilter[key] === undefined || listFilter[key] === null || listFilter[key] === '') {
        delete listFilter[key];
      }
    }
    const data = [jobId, listFilter];
    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetJobEmployees(data));
      if (payload.employees) {
        let employees = payload.employees.map((item: any) => {
          return {
            ...item,
            fullName: item.user.firstName + ' ' + item.user.lastName,
          };
        });
        setListJobEmployees(employees);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  const handleSearchName = (e: any) => {
    setFilters((prev: any) => ({ ...prev, name: e.target.value }));
  };
  const handleApplyStatus = (value: any) => {
    setFilters((prev: any) => ({ ...prev, applyStatus: value }));
  };
  const handleUpdateApplyStatus = async (data: any) => {
    try {
      await dispatch(handleChangeApplyStatus(data));
    } catch (error) {}
  };

  useEffect(() => {
    history.push({
      pathname: `/dashboard/jobs-manage/${jobId}`,
      search: `?key=${key}`,
    });
    if (key === '2') {
      getListCandidates(jobId);
    }
    if (key === '1') {
      getListEmployees(jobId);
    }
  }, [jobId, key, filters]);
  return (
    <div className="h-full candidate-manage">
      <div className="flex gap-2 mb-4 text-lg font-medium">
        <Link to="/dashboard/jobs-manage">Manage jobs</Link> {' > '}
        <div>
          {key === '1' && 'Manage employees'}
          {key === '2' && 'Manage candidates'}
        </div>
      </div>
      <div className="candidate">
        <div>
          <div className="flex justify-end gap-3 px-6">
            <div style={{ width: 'calc(160px)' }}>
              <Input value={filters.name} onChange={handleSearchName} placeholder="Search by name..." />
            </div>
            <div style={{ width: 'calc(160px)' }}>
              <Select
                placeholder="Apply status"
                allowClear
                style={{ width: 150 }}
                value={filters.applyStatus}
                onChange={handleApplyStatus}
              >
                {applyStatus.map((item) => (
                  <Option value={item} key={Math.random()}>
                    {item}
                  </Option>
                ))}
              </Select>
            </div>
            {/* <div>
              <DatePicker value={filters.appliedAt} onChange={onChangeDate} />
            </div> */}
          </div>
          {/* @ts-ignore */}
          <Tabs size="large" defaultActiveKey={key} onChange={callback}>
            <TabPane tab="List employees" key="1"></TabPane>
            <TabPane tab="List candidates" key="2">
              <TableCandidates
                handleUpdateApplyStatus={handleUpdateApplyStatus}
                data={listJobCandidates}
                loading={loading}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
