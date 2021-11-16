import './index.scss';
import { DeleteOutlined, DownloadOutlined, MailOutlined, PhoneOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Tooltip, Rate, Tabs, Pagination, Input } from 'antd';
import avatarDefault from 'assets/images/user-avatar-placeholder.png';
const { TabPane } = Tabs;
export default function DetailJob() {
  function callback(key: any) {
    // console.log(key);
  }
  return (
    <div className="h-full candidate-manage">
      <h1 className="text-2xl">Jobs {'>'} ...</h1>
      <div className="candidate">
        <div>
          <div className="flex justify-end px-6">
            <div style={{ width: 'calc(160px)' }}>
              <Input placeholder="Search by name..." />
            </div>
          </div>
          <Tabs size="large" defaultActiveKey="1" onChange={callback}>
            <TabPane tab="List employees" key="1">
              <div className="box">
                <div className="h-32 box__item">
                  {/* left */}
                  <div className="flex items-center">
                    <img
                      src={avatarDefault}
                      style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                      alt="avatar"
                    />
                    <div className="flex flex-col ml-4">
                      <div className="text-lg box__item__title">Bilingual Event Support Speciallist</div>
                      <div className="box__item__content">IOS Developer</div>
                      <div className="flex gap-3 box__item__content">
                        <div className="flex items-center gap-2">
                          <MailOutlined /> sindy@example.com{' '}
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneOutlined /> (+61) 123-456-789{' '}
                        </div>
                      </div>

                      <div>
                        <Rate disabled defaultValue={2} />
                      </div>
                    </div>
                  </div>
                  {/* end left */}
                  {/* right */}
                  <div className="flex gap-1">
                    <div className="btn btn__download">
                      <Tooltip placement="bottom" title="Download CV">
                        <DownloadOutlined />
                      </Tooltip>
                    </div>
                    <div className="btn btn__message">
                      <Tooltip placement="bottom" title="Message">
                        <MailOutlined />
                      </Tooltip>
                    </div>
                    <div className="btn btn__delete">
                      <Tooltip placement="bottom" title="Delete">
                        <DeleteOutlined />
                      </Tooltip>
                    </div>
                  </div>
                  {/* end right */}
                </div>
              </div>
            </TabPane>
            <TabPane tab="List candidates" key="2">
              <div className="box">
                <div className="h-32 box__item">
                  {/* left */}
                  <div className="flex items-center">
                    <img
                      src={avatarDefault}
                      style={{ width: '80px', height: '80px', borderRadius: '50%' }}
                      alt="avatar"
                    />
                    <div className="flex flex-col ml-4">
                      <div className="text-lg cursor-pointer box__item__title">Bilingual Event Support Speciallist</div>
                      <div className="box__item__content">IOS Developer</div>
                      <div className="flex gap-3 box__item__content">
                        <div className="flex items-center gap-2">
                          <MailOutlined /> sindy@example.com{' '}
                        </div>
                        <div className="flex items-center gap-2">
                          <PhoneOutlined /> (+61) 123-456-789{' '}
                        </div>
                      </div>

                      <div>
                        <Rate disabled defaultValue={2} />
                      </div>
                    </div>
                  </div>
                  {/* end left */}
                  {/* right */}
                  <div className="flex gap-1">
                    <div className="cursor-pointer btn btn__download">
                      <Tooltip placement="bottom" title="Accept">
                        <PlusCircleOutlined />
                      </Tooltip>
                    </div>
                    <div className="cursor-pointer btn btn__message">
                      <Tooltip placement="bottom" title="Message">
                        <MailOutlined />
                      </Tooltip>
                    </div>
                    <div className="cursor-pointer btn btn__delete">
                      <Tooltip placement="bottom" title="Reject">
                        <DeleteOutlined />
                      </Tooltip>
                    </div>
                  </div>
                  {/* end right */}
                </div>
              </div>
            </TabPane>
          </Tabs>
          <Pagination className="mt-4" defaultCurrent={1} total={50} />
        </div>
      </div>
    </div>
  );
}
