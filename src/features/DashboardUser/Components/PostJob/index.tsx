import "./index.scss";
import { EnvironmentOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Input, Select, Slider } from "antd";
import { useState } from "react";
const { Option } = Select;
export default function PostJob() {
  const [jobSalary, setJobSalary] = useState(0);
  const handleSetJobSalary = (value: number) => {
    setJobSalary(value);
  };
  const [tagChoose, setTagChoose] = useState([]);
  const listTag = [
    { id: 0, tagName: "Vuejs" },
    { id: 1, tagName: "ReactJs" },
    { id: 2, tagName: "nodeJs" },
  ];

  const handleChange = (value: any) => {
    setTagChoose(value);
  };
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

              <Input
                size="large"
                placeholder="Input Address"
                prefix={<EnvironmentOutlined />}
              />
            </div>
            <div className="input-job">
              <h2>Salary</h2>
              <div className="text-base font-medium">${jobSalary}</div>
              <Slider
                max={1500}
                value={jobSalary}
                onChange={handleSetJobSalary}
              />
            </div>
            <div className="input-job">
              <h2>Tags</h2>
              <Select
                mode="multiple"
                allowClear
                size="large"
                style={{ width: "100%" }}
                placeholder="Choose Tags"
                onChange={handleChange}
              >
                {listTag.map((tag) => (
                  <Option key={tag.id} value={tag.tagName}>
                    {tag.tagName}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex flex-wrap w-full">
            <div >
              <h2>Editor</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
