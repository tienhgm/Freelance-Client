import { Button } from 'antd';
import CountUp from 'react-countup';
import { useHistory } from 'react-router';
import './index.scss';
function Banner() {
  const history = useHistory();
  const goToFindJob = () => {
    history.push('/find-jobs');
  };
  return (
    <div className="banner">
      <div className="banner__fulfil p-28">
        {/* title */}
        <div className="flex banner__fulfil__title">
          <div>
            <div className="font-medium lg:text-2xl md:text-xl xs:text-lg">
              Hire experts or be hired for any job, any time.
            </div>
            <div className="lg:text-2xl md:text-xl xs:text-lg">
              Thousands of small businesses use <span className="color-blue">Freelance</span> to turn their ideas into
              reality.
            </div>
          </div>
        </div>
        {/* end title */}
        {/* search jobs */}
        <div className="mt-12 banner__fulfil__form">
          {/* <div onClick={goToFindJob} className="btn-find">Let's find a job</div> */}
          <div className="flex items-center gap-4">
            <div className="font-medium lg:text-2xl md:text-xl xs:text-lg"> Do u wanna earn money ?</div>
            <Button type="primary" shape="round" size="large" onClick={goToFindJob}>
              Let's find a job
            </Button>
          </div>
        </div>
        {/* end search jobs */}
        {/* statistical  */}
        <div className="flex mt-16 flex-nowrap statistical">
          <div className="statistical__column">
            <div className="font-medium lg:text-3xl md:text-xl xs:text-lg">
              <CountUp end={1586} start={100} duration={1} />
            </div>
            <div className="title lg:text-lg md:text-base xs:text-sm">Jobs Posted</div>
          </div>
          <div className="statistical__column">
            <div className="font-medium lg:text-3xl md:text-xl xs:text-lg statistical__column__counter">
              <CountUp end={6869} start={300} duration={1} />
            </div>
            <div className="title lg:text-lg md:text-base xs:text-sm">Blogs</div>
          </div>
          <div className="statistical__column">
            <div className="font-medium lg:text-3xl md:text-xl xs:text-lg statistical__column__counter">
              <CountUp end={1482} start={200} duration={1} />
            </div>
            <div className="title lg:text-lg md:text-base xs:text-sm statistical__column__counter">Jobs Posted</div>
          </div>
        </div>
        {/* end statistical  */}
      </div>
    </div>
  );
}

export default Banner;
