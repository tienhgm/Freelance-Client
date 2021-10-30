import { EnvironmentOutlined, StarFilled } from "@ant-design/icons";
import "./index.scss";

Freelancer.propTypes = {};

function Freelancer() {
  return (
    <div className="flex flex-col transition freelancer">
      <div className="flex flex-wrap items-center flex-grow freelancer__overview">
        <div className="flex-1">
          {/* avata */}
          <div className="freelancer__avatar">
            <a href="/123">
              <img
                src="https://www.vasterad.com/themes/hireo/images/user-avatar-big-03.jpg"
                alt="avatar"
              />
            </a>
          </div>
          {/* name */}
          <div className="mt-4 freelancer__name">
            <h4>
              <a href="/123">
                Sindy Forest{" "}
                <img
                  className="ml-1 flag"
                  src="https://www.vasterad.com/themes/hireo/images/flags/au.svg"
                  alt=""
                />
              </a>
            </h4>
            <span>Magento Certified Developer</span>
          </div>
          {/* rating */}
          <div className="mt-1 freelancer__rating">
            <span className="mr-2 point">5.0</span>
            <span className="star">
              <StarFilled />
            </span>
            <span className="star">
              <StarFilled />
            </span>
            <span className="star">
              <StarFilled />
            </span>
            <span className="star">
              <StarFilled />
            </span>
            <span className="star">
              <StarFilled />
            </span>
          </div>
        </div>
      </div>

      <div className="freelancer__details">
        <div className="info">
          <ul>
            <li className="relative">
              Location
              <strong>
                <EnvironmentOutlined className="relative -top-1" /> Brisbane
              </strong>
            </li>
            <li>
              Rate
              <strong>$70 / hr</strong>
            </li>
            <li>
              Job Success
              <strong>100%</strong>
            </li>
          </ul>
        </div>

        <a href="/123">
          <button className="view-profile">View Profile</button>
        </a>
      </div>
    </div>
  );
}

export default Freelancer;
