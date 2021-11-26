import { EnvironmentOutlined, StarFilled } from '@ant-design/icons';
import './index.scss';
import FreelancerItemProps from 'types/freelancerItemProps';
import { useHistory } from 'react-router';
import routesConfiguration from 'routers/routesConfig';

function Freelancer({ avatar, rate, country, name, briefIntroduce, area, skills }: FreelancerItemProps) {
  const history = useHistory();
  const gotoFreelancerProfile = () => {
    history.push(routesConfiguration.freelancerDetails.cPath + '1');
  };

  return (
    <div className="flex flex-col transition freelancer">
      <div className="flex flex-wrap items-center flex-grow freelancer__overview">
        <div className="flex-1">
          <div className="freelancer__avatar">
            <img src={`http://${avatar}`} alt={avatar} />
          </div>
          <div className="mt-4 freelancer__name">
            <h4>{name}</h4>
            <span>{briefIntroduce}</span>
          </div>
          <div className="mt-4 freelancer__name">
            <h5>
              {country.name} <span>{country.emoji}</span>
            </h5>
          </div>
          <div>{briefIntroduce}</div>
          <div className="mt-1 freelancer__rating">
            <span className="mr-2 point">{rate}</span>
            <span className="star">
              {Array(Math.floor(rate))
                .fill(0)
                .map((item: any) => (
                  <StarFilled key={Math.random()} />
                ))}
            </span>
          </div>
          <div className="mt-4 freelancer__skills">
            {skills.map((item: any) => (
              <div className="item" key={item.id}>{item.name}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="freelancer__details">
        <div className="flex justify-center info">
          <ul>
            <li className="relative">
              <strong>
                <EnvironmentOutlined className="relative -top-1" /> {area.name}
              </strong>
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
