import './index.scss';
import React, { useMemo } from 'react';

export default function ReviewItem({
  ratingPoint,
  title,
  content,
  reviewTime,
  index,
}: {
  ratingPoint: number;
  title: string;
  content: string;
  reviewTime: string;
  index: number;
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
    <div className={`flex items-center px-6 py-3 ${index % 2 === 0 ? 'bg-gray-100' : ' bg-gray-200'}`}>
      <div className="review">
        <div className="review__title">
          <h4>{title}</h4>
        </div>
        <div className="review__rating flex justify-between">
          <div className="stars text-sm flex items-center">
            <div className="rating-point font-bold flex text-white px-2 mr-2 bg-yellow-300 rounded-md">
              <span className="m-auto">{ratingPoint}</span>
            </div>
            <div className="ratting-star text-yellow-300">
              {ratingStar.map((className, key) => {
                return <i key={key} className={className} />;
              })}
            </div>
          </div>
          <div className="review-time flex items-center">
            <i className="bx bx-calendar mr-2"></i>
            {reviewTime}
          </div>
        </div>
        <div className="review__content my-3">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
