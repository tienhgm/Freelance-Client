import React, { useMemo } from 'react';

export default function CompanyItem({
  companyLogo,
  companyName,
  ratingPoint,
}: {
  companyLogo: string;
  companyName: string;
  ratingPoint: number;
}) {
  const ratingStar = useMemo(() => {
    let stars: string[] = [];
    for (let i = 0; i < 5; i++) {
      if (ratingPoint - i > 0.5) {
        stars.push('bx bxs-star');
      } else if (ratingPoint - i <= 0) {
        stars.push('bx bx-star');
      } else {
        stars.push('bx bxs-star-half');
      }
    }
    return stars;
  }, [ratingPoint]);
  return (
    <div className="flex flex-col items-center justify-between shadow-md py-16 pt-12">
      <div className="company__logo flex items-center h-16 object-contain">
        <img
          src={companyLogo || 'https://www.vasterad.com/themes/hireo/images/browse-companies-02.png'}
          alt={companyName}
        />
      </div>
      <div className="company__name flex items-center">
        <h4 className="text-center text-lg">{companyName} </h4>
      </div>
      <div className="company_ratting flex items-center text-sm">
        <div className="ratting-point flex font-bold text-white py-1 px-2 mx-2 bg-yellow-300 rounded-md">
          <span className="m-auto">{ratingPoint}</span>
        </div>
        <div className="ratting-star text-lg text-yellow-300">
          {ratingStar.map((className, key) => {
            return <i key={key} className={className} />;
          })}
        </div>
      </div>
    </div>
  );
}
