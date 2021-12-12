import { Input, Select, Tabs } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { handleGetListJobUser } from 'app/slices/userSlice';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { listStatusJob } from 'utils/enum';
import TableApplied from './Components/TableApplied';
import TableJoined from './Components/TableJoined';
import queryString from 'query-string';
import { handlePostAReviewByUserToJob } from 'app/slices/jobSlice';
const { TabPane } = Tabs;
const { Option } = Select;

export default function MyJobs() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [listApplied, setlistApplied] = useState<any>([]);
  const [listJoined, setListJoined] = useState<any>([]);
  const [key, setKey] = useState<any>(
    queryString.parse(location.search).key ? queryString.parse(location.search).key : '1'
  );
  function callback(key: string) {
    setKey(key);
  }
  const history = useHistory();
  const [filter, setFilter] = useState<any>({
    jobTitle: '',
    jobStatuses: [],
  });
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.curUser.id);
  const handleSearchNameApplied = (e: any) => {
    setFilter((prev: any) => ({ ...prev, jobTitle: e.target.value }));
  };
  const handleStatusesApplied = (value: string) => {
    setFilter((prev: any) => ({ ...prev, jobStatuses: value }));
  };
  const handleGetJobJoined = async (userId: string) => {
    const filters = {
      ...filter,
      page: 1,
      records: 999,
    };
    for (const key in filters) {
      if (filters[key] === undefined || filters[key] === null || filters[key] === '' || filters[key] === []) {
        delete filters[key];
      }
    }
    let data = {
      type: 'joined',
      userId,
      filters,
    };
    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetListJobUser(data));
      if (payload) {
        let data = payload.jobsOfUser.map((item: any) => {
          return {
            ...item,
            key: Math.random(),
          };
        });
        setListJoined(data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleGetJobApplied = async (userId: string) => {
    const filters = {
      ...filter,
      page: 1,
      records: 999,
    };
    for (const key in filters) {
      if (filters[key] === undefined || filters[key] === null || filters[key] === '' || filters[key] === []) {
        delete filters[key];
      }
    }
    let data = {
      type: 'applied',
      userId,
      filters,
    };
    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetListJobUser(data));
      if (payload) {
        let data = payload.jobsOfUser.map((item: any) => {
          return {
            ...item,
            key: Math.random(),
          };
        });
        setlistApplied(data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handlePostReview = async (data: any) => {
    try {
      await dispatch(handlePostAReviewByUserToJob(data));
    } catch (error) {}
  };

  useEffect(() => {
    history.push({
      pathname: '/dashboard/my-jobs',
      search: `key=${key}`,
    });
    if (key === '2') {
      handleGetJobApplied(userId);
    }
    if (key === '1') {
      handleGetJobJoined(userId);
    }
  }, [filter, key]);
  useEffect(() => {
    if (key === '1' || key === '2') {
      setFilter({ jobTitle: '', jobStatuses: [] });
    }
  }, [key]);
  return (
    <div className="dashboard__earning">
      <div className="flex items-center justify-between">
        <div className="m-3 text-xl font-medium">List Jobs {key === '1' ? ' Joined' : ' Applied'}</div>
        <div className="flex gap-4">
          <div style={{ width: 'calc(160px)' }}>
            <Input value={filter.jobTitle} onChange={handleSearchNameApplied} placeholder="Search by name..." />
          </div>
          <div style={{ width: 'calc(160px)' }}>
            <Select
              placeholder="Job status"
              allowClear
              style={{ width: 150 }}
              value={filter.jobStatuses}
              onChange={handleStatusesApplied}
            >
              {listStatusJob.map((item) => (
                <Option value={item} key={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <Tabs size="large" defaultActiveKey={key} onChange={callback}>
        <TabPane tab="List jobs joined" key="1">
          <TableJoined handlePostReview={handlePostReview} loading={loading} data={listJoined} />
        </TabPane>
        <TabPane tab="List jobs applied" key="2">
          <TableApplied loading={loading} data={listApplied} />
        </TabPane>
      </Tabs>
    </div>
  );
}
