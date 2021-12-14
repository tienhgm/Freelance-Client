import JobItem from 'components/JobItem';
import { Pagination, Skeleton } from 'antd';
import './styles.scss';
import Sidebar from 'components/Sidebar';
import { useAppDispatch } from 'app/hooks';
import { handleGetJobs } from 'app/slices/jobSlice';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
export default function FindJobs() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [listJobs, setListJobs] = useState<any>([]);
  const [page, setPage] = useState<any>(queryString.parse(location.search).page ? queryString.parse(location.search).page : 1);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<any>({
    title: queryString.parse(location.search).title ? queryString.parse(location.search).title : null,
    salary: queryString.parse(location.search).salary ? queryString.parse(location.search).salary : null,
    areaId: queryString.parse(location.search).areaId ? queryString.parse(location.search).areaId : null,
    workMode: queryString.parse(location.search).workMode ? queryString.parse(location.search).workMode : null,
    skillIds: queryString.parse(location.search).skillIds ? queryString.parse(location.search).skillIds : [],
  });
  const [loading, setLoading] = useState(false);
  const handleGetListJob = async (filters: any) => {
    try {
      for (const key in filters) {
        if (filters[key] === undefined || filters[key] === null || filters[key] === '' || filters[key] === []) {
          delete filters[key];
        }
      }
      history.push({ pathname: '/find-jobs', search: queryString.stringify(filters) });
      setLoading(true);
      const { payload } = await dispatch(handleGetJobs(filters));
      if (payload) {
        const { totalRecords, jobs } = payload;
        setTotal(totalRecords);
        setListJobs(jobs);
      }
    } catch (error) {
    } finally {
      setTimeout(function () {
        setLoading(false);
      }, 200);
    }
  };
  const handleGetSideBar = async (values: any) => {
    setFilters(values);
  };
  const handleChangePage = (value: number) => {
    setPage(value);
  };
  const history = useHistory();
  useEffect(() => {
    document.querySelector('.header > div > ul > li:nth-child(3) > a')?.classList.add('active');
    return () => {
      document.querySelector('.header > div > ul > li:nth-child(3) > a')?.classList.remove('active');
    };
  }, [history.location.pathname]);
  useEffect(() => {
    let listFilter = { ...filters, page: page };
    listFilter.statuses = ['Inprogress', 'Await'];
    handleGetListJob(listFilter);
    return () => {
      setListJobs([]);
      setTotal(0);
    };
  }, [filters, page]);
  return (
    <div className="flex flex-col find-job-page sm:flex-row">
      <div
        className="flex-shrink-0 w-full p-8 pb-0 overflow-y-auto find-job-page__sidebar md:w-60 lg:w-72"
        style={{ backgroundColor: '#fff', boxShadow: `0 0 4px rgba(0, 0, 0, 0.2)` }}
      >
        <Sidebar filters={filters} handleGetSideBar={handleGetSideBar} />
      </div>
      <div className="w-full p-6 overflow-y-auto find-job-page__content">
        <div className="flex items-center justify-between px-4 py-2 mb-5 bg-gray-300 rounded-md content__header">
          <h2 className="font-normal header__title">Search Results</h2>
        </div>
        <div>
          {listJobs.length > 0 ? (
            <div className="grid flex-grow grid-cols-1 gap-5 transition-all content__list-items lg:grid-cols-2">
              {listJobs.map((job: any) => (
                <JobItem
                  key={job.id}
                  id={job.id}
                  skills={job.skills}
                  company={job.company && job.company.name}
                  companyLogo={job.company && `http://${job.company.logo}`}
                  jobTitle={job.title}
                  location={job.area && job.area.name}
                  jobType={job.workMode}
                  salary={job.salary}
                  postTime={job.createdAt}
                  startDate={job.startDate}
                  endDate={job.endDate}
                  level={job.experience}
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
                  {Array(10)
                    .fill(0)
                    .map((item: any) => (
                      <Skeleton active key={Math.random()} />
                    ))}
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex justify-center mt-8 find-job-page__paginate">
          {!loading && listJobs.length > 0 && (
            <Pagination
              showSizeChanger={false}
              defaultCurrent={+page}
              total={total}
              onChange={handleChangePage}
              responsive={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
