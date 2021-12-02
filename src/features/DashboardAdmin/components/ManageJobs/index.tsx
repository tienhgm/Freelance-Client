import { useEffect, useState, useRef } from 'react';
import TableJobs from './components/TableJobs';
import { Pagination, Select, Input, Space, DatePicker, Button } from 'antd';
import { useAppDispatch } from 'app/hooks';
import { handleGetJobs } from 'app/slices/adminSlice';

const { Option } = Select;
const { Search } = Input;

function ManageJobs() {
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
  };

  const handleSelectStatus = (value: any) => {
    setFilters((prev: any) => {
      return {
        ...prev,
        status: value,
      };
    });
  };

  const handleSearchName = (value: any) => {
    setFilters((prev: any) => {
      return {
        ...prev,
        title: value,
      };
    });
  };

  const handleStartDate = (dateString: any) => {
    setFilters((prev: any) => {
      return {
        ...prev,
        startDate: dateString,
      };
    });
  };

  const handleEndDate = (dateString: any) => {
    setFilters((prev: any) => {
      return {
        ...prev,
        endDate: dateString,
      };
    });
  };

  const handleReset = () => {
    setFilters((prev: any) => {
      return {
        ...prev,
        endDate: null,
        startDate: null,
        title: '',
        status: '',
      };
    });
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
      className="manage-users w-full p-6 shadow-xl bg-white overflow-y-auto"
      style={{ height: 'calc(100vh - 112px)' }}
    >
      <div className="flex items-center justify-between -mt-2">
        <div className="mb-3 text-xl font-medium">Manage Jobs</div>
        <div className="-mt-3">
          <Space>
            <Search placeholder="Search name" allowClear onSearch={handleSearchName} style={{ width: 200 }} />
            <Select style={{ width: 120 }} onChange={handleSelectStatus} placeholder="Status" allowClear>
              <Option value="Inprogress">Inprogress</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Await">Await</Option>
              <Option value="Done">Doned</Option>
              <Option value="Cancel">Cancel</Option>
            </Select>
            <DatePicker onChange={handleStartDate} placeholder="Start Date" />
            <DatePicker onChange={handleEndDate} placeholder="End Date" />
            <Button type="primary" onClick={handleReset}>
              Reset
            </Button>
          </Space>
        </div>
      </div>
      <TableJobs data={data} />
      <Pagination
        className="-mt-6"
        defaultCurrent={page}
        total={total}
        onChange={handleChangePage}
        responsive={true}
        showSizeChanger
      />
    </div>
  );
}

export default ManageJobs;
