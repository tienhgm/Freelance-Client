import Sidebar from 'components/Sidebar';
import { Pagination, Row, Col, Skeleton } from 'antd';
import './index.scss';
import Freelancer from 'features/Freelancers/components/Freelancer';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'app/hooks';
import { handleGetListFreelancer } from 'app/slices/userSlice';
import { useHistory } from 'react-router-dom';

function FindFreelancer() {
  const dispatch = useAppDispatch();

  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [listFreelancer, setListFreelancer] = useState<any>([]);
  const [filters, setFilters] = useState<any>();
  const [page, setPage] = useState(1);
  const handleGetSideBar = async (values: any) => {
    setFilters(values);
  };
  const handleChangePage = (value: number) => {
    setPage(value);
  };

  const handleGetListFreelancers = async (listFilters: any) => {
    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetListFreelancer(listFilters));
      if (payload) {
        const { totalRecords, users } = payload;
        setTotal(totalRecords);
        setListFreelancer(users);
      }
    } catch (error) {
    } finally {
      setTimeout(function () {
        setLoading(false);
      }, 500);
    }
  };
  const history = useHistory();
  useEffect(() => {
    document.querySelector('.header > div > ul > li:nth-child(4) > a')?.classList.add('active');
    return () => {
      document.querySelector('.header > div > ul > li:nth-child(4) > a')?.classList.remove('active');
    };
  }, [history.location.pathname]);
  useEffect(() => {
    let listFilter = { ...filters, page: page };
    listFilter.role = 2;
    listFilter.records = 9;
    handleGetListFreelancers(listFilter);
  }, [filters, page]);
  return (
    <div className="flex flex-col FindFreelancer find-job-page sm:flex-row">
      <div
        className="box-border flex-shrink-0 p-8 pb-0 overflow-y-auto FindFreelancer__sidebar w-52 md:w-60 lg:w-72"
        style={{ backgroundColor: '#fff', boxShadow: `0 0 4px rgba(0, 0, 0, 0.2)` }}
      >
        <Sidebar handleGetSideBar={handleGetSideBar} />
      </div>
      <div className="w-full p-8 overflow-y-auto FindFreelancer__list">
        <div className="flex items-center justify-between px-4 py-2 mb-5 bg-gray-300 rounded-md content__header">
          <h2 className="font-normal header__title">Search Results</h2>
          <div className="header__filter"></div>
        </div>
        {/* listFreelancer */}
        <div className="flex-1 mr-1">
          {listFreelancer.length > 0 ? (
            <Row gutter={{ md: 16, lg: 24 }}>
              {listFreelancer.map((freelancer: any) => (
                <Col className="mb-4 gutter-row" md={24} lg={12} xl={8} key={freelancer.id}>
                  <Skeleton active loading={loading}>
                    <Freelancer
                      key={freelancer.id}
                      id={freelancer.id}
                      avatar={freelancer.avatar}
                      rate={freelancer.rate}
                      firstName={freelancer.firstName}
                      lastName={freelancer.lastName}
                      briefIntroduce={freelancer.briefIntroduce}
                      area={freelancer.area}
                      country={freelancer.country}
                      skills={freelancer.skills}
                    />
                  </Skeleton>
                </Col>
              ))}
            </Row>
          ) : (
            <>
              {!loading ? (
                <div className="ml-2 text-2xl font-bold">'No result... Please input again!'</div>
              ) : (
                <Row gutter={{ md: 16, lg: 24 }}>
                  {Array(10)
                    .fill(0)
                    .map((item: any) => (
                      <Col className="mb-4 gutter-row" md={24} lg={12} xl={8} key={Math.random()}>
                        <Skeleton active />
                      </Col>
                    ))}
                </Row>
              )}
            </>
          )}
        </div>
        <div className="flex justify-center mt-8 find-job-page__paginate">
          {!loading && listFreelancer.length > 0 && (
            <Pagination
              showSizeChanger={false}
              defaultCurrent={page}
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

export default FindFreelancer;
