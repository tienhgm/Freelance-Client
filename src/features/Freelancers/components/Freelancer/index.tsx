import { EnvironmentOutlined, StarFilled } from '@ant-design/icons';
import './index.scss';
import FreelancerItemProps from 'types/freelancerItemProps';
import { useHistory } from 'react-router';
import { Tooltip } from 'antd';

function Freelancer({
  avatar,
  rate,
  country,
  firstName,
  lastName,
  briefIntroduce,
  area,
  skills,
  id,
}: FreelancerItemProps) {
  const history = useHistory();
  const gotoDetailPage = (id: any) => {
    history.push(`find-freelancers/${id}`);
  };
  return (
    <div className="flex flex-col transition freelancer" style={{ minHeight: '500px' }}>
      <div className="flex flex-wrap items-center flex-grow freelancer__overview">
        <div className="flex-1">
          <div className="freelancer__avatar">
            <img src={`http://${avatar}`} alt={avatar} />
          </div>
          <div className="mt-4 freelancer__name">
            <h4>{firstName + ' ' + lastName}</h4>
            
          </div>
          <div className="mt-3 text-lg font-medium">{briefIntroduce}</div>
          <div className="mt-4 freelancer__name">
            <h5>
              {country && (
                <span>
                  {country.name} {country.emoji}
                </span>
              )}
            </h5>
          </div>
          <div className="mt-1 freelancer__rating">
            {rate > 0 && <span className="mr-2 point">{rate.toFixed(2)}</span>}
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
              <Tooltip key={item.id} placement="bottom" title={item.experience} color="geekblue">
                <div className="item">{item.name}</div>
              </Tooltip>
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
        <button className="view-profile" onClick={() => gotoDetailPage(id)}>
          View Profile
        </button>
      </div>
    </div>
  );
}

export default Freelancer;
