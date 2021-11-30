import './index.scss';
import {
  CheckSquareOutlined,
  DeleteOutlined,
  CalendarOutlined,
  EditOutlined,
  TeamOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Tooltip, Button, Tag, Badge, Pagination, Input, Select, Skeleton } from 'antd';
import { useHistory } from 'react-router-dom';
import Popup from 'components/PopupConfirm';
import { useEffect, useState } from 'react';
import { listStatusJob } from 'utils/enum';
import { useAppDispatch } from 'app/hooks';
import { handleGetArea } from 'app/slices/resourceSlice';
import { handleGetListJobManage } from 'app/slices/companySlice';
import { filter } from '@antv/util';
const { Option } = Select;
export default function ListJobs() {
  const [title, setTitle] = useState<any>('');
  const [statusJob, setStatusJob] = useState<any>('');
  const [listArea, setListArea] = useState<any>([]);
  const [areaId, setAreaId] = useState();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listJobs, setListJobs] = useState<any>([]);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const goToDetail = () => {
    history.push('/dashboard/jobs-manage/1');
  };
  const goToEdit = () => {
    history.push('/dashboard/jobs-manage/edit/1');
  };
  const handleDeleteJob = () => {
    setOpenDialogConfirm(false);
  };
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const handleOpenDialogConfirm = () => {
    setOpenDialogConfirm(true);
  };
  const getArea = async () => {
    const { payload } = await dispatch(handleGetArea());
    setListArea(payload);
  };
  const searchByName = (value: any) => {
    setTitle(value);
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
  useEffect(() => {
    getArea();
  }, []);
  const handleGetJobManage = async (title?: string, statusJob?: any, areaId?: any) => {
    const id = '8c1fb494-662c-469a-b9ab-42d857193692';
    let filters: any = {
      title,
      status: statusJob,
      areaId,
      page: page,
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
    handleGetJobManage(title, statusJob, areaId);
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
              <Input
                style={{ width: 220 }}
                prefix={<SearchOutlined />}
                placeholder="Job name"
                onChange={searchByName}
              />
            </div>
            <div>
              <Select placeholder="Status" allowClear style={{ width: 150 }} onChange={chooseStatus}>
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
            <Skeleton active loading={loading}>
              <div className="box" key={item.id}>
                <div className="h-36 box__item">
                  {/* left */}
                  <div className="flex flex-col">
                    <div className="flex gap-3">
                      <div className="text-xl cursor-pointer">Nadoshiki organization</div>
                      <div>
                        <Tag color="#87d068">Doned</Tag>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-2">
                      <div className="flex items-center gap-2 box__item__content">
                        <CalendarOutlined /> Posted on 10 July, 2021
                      </div>
                    </div>
                    <div className="mt-4">
                      <Badge count={5}>
                        <Button type="primary" onClick={goToDetail}>
                          <TeamOutlined className="mb-1" />
                          Manage candidate
                        </Button>
                      </Badge>
                    </div>
                  </div>

                  {/* end left */}
                  {/* right */}
                  <div className="flex gap-3">
                    <div className="cursor-pointer btn btn__edit" onClick={goToEdit}>
                      <Tooltip placement="bottom" title="Edit">
                        <EditOutlined />
                      </Tooltip>
                    </div>
                    <div className="cursor-pointer btn btn__delete" onClick={handleOpenDialogConfirm}>
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
        showSizeChanger={false}
        defaultCurrent={page}
        total={total}
        onChange={handleChangePage}
        responsive={true}
      />
    </div>
  );
}
