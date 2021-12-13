import './index.scss';
import { Link } from 'react-router-dom';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';

export default function FeatureCity() {
  return (
    <div className="city">
      <ScrollOverPack className="container">
        <QueueAnim height={500} key="text" duration={1000} type="bottom" leaveReverse>
          <h5 key="h5" className="title">
            Featured Cities
          </h5>
          <div key="div" className="flex flex-wrap justify-center gap-3 mt-6 px-36">
            <Link
              key="image"
              to="/find-jobs?areaId=3791"
              className="city__box"
              style={{
                backgroundImage: `url("https://www.vasterad.com/themes/hireo/images/featured-city-04.jpg")`,
              }}
            >
              <div className="total">
                <div className="total__location">Bac Ninh</div>
                {/* <div className="total__job">456 Jobs</div> */}
              </div>
            </Link>
            <Link
              key="image"
              to="/find-jobs?areaId=3811"
              className="city__box"
              style={{
                backgroundImage: `url("https://www.vasterad.com/themes/hireo/images/featured-city-03.jpg")`,
              }}
            >
              <div className="total">
                <div className="total__location">Ho Chi Minh</div>
                {/* <div className="total__job">689 Jobs</div> */}
              </div>
            </Link>
            <Link
              key="image"
              to="/find-jobs?areaId=3810"
              className="city__box"
              style={{
                backgroundImage: `url("https://www.vasterad.com/themes/hireo/images/featured-city-01.jpg")`,
              }}
            >
              <div className="total">
                <div className="total__location">Ha Noi</div>
                {/* <div className="total__job">852 Jobs</div> */}
              </div>
            </Link>
            <Link
              key="image"
              to="/find-jobs?areaId=3806"
              className="city__box"
              style={{
                backgroundImage: `url("https://www.vasterad.com/themes/hireo/images/featured-city-02.jpg")`,
              }}
            >
              <div className="total">
                <div className="total__location">Da Nang</div>
                {/* <div className="total__job">123 Jobs</div> */}
              </div>
            </Link>
          </div>
        </QueueAnim>
      </ScrollOverPack>
    </div>
  );
}
// https://www.vasterad.com/themes/hireo/images/featured-city-04.jpg
