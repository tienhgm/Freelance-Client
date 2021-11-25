import { EnvironmentOutlined, StarFilled } from '@ant-design/icons';
import './index.scss';
import FreelancerItemProps from 'types/freelancerItemProps';
import { useHistory } from 'react-router';
import routesConfiguration from 'routers/routesConfig';

function Freelancer({ avatar, nationality, name, jobTitle, rating, location }: FreelancerItemProps) {
  const history = useHistory();
  const gotoFreelancerProfile = () => {
    history.push(routesConfiguration.freelancerDetails.cPath + '1');
  };

  return (
    <div className="flex flex-col transition freelancer">
      <div className="flex flex-wrap items-center flex-grow freelancer__overview">
        <div className="flex-1">
          {/* avata */}
          <div className="freelancer__avatar">
            <img src={avatar} alt={name} />
          </div>
          {/* name */}
          <div className="mt-4 freelancer__name">
            {/* <h4>
              {name} <img className="ml-1 flag" src={nationality} alt={location} />
            </h4> */}
            <span>{jobTitle}</span>
          </div>
          {/* rating */}
          <div className="mt-1 freelancer__rating">
            <span className="mr-2 point">{rating}.0</span>

            <span className="star">
              {[...Array(rating)].map((x, i) => (
                <StarFilled key={i} />
              ))}
            </span>
          </div>
        </div>
      </div>

      <div className="freelancer__details">
        <div className="flex justify-center info">
          <ul>
            <li className="relative">
              Location
              <strong>
                <EnvironmentOutlined className="relative -top-1" /> {location}
              </strong>
            </li>
            <li>
              Level
              <strong>Senior</strong>
            </li>
          </ul>
        </div>

        <button className="view-profile" onClick={gotoFreelancerProfile}>
          View Profile
        </button>
      </div>
    </div>
  );
}

export default Freelancer;
