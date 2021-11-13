import React from 'react';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';

function AboutExpert() {
  return (
    <div className="about-expert mb-20">
      <ScrollOverPack className="container">
        <QueueAnim className="w-4/6 h-96 mx-auto text-center px-4" key="text" duration={450} type="bottom" leaveReverse>
          <h5 key="h5" className="text-lg font-bold text-red-400">SINCE THE START</h5>
          <h2 key="h2" className="text-3xl font-bold mb-4">
            We Provide Stable Service With Experts
          </h2>
          <div key="div" className="text-black font-medium">
            <p className="text-base  leading-7 mb-4">
                Experience state-of-the-art marketplace platform with the Exertio. We combine the experience of our global
                community around the globe for a best marketplace theme.
            </p>
            <p className="text-base leading-7 mb-4">
                With Exertio, you can develop a website for remote freelancers that will provide their best to the clients
                who are looking for remote resources.
            </p>
          </div>
          <div key="button" className="mt-5">
            <a href="/" className="mr-4">
              <Button type="primary" danger shape="round" size="large">
                <p className="font-semibold">GET STARTED</p>
              </Button>
            </a>
            <a href="/">
              <Button type="primary" shape="round" size="large">
                <p className="font-semibold">VIEW SERVICES</p>
              </Button>
            </a>
          </div>
        </QueueAnim>
      </ScrollOverPack>
    </div>
  );
}

export default AboutExpert;
