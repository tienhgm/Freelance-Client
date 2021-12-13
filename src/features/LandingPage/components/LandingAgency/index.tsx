import React from 'react';
import TweenOne from 'rc-tween-one';
import ScrollOverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

function LandingAgency() {
    const history = useHistory();

  return (
    <div className="py-20 bg-white">
      <ScrollOverPack className="container p-0 overflow-hidden flex w-full ">
        <TweenOne
          key="image"
          className="flex-1"
          animation={{ x: 0, opacity: 1, ease: 'easeOutQuad' }}
          style={{
            transform: 'translateX(-100px)',
            opacity: 0,
            background:
              "url('https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80') no-repeat",
            height: '420px',
            width: '550px',
            backgroundSize: '100%',
          }}
        />
        <QueueAnim className="flex-1" key="text" duration={950} type="right" leaveReverse>
          <div key="div" className="px-24 py-20 bg-purple-50" style={{ height: '420px' }}>
            <h2 key="h2" className="font-semibold text-3xl leading-9 mb-6">
              I NEED A DEVELOPED PROJECT
            </h2>
            <p key="p" className="text-base mb-6">
              Do you want to earn money, find unlimited clients and build your freelance career? Get the perfect
              Developed project for your budget from our creative community.
            </p>
            <a key="button">
              <Button type="primary" onClick={() => history.push('/find-jobs')} size="large" shape="circle" icon={<ArrowRightOutlined />}>
              </Button>
            </a>
          </div>
        </QueueAnim>
      </ScrollOverPack>
    </div>
  );
}

export default LandingAgency;
