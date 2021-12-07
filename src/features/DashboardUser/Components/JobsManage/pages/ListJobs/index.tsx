import './index.scss';
import {
  CheckSquareOutlined,
  DeleteOutlined,
  CalendarOutlined,
  EditOutlined,
  TeamOutlined,
  SearchOutlined,
  WalletOutlined,
  ProjectOutlined,
  UserAddOutlined,
  UndoOutlined,
} from '@ant-design/icons';
import { Tooltip, Button, Tag, Badge, Pagination, Input, Select, Skeleton } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import Popup from 'components/PopupConfirm';
import { useEffect, useState } from 'react';
import { listStatusJob } from 'utils/enum';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { handleGetArea } from 'app/slices/resourceSlice';
import { handleGetListJobManage } from 'app/slices/companySlice';
import { formatDateMonth } from 'helpers/generate';
import { getJobStatus } from 'helpers/Dashboard';
import { handleDeleteAJob } from 'app/slices/jobSlice';
import queryString from 'query-string';

const { Option } = Select;
export default function ListJobs() {
  const [title, setTitle] = useState<any>('');
  const [statusJob, setStatusJob] = useState<any>();
  const [listArea, setListArea] = useState<any>([]);
  const [areaId, setAreaId] = useState<any>();
  const location = useLocation();
  const [page, setPage] = useState<any>(
    queryString.parse(location.search).page ? queryString.parse(location.search).page : 1
  );
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listJobs, setListJobs] = useState<any>([]);
  const [jobIdRow, setJobIdRow] = useState<any>();
  const curUser = useAppSelector((state) => state.user.curUser);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const goToDetailEmployee = (id: string) => {
    history.push(`/dashboard/jobs-manage/${id}?key=1`);
  };
  const goToDetailCandidate = (id: string) => {
    history.push(`/dashboard/jobs-manage/${id}?key=2`);
  };
  const goToEdit = (id: string) => {
    history.push(`/dashboard/jobs-manage/edit/${id}`);
  };
  const handleDeleteJob = async () => {
    try {
      if (jobIdRow) {
        setLoading(true);
        const { payload }: any = await dispatch(handleDeleteAJob(jobIdRow));
        if (payload.statusCode === 200) {
          setOpenDialogConfirm(false);
          setLoading(false);
        }
      }
    } catch (error) {
      setOpenDialogConfirm(false);
      setLoading(false);
    }
  };
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const handleOpenDialogConfirm = (id: string) => {
    setJobIdRow(id);
    setOpenDialogConfirm(true);
  };
  const getArea = async () => {
    const { payload } = await dispatch(handleGetArea());
    setListArea(payload);
  };
  const searchByName = (e: any) => {
    setTitle(e.target.value);
  };
  const chooseStatus = (value: any) => {
    setStatusJob(value);
  };
  const chooseArea = (value: any) => {
    setAreaId(value);
  };
  const handleChangePage = (value: number) => {
    setPage(value);
  };
  const handleGoDetailJob = (id:string) => {
    window.open(`/find-jobs/${id}`, 'blank')
  }
  useEffect(() => {
    getArea();
  }, []);
  const handleReset = () => {
    setPage(1);
    setTitle('');
    setAreaId(null);
    setStatusJob(null);
  };
  const handleGetJobManage = async (title?: string, statusJob?: any, areaId?: any, page?: number) => {
    let id = '';
    if (curUser && curUser.company) {
      id = curUser.company.id;
    }
    let filters: any = {
      title,
      status: statusJob,
      areaId,
      page,
      records: 4,
    };

    for (const key in filters) {
      if (filters[key] === undefined || filters[key] === null || filters[key] === '') {
        delete filters[key];
      }
    }
    const data = [id, filters];
    try {
      setLoading(true);
      const { payload }: any = await dispatch(handleGetListJobManage(data));
      if (payload.statusCode === 200) {
        setListJobs(payload.data.jobs);
        setTotal(payload.data.totalRecods);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  useEffect(() => {
    history.push({
      pathname: `/dashboard/jobs-manage`,
      search: `?page=${page}`,
    });
    handleGetJobManage(title, statusJob, areaId, page);
  }, [title, statusJob, areaId, page]);
  return (
    <div className="h-full jobs-manage">
      <h1 className="text-2xl">Manage Jobs</h1>
      <div className="jobs">
        <div className="flex justify-between pb-4">
          <div className="flex items-center mb-4 ">
            <CheckSquareOutlined style={{ color: '#2e3fe5' }} className="mt-1 mr-4" />
            <div className="text-lg font-medium">My Job Listings</div>
          </div>
          <div className="flex gap-2 ">
            <div>
              <Tooltip placement="bottom" title={'Reset'}>
                <Button onClick={handleReset} icon={<UndoOutlined style={{ color: '#2a41e8' }} />} />
              </Tooltip>
            </div>
            <div>
              <Input
                style={{ width: 220 }}
                prefix={<SearchOutlined />}
                placeholder="Job name"
                value={title}
                onChange={searchByName}
              />
            </div>
            <div>
              <Select placeholder="Status" allowClear style={{ width: 150 }} value={statusJob} onChange={chooseStatus}>
                {listStatusJob.map((item) => (
                  <Option value={item} key={Math.random()}>
                    {item}
                  </Option>
                ))}
              </Select>
            </div>
            <div>
              <Select
                showSearch
                filterOption={(input: any, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                filterSort={(optionA: any, optionB: any) =>
                  optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
                allowClear
                style={{ width: 150 }}
                placeholder="Select your area"
                value={areaId}
                onChange={chooseArea}
              >
                {listArea.map((item: any) => (
                  <Option value={item.id} key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        {listJobs.length > 0 &&
          listJobs.map((item: any) => (
            <Skeleton active loading={loading} key={item.id}>
              <div className="box" key={item.id}>
                <div className="h-36 box__item">
                  {/* left */}
                  <div className="flex flex-col">
                    <div className="flex gap-3">
                      <div className="text-xl cursor-pointer" onClick={() => handleGoDetailJob(item.id)}>{item.title}</div>
                      <div>{<Tag color={getJobStatus(item.status)}>{item.status}</Tag>}</div>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <div className="flex items-center gap-2 box__item__content">
                        <CalendarOutlined /> Posted on {formatDateMonth(item.createdAt)}
                      </div>
                      <div className="flex items-center gap-2 box__item__content">
                        <WalletOutlined /> ${item.salary}
                      </div>
                      <div className="flex items-center gap-2 box__item__content">
                        <ProjectOutlined /> {item.workMode}
                      </div>
                      <div className="flex items-center gap-2 box__item__content">
                        <UserAddOutlined /> {item.experience}
                      </div>
                    </div>
                    <div className="flex gap-5 mt-4">
                      <Badge count={item.totalEmployees}>
                        <Button type="ghost" onClick={() => goToDetailEmployee(item.id)}>
                          <TeamOutlined className="mb-1" />
                          Manage Employee
                        </Button>
                      </Badge>
                      <Badge count={item.totalCandidates}>
                        <Button type="primary" onClick={() => goToDetailCandidate(item.id)}>
                          <TeamOutlined className="mb-1" />
                          Manage Candidate
                        </Button>
                      </Badge>
                    </div>
                  </div>

                  {/* end left */}
                  {/* right */}
                  <div className="flex gap-3">
                    <div className="cursor-pointer btn btn__edit" onClick={() => goToEdit(item.id)}>
                      <Tooltip placement="bottom" title="Edit">
                        <EditOutlined />
                      </Tooltip>
                    </div>
                    <div className="cursor-pointer btn btn__delete" onClick={() => handleOpenDialogConfirm(item.id)}>
                      <Tooltip placement="bottom" title="Delete">
                        <DeleteOutlined />
                      </Tooltip>
                    </div>
                  </div>
                  {/* end right */}
                </div>
              </div>
            </Skeleton>
          ))}
        {listJobs.length === 0 ? (
          <>
            {loading === true ? (
              <Skeleton active paragraph={{ rows: 14, width: '100%' }}></Skeleton>
            ) : (
              <div className="text-lg font-medium">No result! Please try again...</div>
            )}
          </>
        ) : (
          ''
        )}
      </div>
      <Popup
        title="Delete Job"
        isVisible={openDialogConfirm}
        popupText="Want to delete this job?"
        handleConfirm={handleDeleteJob}
        handleCancelConfirm={() => setOpenDialogConfirm(false)}
      />
      <Pagination
        className="flex justify-center pt-4 pb-4"
        defaultCurrent={page}
        total={total}
        onChange={handleChangePage}
        responsive={true}
        pageSize={4}
      />
    </div>
  );
}
