import { useEffect, useState } from 'react';
import { Space, Tabs, Tag } from 'antd';
import { useAppDispatch } from 'app/hooks';
import TableAdmin from './components/tableAdmin';
import TableCompany from './components/tableCompany';
import TableFreelance from './components/tableFreelance';
import queryString from 'query-string';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { handleGetAdmin, handleGetCompanies, handleGetFreelancer } from 'app/slices/adminSlice';

const { TabPane } = Tabs;

const columns = [
  {
    title: 'Avatar',
    dataIndex: 'avatar',
    key: 'avatar',
    width: 100,
    render: (avatar: string) => (
      <div className="font-medium">
        <img src={`http://${avatar}`} width="40" height="40" alt="avt" style={{ borderRadius: '50%' }} />
      </div>
    ),
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },

  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Activated',
    dataIndex: 'isActivated',
    key: 'isActivated',
    render: (isActivated: string) => (
      <>
        {isActivated === 'true' && <Tag color="success">{isActivated}</Tag>}
        {isActivated === 'false' && <Tag color="error">{isActivated}</Tag>}
      </>
    ),
  },
  {
    title: 'Lock',
    dataIndex: 'isLock',
    key: 'isLock',
    render: (isLock: string) => (
      <>
        {isLock === 'true' && <Tag color="success">{isLock}</Tag>}
        {isLock === 'false' && <Tag color="error">{isLock}</Tag>}
      </>
    ),
  },

  {
    title: 'Action',
    key: 'action',
    width: 250,
    render: (text: any, record: any) => (
      <Space size="middle">
        <a>edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

function ManageUsers() {
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch<any>();
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [totalAdmin, setTotalAdmin] = useState<any>(0);
  const [totalCompanies, setTotalCompanies] = useState<any>(0);
  const [totalFreelancer, setTotalFreelancer] = useState<any>(10);
  const [loading, setLoading] = useState<any>(true);

  const [listAdmin, setListAdmin] = useState<any>([]);
  const [listCompanies, setListCompanies] = useState<any>([]);
  const [listFreelancer, setListFreelancer] = useState<any>([]);

  const [filtersAdmin, setFiltersAdmin] = useState<any>({});
  const [filtersCompany, setFiltersCompany] = useState<any>({});
  const [filtersFreelancer, setFiltersFreelancer] = useState<any>({});

  const [key, setKey] = useState<any>(
    queryString.parse(location.search).key ? queryString.parse(location.search).key : '1'
  );
  const [role, setRole] = useState<any>(queryString.parse(location.search).key ? key - 1 : '0');

  const handleTabsChange = (key: any) => {
    setKey(key);
    setRole(key - 1);
  };

  const getListAdmin = async (role: any) => {
    let filters = { ...filtersAdmin, page: 1 };
    const data = { role, filters };

    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetAdmin(data));
      if (payload) {
        const { totalRecords, users } = payload;
        setTotalAdmin(totalRecords);
        setListAdmin(users);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  const getListCompanies = async (role: any) => {
    let filters = { ...filtersCompany, page };
    const data = { role, filters };

    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetCompanies(data));
      if (payload) {
        const { totalRecords, users } = payload;
        setTotalCompanies(totalRecords);
        setListCompanies(users);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  const getListFreelancer = async (role: any) => {
    let filters = { ...filtersFreelancer, page, records: totalFreelancer };
    const data = { role, filters };

    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetFreelancer(data));
      if (payload) {
        const { totalRecords, users } = payload;
        setTotalFreelancer(totalRecords);
        setListFreelancer(users);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 200);
    }
  };

  useEffect(() => {
    history.push({
      search: `?key=${key}`,
    });

    if (key === '1') {
      getListAdmin(role);
    }
    if (key === '2') {
      getListCompanies(role);
    }
    if (key === '3') {
      getListFreelancer(role);
    }
  }, [key, totalFreelancer]);

  return (
    <div
      className="relative w-full p-6 overflow-y-auto bg-white shadow-xl manage-users"
      style={{ height: 'calc(100vh - 112px)' }}
    >
      <Tabs size="large" defaultActiveKey={key} onChange={handleTabsChange}>
        <TabPane tab="ADMIN" key="1">
          <TableAdmin columns={columns} data={listAdmin} load={loading} />
        </TabPane>
        <TabPane tab="COMPANY" key="2">
          <TableCompany data={listCompanies} load={loading} />
        </TabPane>
        <TabPane tab="FREELANCE" key="3">
          <TableFreelance columns={columns} data={listFreelancer} load={loading} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ManageUsers;
