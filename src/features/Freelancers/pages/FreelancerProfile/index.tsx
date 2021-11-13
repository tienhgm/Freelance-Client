import {
  LikeOutlined,
  CalendarOutlined,
  InsertRowRightOutlined,
  ArrowRightOutlined,
  CommentOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { Comment, Tooltip, Avatar, Col, Pagination, Progress, Row, Tag, Breadcrumb } from 'antd';
import { useState } from 'react';
import './styles.scss';
import moment from 'moment';

const { CheckableTag } = Tag;

function FreelancerProfile() {
  const [bookmarkTag, setBookmarkTag] = useState(false);
  const handleChange = () => {
    setBookmarkTag((i) => (i = !i));
  };

  return (
    <div className="freelancer-profile">
      <div className="relative px-2 bg-gray-100 header-wrapper">
        <div className="absolute right-0 w-1/2 header__background"></div>
        <div className="container relative flex flex-col justify-between mx-auto page__header lg:items-center lg:flex-row">
          <div className="container mx-auto flex flex-col gap-5 header__left lg:items-center pt-14 lg:py-14 lg:flex-row">
            <div className="shadow-xl freelancer-logo w-min">
              <img src="https://www.vasterad.com/themes/hireo/images/user-avatar-big-02.jpg" alt="David Peterson" />
            </div>
            <div className="freelancer-info">
              <h2 className="text-2xl info__name">David Peterson</h2>
              <p className="text-lg info__job">iOS Expert + Node Dev</p>
              <div className="flex items-center text-base info__user gap-9">
                <div className="flex items-center gap-1 user__rate">
                  <div className="px-2 font-bold text-white bg-yellow-400 rounded-sm rate__scores">5.0</div>
                  <div className="flex gap-1 text-yellow-400 rate__stars">
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                    <i className="bx bxs-star"></i>
                  </div>
                </div>
                <div className="flex items-center gap-1 user__loca">
                  <div className="loca__flag">
                    <img
                      src="https://www.vasterad.com/themes/hireo/images/flags/gb.svg"
                      alt="United Kingdom"
                      width="25"
                      className="rounded"
                    />
                  </div>
                  <div className="loca__text">United Kingdom</div>
                </div>
                <div className="flex items-center text-white bg-green-500 rounded-md user__status--verified">
                  <div className="px-1 bg-green-400 status__icon rounded-l-md">
                    <i className="bx bx-check"></i>
                  </div>
                  <span className="px-3 text-sm">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb */}
      <div className="container mt-4 ml-40 font-semibold">
        <Breadcrumb>
          <Breadcrumb.Item>
            <a href="/"><HomeOutlined className="relative -top-1" /> Home</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/find-freelancers">Find Freelancers</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>David Peterson</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {/* content */}
      <div className="content flex-1 w-full mt-10">
        <Row justify="center" gutter={{ md: 16, lg: 24 }}>
          <Col className="content__left" md={24} lg={12} xl={12}>
            {/* About Me */}
            <div className="about mb-14">
              <h3 className="text-xl mb-5">About Me</h3>
              <p className="text-base leading-7">
                Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to
                corporate strategy foster collaborative thinking to further the overall value proposition. Organically
                grow the holistic world view of disruptive innovation via workplace diversity and empowerment.
              </p>
            </div>
            {/* Work History and Feedback */}
            <div className="work-history mb-16">
              <div className="headline">
                <h3 className="text-lg m-0">
                  <LikeOutlined className="like relative -top-1.5 mr-2" /> Work History and Feedback
                </h3>
              </div>
              <ul className="list">
                <li>
                  <div className="list__item">
                    <h4 className="text-lg font-medium">
                      Web, Database and API Developer
                      <span className="block text-base text-gray-500 font-normal">Rated as Freelancer</span>
                    </h4>
                    <div className="flex">
                      <div className="flex items-center gap-1">
                        <div className="px-2 mr-2 font-bold text-white bg-yellow-400 rounded-sm text-base">5.0</div>
                        <div className="flex gap-0.5 text-yellow-400 text-xl">
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                        </div>
                      </div>
                      <div className="text-base text-gray-500 ml-4">
                        <CalendarOutlined className="relative -top-1" /> August 2019
                      </div>
                    </div>
                    <div className="item-description text-base mt-4">
                      <p>Excellent programmer - fully carried out my project in a very professional manner.</p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="list__item">
                    <h4 className="text-lg font-medium">
                      Web, Database and API Developer
                      <span className="block text-base text-gray-500 font-normal">Rated as Freelancer</span>
                    </h4>
                    <div className="flex">
                      <div className="flex items-center gap-1">
                        <div className="px-2 mr-2 font-bold text-white bg-yellow-400 rounded-sm text-base">5.0</div>
                        <div className="flex gap-0.5 text-yellow-400 text-xl">
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                          <i className="bx bxs-star"></i>
                        </div>
                      </div>
                      <div className="text-base text-gray-500 ml-4">
                        <CalendarOutlined className="relative -top-1" /> August 2019
                      </div>
                    </div>
                    <div className="item-description text-base mt-4">
                      <p>Excellent programmer - fully carried out my project in a very professional manner.</p>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="pagination">
                <Pagination defaultCurrent={1} total={50} />
              </div>
            </div>
            {/* Employment History */}
            <div className="employment-history mb-14">
              <div className="headline">
                <h3 className="text-lg m-0">
                  <InsertRowRightOutlined className="like relative -top-1.5 mr-2" /> Employment History
                </h3>
              </div>
              <ul className="list">
                <li>
                  <div className="list__item flex">
                    <div className="avatar p-2 flex">
                      <img
                        className="self-center"
                        src="https://www.vasterad.com/themes/hireo/images/browse-companies-03.png"
                        alt="Acodia"
                      />
                    </div>
                    <div className="ml-6">
                      <h4 className="text-lg font-medium">Development Team Leader</h4>
                      <div className="flex text-base text-gray-500">
                        <div>
                          <InsertRowRightOutlined className="relative -top-1" /> Acodia
                        </div>
                        <div className="ml-4">
                          <CalendarOutlined className="relative -top-1" /> August 2019
                        </div>
                      </div>
                      <div className="item-description text-base mt-4">
                        <p>Focus the team on the tasks at hand or the internal and external customer requirements.</p>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            {/* comment */}
            <div className="comment mb-16">
              <div className="headline mb-3">
                <h3 className="text-lg m-0">
                  <CommentOutlined className="like relative -top-1.5 mr-2" /> Comment
                </h3>
              </div>
              <Comment
                author={<span className="font-semibold text-sm">Đặng Tuấn</span>}
                avatar={
                  <Avatar src="https://www.vasterad.com/themes/hireo/images/user-avatar-big-02.jpg" alt="Đặng Tuấn" />
                }
                content={
                  <p>
                    We supply a series of design principles, practical patterns and high quality design resources
                    (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.
                  </p>
                }
                datetime={
                  <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                    <span>{moment().fromNow()}</span>
                  </Tooltip>
                }
              />
            </div>
          </Col>
          <Col className="content__right" md={24} lg={12} xl={6}>
            {/* Overview */}
            <div className="overview flex items-center mb-6 leading-6">
              <div className="overview__item">
                <strong>$40</strong>
                <span>Hourly Rate</span>
              </div>
              <div className="overview__item">
                <strong>53</strong>
                <span>Jobs Done</span>
              </div>
              <div className="overview__item">
                <strong>22</strong>
                <span>Rehired</span>
              </div>
            </div>
            {/* make an offer */}
            <div className="button-make mt-6">
              <a href="/" className="block text-center shadow-lg bg-blue-600 py-3.5 transition text-lg rounded">
                Make an Offer
                <ArrowRightOutlined className="relative -top-1 ml-3" />
              </a>
            </div>
            {/* Indicators */}
            <div className="indicators mt-12 flex flex-wrap">
              <div className="indicator-item">
                <strong>88%</strong>
                <Progress percent={88} strokeColor="#1890FF" size="small" trailColor="#e0e0e0" showInfo={false} />
                <span>Job Success</span>
              </div>
              <div className="indicator-item">
                <strong>100%</strong>
                <Progress percent={100} strokeColor="#1890FF" size="small" trailColor="#e0e0e0" showInfo={false} />
                <span>Recommendation</span>
              </div>
              <div className="indicator-item">
                <strong>90%</strong>
                <Progress percent={90} strokeColor="#1890FF" size="small" trailColor="#e0e0e0" showInfo={false} />
                <span>On Time</span>
              </div>
              <div className="indicator-item">
                <strong>80%</strong>
                <Progress percent={80} strokeColor="#1890FF" size="small" trailColor="#e0e0e0" showInfo={false} />
                <span>On Budget</span>
              </div>
            </div>
            {/* Skills */}
            <div className="skills mt-8">
              <h4 className="text-xl font-normal">Skills</h4>
              <div className="skills-tags mt-5 block">
                <span>iOS</span>
                <span>Android</span>
                <span>mobile apps</span>
                <span>design</span>
                <span>Python</span>
                <span>Flask</span>
                <span>PHP</span>
                <span>WordPress</span>
              </div>
            </div>
            {/* Bookmark  */}
            <div className="bookmark mt-8 transition">
              <h4 className="text-xl font-normal mb-8">Bookmark</h4>
              <CheckableTag checked={bookmarkTag} onChange={handleChange} className="bookmark-tag custom-tag">
                <span className="bookmark-icon rounded-l bg-gray-600 px-3.5 py-3">
                  <i className="bx bxs-star"></i>
                </span>
                <span className="bookmark-text rounded-r px-3.5 py-3 bg-gray-700">Bookmark</span>
              </CheckableTag>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default FreelancerProfile;
