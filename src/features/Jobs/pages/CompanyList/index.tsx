import { useEffect, useState } from 'react';
import './index.scss';
import CompanyItem from './Components/CompanyItem';
import { useAppDispatch } from 'app/hooks';
import { handleGetCompanies } from 'app/slices/companySlice';
import { useHistory, useLocation } from 'react-router';
import { Skeleton } from 'antd';
const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export default function BrowseCompanies() {
  const [filter, setFilter] = useState('A');
  const [listCompanies, setListCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const goToDetail = (id: any) => {
    history.push(`${location.pathname}/${id}`);
  };
  const dispatch = useAppDispatch();
  const getListCompanies = async () => {
    let finalFilter = { character: filter.toLowerCase(), page: 1 };
    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetCompanies(finalFilter));
      if (payload) {
        setListCompanies(payload);
      }
    } catch (error) {
    } finally {
      setTimeout(function(){ setLoading(false)}, 400)
    }
  };
  useEffect(() => {
    document.querySelector('.header > div > ul > li:nth-child(2) > a')?.classList.add('active');
    return () => {
      document.querySelector('.header > div > ul > li:nth-child(2) > a')?.classList.remove('active');
    }
  }, [history.location.pathname]);
  useEffect(() => {
    getListCompanies();
    return () => {
      setListCompanies([]);
    }
  }, [filter]);
  return (
    <div className="container companies">
      <div className="mb-10 companies__header">
        <div className="my-10 text-3xl">
          <h2 className="font-normal">Browse Companies</h2>
        </div>
        <div className="companies__filters">
          <ul className="flex flex-wrap justify-center w-full gap-1 py-3 bg-gray-200 rounded-md">
            {alphabet.map((value, key) => (
              <li
                key={key}
                className="text-gray-600 transition-all rounded-md cursor-pointer hover:bg-gray-900 hover:text-white"
              >
                <div
                  className={`w-12 h-12 text-xl flex transition-all rounded-md  ${
                    value === filter ? 'bg-blue-600 text-white' : ''
                  }`}
                  onClick={() => {
                    setFilter(value);
                  }}
                >
                  <span className="m-auto">{value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container companies__list">
        <ul className="grid flex-grow grid-cols-1 transition-all gap-7 content__list-items lg:grid-cols-2 xl:grid-cols-3">
          {listCompanies.map((item: any) => (
            <Skeleton active loading={loading} key={item.id}>
              <li className="transition-all cursor-pointer" key={item.id} onClick={() => goToDetail(item.id)}>
                <CompanyItem
                  key={item.id}
                  ratingPoint={item.stars}
                  // companyLogo={'https://www.vasterad.com/themes/hireo/images/browse-companies-02.png'}
                  companyLogo={`http://${item.logo}`}
                  companyName={item.name}
                />
              </li>
            </Skeleton>
          ))}
        </ul>
      </div>
    </div>
  );
}
