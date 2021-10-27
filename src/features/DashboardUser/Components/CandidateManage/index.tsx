import "./index.scss";
import {
  CheckSquareOutlined,
  DeleteOutlined,
  DownloadOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Tooltip, Rate } from "antd";
import { Link } from "react-router-dom";
import avatarDefault from "assets/images/user-avatar-placeholder.png";
export default function Candidates() {
  return (
    <div className="h-full candidate-manage">
      <h1 className="text-2xl">Manage Candidates</h1>
      <div className="candidate">
        <div className="candidate__title">
          <div className="flex items-center mb-4 ">
            <CheckSquareOutlined
              style={{ color: "#2e3fe5" }}
              className="mt-1 mr-4"
            />
            Nadoshiki Organization ( 3 Candidates )
          </div>
        </div>
        <div className="box">
          <Link to="/" className="h-36 box__item">
            {/* left */}
            <div className="flex items-center">
              <img
                src={avatarDefault}
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              />
              <div className="flex flex-col ml-4">
                <div className="text-lg box__item__title">
                  Bilingual Event Support Speciallist
                </div>
                <div className="box__item__content">IOS Developer</div>
                <div className="flex gap-3 box__item__content">
                  <div className="flex items-center gap-2">
                    <MailOutlined /> sindy@example.com{" "}
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneOutlined /> (+61) 123-456-789{" "}
                  </div>
                </div>

                <div>
                  <Rate disabled defaultValue={2} />
                </div>
              </div>
            </div>
            {/* end left */}
            {/* right */}
            <div className="flex gap-3">
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
          </Link>
          <Link to="/" className="h-36 box__item">
            {/* left */}
            <div className="flex items-center">
              <img
                src={avatarDefault}
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              />
              <div className="flex flex-col ml-4">
                <div className="text-lg box__item__title">
                  Bilingual Event Support Speciallist
                </div>
                <div className="box__item__content">IOS Developer</div>
                <div className="flex gap-3 box__item__content">
                  <div className="flex items-center gap-2">
                    <MailOutlined /> sindy@example.com{" "}
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneOutlined /> (+61) 123-456-789{" "}
                  </div>
                </div>

                <div>
                  <Rate disabled defaultValue={2} />
                </div>
              </div>
            </div>
            {/* end left */}
            {/* right */}
            <div className="flex gap-3">
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
          </Link>
          <Link to="/" className="h-36 box__item">
            {/* left */}
            <div className="flex items-center">
              <img
                src={avatarDefault}
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              />
              <div className="flex flex-col ml-4">
                <div className="text-lg box__item__title">
                  Bilingual Event Support Speciallist
                </div>
                <div className="box__item__content">IOS Developer</div>
                <div className="flex gap-3 box__item__content">
                  <div className="flex items-center gap-2">
                    <MailOutlined /> sindy@example.com{" "}
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneOutlined /> (+61) 123-456-789{" "}
                  </div>
                </div>

                <div>
                  <Rate disabled defaultValue={2} />
                </div>
              </div>
            </div>
            {/* end left */}
            {/* right */}
            <div className="flex gap-3">
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
          </Link>
        </div>
      </div>
    </div>
  );
}
