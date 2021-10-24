import {
  AccountBookOutlined,
  CheckSquareOutlined,
  DeleteOutlined,
  EnvironmentOutlined,
  FieldTimeOutlined,
  LaptopOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import "./index.scss";
export default function Bookmarks() {
  return (
    <div className="h-full bookmarks">
      <h1 className="text-2xl">Bookmarks</h1>
      <div className="jobs">
        <div className="jobs__title">
          <div className="flex items-center mb-4 ">
            <CheckSquareOutlined
              style={{ color: "#2e3fe5" }}
              className="mt-1 mr-4"
            />
            Bookmarked Jobs
          </div>
          <Link to="/" className="h-32 box__item">
            {/* left */}
            <div className="flex items-center">
              <AccountBookOutlined style={{ fontSize: 45 }} />
              <div className="flex flex-col ml-4">
                <div className="text-lg box__item__title">
                  Bilingual Event Support Speciallist
                </div>
                <div className="flex gap-4 box__item__content">
                  <div className="flex items-center">
                    <EnvironmentOutlined className="mt-1" />
                    <div className="ml-1">Ha Noi</div>
                  </div>
                  <div className="flex items-center">
                    <LaptopOutlined className="mt-1" />
                    <div className="ml-1">Fulltime</div>
                  </div>
                  <div className="flex items-center">
                    <FieldTimeOutlined className="mt-1" />
                    <div className="ml-1">2 days ago</div>
                  </div>
                </div>
              </div>
            </div>
            {/* end left */}
            {/* right */}

            <div className="btn btn__delete">
              <Tooltip placement="left" title="Delete">
                <DeleteOutlined />
              </Tooltip>
            </div>
            {/* end right */}
          </Link>
          <Link to="/" className="h-32 box__item">
            {/* left */}
            <div className="flex items-center">
              <AccountBookOutlined style={{ fontSize: 45 }} />
              <div className="flex flex-col ml-4">
                <div className="text-lg box__item__title">
                  Bilingual Event Support Speciallist
                </div>
                <div className="flex gap-4 box__item__content">
                  <div className="flex items-center">
                    <EnvironmentOutlined className="mt-1" />
                    <div className="ml-1">Ha Noi</div>
                  </div>
                  <div className="flex items-center">
                    <LaptopOutlined className="mt-1" />
                    <div className="ml-1">Fulltime</div>
                  </div>
                  <div className="flex items-center">
                    <FieldTimeOutlined className="mt-1" />
                    <div className="ml-1">2 days ago</div>
                  </div>
                </div>
              </div>
            </div>
            {/* end left */}
            {/* right */}

            <div className="btn btn__delete">
              <Tooltip placement="left" title="Delete">
                <DeleteOutlined />
              </Tooltip>
            </div>

            {/* end right */}
          </Link>
          <Link to="/" className="h-32 box__item">
            {/* left */}
            <div className="flex items-center">
              <AccountBookOutlined style={{ fontSize: 45 }} />
              <div className="flex flex-col ml-4">
                <div className="text-lg box__item__title">
                  Bilingual Event Support Speciallist
                </div>
                <div className="flex gap-4 box__item__content">
                  <div className="flex items-center">
                    <EnvironmentOutlined className="mt-1" />
                    <div className="ml-1">Ha Noi</div>
                  </div>
                  <div className="flex items-center">
                    <LaptopOutlined className="mt-1" />
                    <div className="ml-1">Fulltime</div>
                  </div>
                  <div className="flex items-center">
                    <FieldTimeOutlined className="mt-1" />
                    <div className="ml-1">2 days ago</div>
                  </div>
                </div>
              </div>
            </div>
            {/* end left */}
            {/* right */}

            <div className="btn btn__delete">
              <Tooltip placement="left" title="Delete">
                <DeleteOutlined />
              </Tooltip>
            </div>

            {/* end right */}
          </Link>
          <Link to="/" className="h-32 box__item">
            {/* left */}
            <div className="flex items-center">
              <AccountBookOutlined style={{ fontSize: 45 }} />
              <div className="flex flex-col ml-4">
                <div className="text-lg box__item__title">
                  Bilingual Event Support Speciallist
                </div>
                <div className="flex gap-4 box__item__content">
                  <div className="flex items-center">
                    <EnvironmentOutlined className="mt-1" />
                    <div className="ml-1">Ha Noi</div>
                  </div>
                  <div className="flex items-center">
                    <LaptopOutlined className="mt-1" />
                    <div className="ml-1">Fulltime</div>
                  </div>
                  <div className="flex items-center">
                    <FieldTimeOutlined className="mt-1" />
                    <div className="ml-1">2 days ago</div>
                  </div>
                </div>
              </div>
            </div>
            {/* end left */}
            {/* right */}

            <div className="btn btn__delete">
              <Tooltip placement="left" title="Delete">
                <DeleteOutlined />
              </Tooltip>
            </div>

            {/* end right */}
          </Link>
        </div>
      </div>
    </div>
  );
}
