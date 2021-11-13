import { Breadcrumb } from 'antd';
import CountUp from 'react-countup';
import AboutAgency from './components/AboutAgency';
import AboutExpert from './components/AboutExpert';
import AboutFreelance from './components/AboutFreelancer';
import './styles.scss';

function AboutUs() {
  return (
    <div className="about">
      <div className="about__breadcrumb mb-4">
        <div className="flex flex-col items-center justify-center">
          <h2 className="breadcrumb-title font-bold mt-4 text-blue-600">ABOUT US</h2>
          <div className="breadcrumb-page font-bold">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">Home</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>About us</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>
      <div className="about__content">
        <AboutFreelance  />
        {/* job-counter */}
        <div className="job-counter bg-blue-500 py-14">
          <div className="container flex">
            <div className="flex-1">
              <h2><CountUp end={800} start={100} duration={2} />+</h2>
              <h4>Jobs Posted</h4>
            </div>
            <div className="flex-1">
              <h2><CountUp end={80} start={0} duration={2} />+</h2>
              <h4>Companies</h4>
            </div>
            <div className="flex-1">
              <h2><CountUp end={900} start={100} duration={2} />+</h2>
              <h4>Developers</h4>
            </div>
            <div className="flex-1">
              <h2><CountUp end={90} start={0} duration={2} />+</h2>
              <h4>Development Services</h4>
            </div>
          </div>
        </div>
        <AboutAgency />
        <AboutExpert />
      </div>
    </div>
  );
}

export default AboutUs;
