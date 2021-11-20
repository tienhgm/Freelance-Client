import JobItem from 'components/JobItem';
import { Select, Pagination, Skeleton } from 'antd';
import './styles.scss';
import Sidebar from 'components/Sidebar';
import { useAppDispatch } from 'app/hooks';
import { handleGetJobs } from 'app/slices/jobSlice';
import { useEffect, useState } from 'react';
const sortByItems = [
  { value: 1, label: 'Relevance' },
  { value: 2, label: 'Newest' },
  { value: 3, label: 'Oldest' },
  { value: 4, label: 'Random' },
];

const { Option } = Select;

export default function FindJobs() {
  const dispatch = useAppDispatch();
  const [listJobs, setListJobs] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<any>();
  const [loading, setLoading] = useState(false);
  const handleGetListJob = async (filters: any) => {
    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetJobs(filters));
      if (payload) {
        const { totalRecords, jobs } = payload;
        setTotal(totalRecords);
        setListJobs(jobs);
      }
    } catch (error) {
    } finally {
      setTimeout(function(){ setLoading(false)}, 1000)
    }
  };
  const handleGetSideBar = async (values: any) => {
    setFilters(values);
  };
  const handleChangePage = (value: any) => {
    setPage(value);
  };
  useEffect(() => {
    let listFilter = { ...filters, page: page };
    listFilter.status = 'Inprogress';
    handleGetListJob(listFilter);
  }, [filters, page]);
  return (
    <div className="flex flex-col find-job-page sm:flex-row">
      <div
        className="flex-shrink-0 w-full p-8 pb-0 overflow-y-auto find-job-page__sidebar md:w-60 lg:w-72"
        style={{ backgroundColor: '#fff', boxShadow: `0 0 4px rgba(0, 0, 0, 0.2)` }}
      >
        <Sidebar handleGetSideBar={handleGetSideBar} />
      </div>
      <div className="w-full p-6 overflow-y-auto find-job-page__content">
        <div className="flex items-center justify-between px-4 py-2 mb-5 bg-gray-300 rounded-md content__header">
          <h2 className="font-normal header__title">Search Results</h2>
          <div className="header__filter">
            <span>Sort by:</span>
            <Select labelInValue defaultValue={sortByItems[0]} style={{ width: 120 }} className="select-footer">
              {sortByItems.map((item) => (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <div>
          {listJobs.length > 0 ? (
            <div className="grid flex-grow grid-cols-1 gap-5 transition-all content__list-items lg:grid-cols-2 ">
              {listJobs.map((job: any) => (
                <JobItem
                  key={job.id}
                  id={job.id}
                  company={job.company && job.company.name}
                  companyLogo={job.company && `http://${job.company.logo}`}
                  jobTitle={job.title}
                  location={job.area && job.area.name}
                  jobType={job.workMode}
                  salary={job.salary}
                  postTime={job.createdAt}
                  startDate={job.startDate}
                  endDate={job.endDate}
                  loading={loading}
                />
              ))}
            </div>
          ) : (
            <>
              {!loading ? (
                <div className="ml-2 text-2xl font-bold">'No result... Please input again!'</div>
              ) : (
                <div className="grid flex-grow grid-cols-1 gap-5 transition-all content__list-items lg:grid-cols-2 ">
                  {Array(10).fill(0).map((item: any) => (
                      <Skeleton active />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex justify-center mt-8 find-job-page__paginate">
          <Pagination
            showSizeChanger={false}
            defaultCurrent={page}
            total={total}
            onChange={handleChangePage}
            responsive={true}
          />
        </div>
      </div>
    </div>
  );
}
