import React from 'react';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import QueueAnim from 'rc-queue-anim';

function AboutExpert() {
  return (
    <div className="mb-20 about-expert">
      <ScrollOverPack className="container">
        <QueueAnim className="w-4/6 px-4 mx-auto text-center h-96" key="text" duration={450} type="bottom" leaveReverse>
          <h5 key="h5" className="text-lg font-bold text-red-400">SINCE THE START</h5>
          <h2 key="h2" className="mb-4 text-3xl font-bold">
            We Provide Stable Service With Experts
          </h2>
          <div key="div" className="font-medium text-black">
            <p className="mb-4 text-base leading-7">
                Experience state-of-the-art marketplace platform with the Exertio. We combine the experience of our global
                community around the globe for a best marketplace theme.
            </p>
            <p className="mb-4 text-base leading-7">
                With Exertio, you can develop a website for remote freelancers that will provide their best to the clients
                who are looking for remote resources.
            </p>
          </div>
        </QueueAnim>
      </ScrollOverPack>
    </div>
  );
}

export default AboutExpert;
