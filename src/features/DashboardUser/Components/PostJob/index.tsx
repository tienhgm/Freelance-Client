import "./index.scss";
import { BranchesOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
const { Option } = Select;
export default function PostJob() {
  return (
    <div className="h-full job-block">
      <h1 className="text-2xl">Manage Candidates</h1>
      <div className="postJobs">
        <div className="postJobs__title">
          <div className="flex items-center mb-4 ">
            <FolderOpenOutlined
              style={{ color: "#2e3fe5" }}
              className="mt-1 mr-4"
            />
            Post a job
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap w-full gap-4">
            <div className="input-job">
              <h2>Job Title</h2>
              <Input size="large" placeholder="Job title" />
            </div>
            <div className="input-job">
              <h2>Job Type</h2>
              <Select defaultValue="lucy" className="w-full" size="large">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
            <div className="input-job">
              <h2>Job Category</h2>
              <Select defaultValue="lucy" className="w-full" size="large">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </div>
          </div>
          <div className="flex flex-wrap w-full gap-4">
              <div className="input-job">
                  <h2>Location</h2>
                  <Input size="large" placeholder="Type Address" prefix={<BranchesOutlined />}/>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
}
