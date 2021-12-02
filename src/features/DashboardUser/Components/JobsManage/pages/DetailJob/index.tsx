import './index.scss';
import { DeleteOutlined, MailOutlined, PhoneOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Tooltip, Rate, Tabs, Pagination, Input } from 'antd';
import avatarDefault from 'assets/images/user-avatar-placeholder.png';
import TableDetail from './components/table';
import { handleGetJobCandidates } from 'app/slices/jobSlice';
import { useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'app/hooks';
const { TabPane } = Tabs;
export default function DetailJob() {
  const [key, setKey] = useState('1');
  function callback(key: string) {
    setKey(key);
  }
  const [listJobCandidates, setListJobCandidates] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<any>({
    name: '',
    applyStatus: '',
    appliedAt: null,
  });
  const [loading, setLoading] = useState(false);
  const match = useRouteMatch<any>();
  let jobId = match.params.id;
  const dispatch = useAppDispatch();
  const getListCandidates = async (jobId: string) => {
    let listFilter = { ...filters, page: 1 };
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
  const handleSearchName = (e: any) => {
    setFilters((prev: any) => ({ ...prev, name: e.target.value }));
  };
  useEffect(() => {
    if (key === '2') {
      getListCandidates(jobId);
    }
  }, [jobId, key, filters]);
  return (
    <div className="h-full candidate-manage">
      <h1 className="text-2xl">Jobs {'>'} ...</h1>
      <div className="candidate">
        <div>
          <div className="flex justify-end px-6">
            <div style={{ width: 'calc(160px)' }}>
              <Input value={filters.name} onChange={handleSearchName} placeholder="Search by name..." />
            </div>
          </div>
          <Tabs size="large" defaultActiveKey="1" onChange={callback}>
            <TabPane tab="List employees" key="1">
              <div className="box">
                <div className="h-32 box__item">
                  {/* left */}
                  <div className="flex items-center">
                    <img
                      src={avatarDefault}
                      style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                      alt="avatar"
                    />
                    <div className="flex flex-col ml-4">
                      <div className="text-lg cursor-pointer box__item__title">Bilingual Event Support Speciallist</div>
                      <div className="box__item__content">IOS Developer</div>
                      <div className="flex gap-3 box__item__content">
                        <div className="flex items-center gap-2">
                          <MailOutlined /> sindy@example.com{' '}
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneOutlined /> (+61) 123-456-789{' '}
                        </div>
                      </div>

                      <div>
                        <Rate disabled defaultValue={2} />
                      </div>
                    </div>
                  </div>
                  {/* end left */}
                  {/* right */}
                  <div className="flex gap-1">
                    <div className="cursor-pointer btn btn__download">
                      <Tooltip placement="bottom" title="Accept">
                        <PlusCircleOutlined />
                      </Tooltip>
                    </div>
                    <div className="cursor-pointer btn btn__message">
                      <Tooltip placement="bottom" title="Message">
                        <MailOutlined />
                      </Tooltip>
                    </div>
                    <div className="cursor-pointer btn btn__delete">
                      <Tooltip placement="bottom" title="Reject">
                        <DeleteOutlined />
                      </Tooltip>
                    </div>
                  </div>
                  {/* end right */}
                </div>
              </div>
            </TabPane>
            <TabPane tab="List candidates" key="2">
              <TableDetail data={listJobCandidates} loading={loading} />
            </TabPane>
          </Tabs>
          <Pagination className="mt-4" defaultCurrent={page} total={50} />
        </div>
      </div>
    </div>
  );
}
