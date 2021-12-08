import "./index.scss";
import { Link } from "react-router-dom";
export default function FeatureCity() {
  return (
    <div className="city">
      <div className="title">Featured Cities</div>
      <div className="flex flex-wrap justify-center gap-3 mt-6 px-36">
        <Link
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
    </div>
  );
}
// https://www.vasterad.com/themes/hireo/images/featured-city-04.jpg
