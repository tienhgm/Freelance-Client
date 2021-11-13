import React from 'react';
import TweenOne from 'rc-tween-one';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';

function AboutAgency() {
  return (
    <div className="about-agency py-20">
      <ScrollOverPack className="container bg-indigo-900 p-0 overflow-hidden flex w-full">
        <TweenOne
          key="image"
          className="flex-1"
          animation={{ x: 0, opacity: 1, ease: 'easeOutQuad' }}
          style={{
            transform: 'translateX(-100px)',
            opacity: 0,
            background: "url('https://kofejob.dreamguystech.com/template/assets/img/about-01.jpg') no-repeat",
            height: '464px',
            backgroundSize: '100%',
          }}
        />
        <QueueAnim className="flex-1 py-32" key="text" duration={450} type="right" leaveReverse>
          <div key="text" className="text-white px-24">
            <h2 key="h2" className="text-white font-semibold text-3xl leading-9 mb-6">
              Used by over <span className="text-red-400">1500</span> of World Leading Agencies work
            </h2>
            <p key="p" className="text-base mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Volutpat orci enim, mattis nibh aliquam dui, nibh
              faucibus aenean.
            </p>
            <a key="button" href="/">
              <Button type="primary" size="large" danger shape="round">
                <p className="font-semibold">LEARN MORE</p>
              </Button>
            </a>
          </div>
        </QueueAnim>
      </ScrollOverPack>
    </div>
  );
}

export default AboutAgency;
