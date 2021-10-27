import "./index.scss";
import {
  CheckSquareOutlined,
  DeleteOutlined,
  CalendarOutlined,
  EditOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Tooltip, Button, Tag, Badge } from "antd";
import { Link } from "react-router-dom";

export default function Jobs() {
  return (
    <div className="h-full jobs-manage">
      <h1 className="text-2xl">Manage Jobs</h1>
      <div className="jobs">
        <div className="jobs__title">
          <div className="flex items-center mb-4 ">
            <CheckSquareOutlined
              style={{ color: "#2e3fe5" }}
              className="mt-1 mr-4"
            />
            My Job Listings
          </div>
        </div>
        <div className="box">
          <Link to="/" className="h-36 box__item">
            {/* left */}
            <div className="flex flex-col">
              <div className="flex gap-3">
                <div className="text-xl">Nadoshiki organization</div>
                <div>
                  <Tag color="#87d068">Resolved progress</Tag>
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <div className="flex items-center gap-2 box__item__content">
                  <CalendarOutlined /> Posted on 10 July, 2021
                </div>
                <div className="flex items-center gap-2 box__item__content">
                  <CalendarOutlined /> Release on 27 October, 2021
                </div>
              </div>
              <div className="mt-4">
                <Badge count={5}>
                  <Button type="primary">
                    <TeamOutlined className="mb-1" />
                    Manage candidate
                  </Button>
                </Badge>
              </div>
            </div>

            {/* end left */}
            {/* right */}
            <div className="flex gap-3">
              <div className="btn btn__edit">
                <Tooltip placement="bottom" title="Edit">
                  <EditOutlined />
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
            <div className="flex flex-col">
              <div className="flex gap-3">
                <div className="text-xl">Nadoshiki organization</div>
                <div>
                  <Tag color="error">Deadline</Tag>
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <div className="flex items-center gap-2 box__item__content">
                  <CalendarOutlined /> Posted on 10 July, 2021
                </div>
                <div className="flex items-center gap-2 box__item__content">
                  <CalendarOutlined /> Release on 27 October, 2021
                </div>
              </div>
              <div className="mt-4">
                <Badge count={2}>
                  <Button type="primary">
                    <TeamOutlined className="mb-1" />
                    Manage candidate
                  </Button>
                </Badge>
              </div>
            </div>

            {/* end left */}
            {/* right */}
            <div className="flex gap-3">
              <div className="btn btn__edit">
                <Tooltip placement="bottom" title="Edit">
                  <EditOutlined />
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
            <div className="flex flex-col">
              <div className="flex gap-3">
                <div className="text-xl">Nadoshiki organization</div>
                <div>
                  <Tag color="warning">Pending</Tag>
                </div>
              </div>
              <div className="flex gap-3 mt-2">
                <div className="flex items-center gap-2 box__item__content">
                  <CalendarOutlined /> Posted on 10 July, 2021
                </div>
                <div className="flex items-center gap-2 box__item__content">
                  <CalendarOutlined /> Release on 27 October, 2021
                </div>
              </div>
              <div className="mt-4">
                <Badge count={2}>
                  <Button type="primary">
                    <TeamOutlined className="mb-1" />
                    Manage candidate
                  </Button>
                </Badge>
              </div>
            </div>

            {/* end left */}
            {/* right */}
            <div className="flex gap-3">
              <div className="btn btn__edit">
                <Tooltip placement="bottom" title="Edit">
                  <EditOutlined />
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
