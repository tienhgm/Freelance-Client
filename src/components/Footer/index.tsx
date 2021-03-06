import {
  FacebookOutlined,
  MailOutlined,
  RightOutlined,
  TwitterOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Tooltip, Select, Button } from "antd";
import { useHistory } from "react-router-dom";

export default function Footer() {
  const history = useHistory();
  const { Option } = Select;
  const listLanguage = [
    { id: 1, value: "English", name: "English" },
    { id: 2, value: "Vietnamese", name: "Tiếng Việt" },
  ];
  const listContact = [
    {
      title: "Facebook",
      url: "#",
      icon: <FacebookOutlined />,
    },
    {
      title: "Twitter",
      url: "#",
      icon: <TwitterOutlined />,
    },
    {
      title: "Chat",
      url: "#",
      icon: <WechatOutlined />,
    },
  ];
  // email dang ky nhan thu
  // const [signUpEmail, setlistFile] = useState();
  return (
    <div className="px-36 footer">
      <div className="flex items-center justify-between pt-4 pb-4 footer__row-one">
        <div className="font-bold text-logo">
          <span>FREE</span>
          <span>LANCE</span>
        </div>
        <div className="flex justify-between gap-6">
          <div className="flex gap-3">
            {listContact.map((item, idx) => (
              <Tooltip
                placement="bottom"
                title={item.title}
                color="geekblue"
                key={idx}
              >
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.icon}
                </a>
              </Tooltip>
            ))}
          </div>
          {/* <div>
            <Select
              defaultValue={listLanguage[0].value}
              style={{ width: 120 }}
              className="select-footer"
            >
              {listLanguage.map((item) => (
                <Option value={item.value} key={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </div> */}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-12 footer__row-two">
        <div className="col-span-8">
          <div className="flex justify-between">
            <div className="flex flex-col gap-3">
              <div className="text-xl font-bold">Find Jobs</div>
              <ul>
                <li>
                  <span className="cursor-pointer hover:text-red-300" onClick={() => history.push('/find-jobs')}>List Jobs</span>
                </li>
                {/* <li>
                  <a>Sign In</a>
                </li>
                <li>
                  <a>Dashboard</a>
                </li> */}
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xl font-bold">Find Freelancers</div>
              <ul>
                <li>
                  <span className="cursor-pointer hover:text-red-300" onClick={() => history.push('/find-freelancers')}>List Freelancers</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xl font-bold">Browse Company</div>
              <ul>
                <li>
                  <span className="cursor-pointer hover:text-red-300" onClick={() => history.push('/browse-companies')}>Browse Companies</span>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xl font-bold">About Us</div>
              <ul>
                <li>
                  <span className="cursor-pointer hover:text-red-300" onClick={() => history.push('/about-us')}>About us</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-4 ml-4 right">
          <div className="flex items-center justify-end text-xl font-bold">
            <MailOutlined className="mr-3" /> Sign Up For a Newsletter
          </div>
          {/* <div className="right__content">
            Weekly breaking news, analysis and cutting edge advices on job
            searching.
          </div>
          <div className="flex items-center gap-2 mt-3">
            <input type="text" className="right__input" placeholder="Enter your email address" />
            <Button type="primary" icon={<RightOutlined />} size="large">
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
