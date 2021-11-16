import Sidebar from 'components/Sidebar';
import { Select, Pagination, Row, Col } from 'antd';
import './index.scss';
import FreelancerItemProps from 'types/freelancerItemProps';
import Freelancer from 'features/Freelancers/components/Freelancer';

const freelancerList: Array<FreelancerItemProps> = [
  {
    avatar: 'https://www.vasterad.com/themes/hireo/images/user-avatar-big-03.jpg',
    nationality: 'https://www.vasterad.com/themes/hireo/images/flags/au.svg',
    name: 'Sindy Forest',
    jobTitle: 'Magento Certified Developer',
    rating: 5,
    location: 'Brisbane',
    rate: 70,
    jobSuccess: 100,
  },
  {
    avatar: 'https://www.vasterad.com/themes/hireo/images/user-avatar-big-03.jpg',
    nationality: 'https://www.vasterad.com/themes/hireo/images/flags/au.svg',
    name: 'Đặng Tuấn',
    jobTitle: 'Magento Certified Developer',
    rating: 4,
    location: 'Hà Nội',
    rate: 70,
    jobSuccess: 100,
  },
  {
    avatar: 'https://www.vasterad.com/themes/hireo/images/user-avatar-big-03.jpg',
    nationality: 'https://www.vasterad.com/themes/hireo/images/flags/au.svg',
    name: 'Mạnh Tiến',
    jobTitle: 'Magento Certified Developer',
    rating: 3,
    location: 'Brisbane',
    rate: 70,
    jobSuccess: 100,
  },
  {
    avatar: 'https://www.vasterad.com/themes/hireo/images/user-avatar-big-03.jpg',
    nationality: 'https://www.vasterad.com/themes/hireo/images/flags/au.svg',
    name: 'Khắc Thiện',
    jobTitle: 'Magento Certified Developer',
    rating: 5,
    location: 'Việt Nam',
    rate: 70,
    jobSuccess: 100,
  },
  {
    avatar: 'https://www.vasterad.com/themes/hireo/images/user-avatar-big-03.jpg',
    nationality: 'https://www.vasterad.com/themes/hireo/images/flags/au.svg',
    name: 'Sindy Forest',
    jobTitle: 'Magento Certified Developer',
    rating: 5,
    location: 'Brisbane',
    rate: 70,
    jobSuccess: 100,
  },
];

const sortByItems = [
  { value: 1, label: 'Relevance' },
  { value: 2, label: 'Newest' },
  { value: 3, label: 'Oldest' },
  { value: 4, label: 'Random' },
];

const { Option } = Select;

function FindFreelancer() {
  return (
    <div className="flex flex-col FindFreelancer find-job-page sm:flex-row">
      <div
        className="box-border flex-shrink-0 p-8 pb-0 overflow-y-auto FindFreelancer__sidebar w-52 md:w-60 lg:w-72"
        style={{ backgroundColor: '#fff', boxShadow: `0 0 4px rgba(0, 0, 0, 0.2)` }}
      >
        <Sidebar />
      </div>
      <div className="w-full p-8 overflow-y-auto FindFreelancer__list">
        <div className="flex items-center justify-between px-4 py-2 mb-5 bg-gray-300 rounded-md content__header">
          <h2 className="font-normal header__title">Search Results</h2>
          <div className="header__filter">
            <span>Sort by:</span>
            <Select labelInValue defaultValue={sortByItems[0]} style={{ width: 120 }} className="select-footer">
              {sortByItems.map((item) => (
                <Option value={item.value} key={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        {/* listFreelancer */}
        <div className="flex-1 mr-1">
          <Row gutter={{ md: 16, lg: 24 }}>
            {freelancerList.map((freelancer, index) => (
              <Col className="mb-4 gutter-row" md={24} lg={12} xl={8}>
                <Freelancer key={index} {...freelancer} />
              </Col>
            ))}
          </Row>
        </div>
        <div className="flex justify-center mt-8 find-job-page__paginate">
          <Pagination defaultCurrent={1} total={100} responsive={true} />
        </div>
      </div>
    </div>
  );
}

export default FindFreelancer;
