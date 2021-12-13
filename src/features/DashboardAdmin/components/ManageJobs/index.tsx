import { useEffect, useState, useRef } from 'react';
import TableJobs from './components/TableJobs';
import { Pagination, Select, Input, Space, DatePicker, Button } from 'antd';
import { useAppDispatch } from 'app/hooks';
import { handleGetJobs } from 'app/slices/adminSlice';
import { listStatusJob } from 'utils/enum';
import moment from 'moment';

const { Option } = Select;
const { Search } = Input;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

function ManageJobs() {
  const [loading, setLoading] = useState<any>(true);
  const dispatch = useAppDispatch();
  const [listJobs, setListJobs] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<any>([]);

  const handleGetListJob = async (filters: any) => {
    try {
      const { payload } = await dispatch(handleGetJobs(filters));
      if (payload) {
        const { totalRecords, jobs } = payload;
        setTotal(totalRecords);
        setListJobs(jobs);
        setLoading(false);
      }
    } catch (error) {}
  };

  useEffect(() => {
    let listFilter = { ...filters, page };
    handleGetListJob(listFilter);
  }, [filters, page]);

  const handleChangePage = (value: any, pageSize: any) => {
    setPage(() => {
      return value ? value : page;
    });
    setFilters((prev: any) => {
      return {
        ...prev,
        records: pageSize,
      };
    });
    setLoading(true);
  };

  const chooseStatus = (value: any) => {

    setFilters((prev: any) => {
      return {
        ...prev,
        statuses: value,
      };
    });
    setLoading(true);
  };

  const handleSearchName = (value: any) => {
    setFilters((prev: any) => {
      return {
        ...prev,
        title: value,
      };
    });
    setLoading(true);
  };

  const handleSearchDate = (value: any, dateString: any) => {
    console.log('Formatted Selected Time: ', dateString);

    setFilters((prev: any) => {
      return {
        ...prev,
        startDateBegin: dateString[0],
        startDateEnd: dateString[1],
      };
    });
    setLoading(true);
  };



  const data: any = [];
  // eslint-disable-next-line array-callback-return
  listJobs.map((job: any) => {
    data.push({
      key: job.id,
      name: job.title,
      companyName: job.company.name,
      experience: job.experience,
      salary: `$${job.salary}`,
      location: job.area.name,
      workMode: job.workMode,
      businessFields: job.businessFields.map((item: any) => {
        return `${item.name},`;
      }),
      status: job.status,
      skills: job.skills.map((item: any) => {
        return `${item.name},`;
      }),
      startDate: job.startDate,
      endDate: job.endDate,
    });
  });

  return (
    <div
      className="manage-jobs w-full p-6 shadow-xl bg-white overflow-y-auto"
      style={{ height: 'calc(100vh - 112px)' }}
    >
      <div className="flex items-center justify-between -mt-2">
        <div className="mb-3 text-xl font-medium">Manage Jobs</div>
        <div className="-mt-3">
          <Space>
            
            <Search placeholder="Search name" allowClear onSearch={handleSearchName} style={{ width: 200 }} />
            <Select placeholder="Status" allowClear style={{ width: 120 }} onChange={chooseStatus}>
              {listStatusJob.map((item) => (
                <Option value={item} key={Math.random()}>
                  {item}
                </Option>
              ))}
            </Select>
            <RangePicker format={dateFormat} onChange={handleSearchDate}  />
          </Space>
        </div>
      </div>
      <TableJobs data={data} load={loading} />

      <Pagination
        className="-mt-6"
        current={page}
        total={total}
        onChange={handleChangePage}
        responsive={true}
        showSizeChanger
      />
    </div>
  );
}

export default ManageJobs;
