import React from 'react';
import TweenOne from 'rc-tween-one';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';

function AboutFreelance() {
  return (
    <div className="about-freelancer py-20">
      <ScrollOverPack className="container overflow-hidden flex text-gray-900 w-full">
        <QueueAnim className="w-2/4 pl-5 mr-28" key="text" duration={450} type="left" leaveReverse>
          <h2 key="h2" className="text-3xl font-semibold mb-4">
            About <span className="text-blue-500">Freelancer</span>
          </h2>
          <p key="p" className="text-base font-normal leading-7 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est modi, saepe hic esse maxime quasi, sapiente ex
            debitis quis dolorum unde, neque quibusdam eveniet nobis enim porro repudiandae nesciunt quidem. <br />
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est modi, saepe hic esse maxime quasi, sapiente ex
            debitis quis dolorum unde, neque quibusdam eveniet nobis enim porro repudiandae nesciunt quidem.
          </p>
          <div key="button">
            <a href="/">
              <Button type="primary" shape="round" size="large">
                LEARN MORE
              </Button>
            </a>
          </div>
        </QueueAnim>
        <TweenOne
          key="image"
          className="image-about flex-1"
          animation={{ x: 0, opacity: 1, ease: 'easeOutQuad' }}
          style={{
            transform: 'translateX(100px)',
            opacity: 0,
            background: 'url("https://kofejob.dreamguystech.com/template/assets/img/about.png") no-repeat',
            height: '375px',
          }}
        />
      </ScrollOverPack>
    </div>
  );
}

export default AboutFreelance;
