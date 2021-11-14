import { useState } from 'react';
import React from 'react';
import './index.scss';
import CompanyItem from './Components/CompanyItems';
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
  const [filter, setFilter] = useState(1);
  return (
    <div className="companies container">
      <div className="companies__header mb-10">
        <div className="my-10 text-3xl">
          <h2 className="font-normal">Browse Companies</h2>
        </div>
        <div className="companies__filters">
          <ul className="flex w-full justify-center gap-1 bg-gray-200 py-3 rounded-md flex-wrap">
            {alphabet.map((value, key) => (
              <li
                key={key}
                className="transition-all text-gray-600 hover:bg-gray-900 hover:text-white rounded-md cursor-pointer"
              >
                <div
                  className={`w-12 h-12 text-xl flex transition-all rounded-md  ${
                    key === filter ? 'bg-blue-600 text-white' : ''
                  }`}
                  onClick={() => {
                    setFilter(key);
                  }}
                >
                  <span className="m-auto">{value}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="companies__list container">
        <ul className="grid flex-grow grid-cols-1 gap-7 transition-all content__list-items lg:grid-cols-2 xl:grid-cols-3">
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((i, key) => (
            <li key={key} className="transition-all">
              <CompanyItem
                ratingPoint={3.5}
                companyLogo={'https://www.vasterad.com/themes/hireo/images/browse-companies-02.png'}
                companyName={'Acue'}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
