import './index.scss';
import { FolderOpenOutlined } from '@ant-design/icons';
import { Input, Select, Slider, DatePicker, Form, Button } from 'antd';
import { useEffect, useState } from 'react';
import CkEditor from 'components/Editor';
import { handleGetSkills } from 'app/slices/resourceSlice';
import { useAppDispatch } from 'app/hooks';
import { listLevel, listWorkMode } from 'utils/enum';
import { convertDateToString } from 'helpers/generate';
import { handlePostJob } from 'app/slices/jobSlice';
const { Option } = Select;
export default function PostJob() {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [jobSalary, setJobSalary] = useState(0);
  const [jobDescription, setJobDescription] = useState('');
  const [listSkills, setListSkills] = useState([]);
  const dispatch = useAppDispatch();
  const handleSetJobSalary = (value: number) => {
    setJobSalary(value);
  };
  const watchJobDescription = (value: any) => {
    setJobDescription(value);
  };
  const getSkill = async () => {
    const { payload } = await dispatch(handleGetSkills());
    setListSkills(payload);
  };
  const onFinish = async (values: any) => {
    values.startDate = convertDateToString(values.rangePicker[0]._d);
    values.endDate = convertDateToString(values.rangePicker[1]._d);
    values.businessFieldIds = [];
    values.areaId = 0;
    values.minEmployees = 1;
    values.maxEmployees = values.maxEmployees;
    values.description = jobDescription;
    delete values.rangePicker;
    await dispatch(handlePostJob(values));
  };
  useEffect(() => {
    getSkill();
    return () => {
      setListSkills([]);
    };
  }, []);
  return (
    <Form form={form} onFinish={onFinish}>
      <div className="h-full job-block">
        <h1 className="text-2xl">Job</h1>
        <div className="postJobs">
          <div className="postJobs__title">
            <div className="flex items-center mb-4 ">
              <FolderOpenOutlined style={{ color: '#2e3fe5' }} className="mt-1 mr-4" />
              Post a job
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap w-full gap-4">
              <div className="input-job">
                <div className="flex gap-1">
                  <h2>Job Title</h2> <span style={{ color: 'red' }}>*</span>
                </div>
                <Form.Item name="title" rules={[{ required: true, message: 'Please input job title' }]}>
                  <Input size="large" placeholder="Job title" />
                </Form.Item>
              </div>
              <div className="input-job">
                <div className="flex gap-1">
                  <h2>Work mode</h2> <span style={{ color: 'red' }}>*</span>
                </div>
                <Form.Item name="workMode" rules={[{ required: true, message: 'Select work mode' }]}>
                  <Select allowClear size="large" style={{ width: '100%' }} placeholder="Select work mode">
                    {listWorkMode.map((item: any, idx: number) => (
                      <Option value={item} key={idx}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="input-job">
                <div className="flex gap-1">
                  <h2>Number of employees required</h2> <span style={{ color: 'red' }}>*</span>
                </div>
                <Form.Item
                  name="maxEmployees"
                  rules={[{ required: true, message: 'Please input number of employees' }]}
                >
                  <Input type="number" min="0" size="large" placeholder="Number of employees" />
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-wrap w-full gap-4">
              <div className="input-job">
                <div className="flex gap-1">
                  <h2>Salary</h2> <span style={{ color: 'red' }}>*</span>
                </div>
                <div className="text-base font-medium">${jobSalary}</div>
                <Form.Item name="salary" rules={[{ required: true, message: 'Select work mode' }]}>
                  <Slider max={1500} onChange={handleSetJobSalary} />
                </Form.Item>
              </div>
              <div className="input-job">
                <div className="flex gap-1">
                  <h2>Skills</h2> <span style={{ color: 'red' }}>*</span>
                </div>
                <Form.Item name="skillIds" rules={[{ required: true, message: 'Select skills' }]}>
                  <Select mode="multiple" allowClear size="large" style={{ width: '100%' }} placeholder="Choose Skills">
                    {listSkills?.map((item: any) => (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className="input-job">
                <div className="flex gap-1">
                  <h2>Experience</h2> <span style={{ color: 'red' }}>*</span>
                </div>
                <Form.Item name="experience" rules={[{ required: true, message: 'Select skills' }]}>
                  <Select allowClear size="large" style={{ width: '100%' }} placeholder="Choose experience">
                    {listLevel?.map((item: any, idx: number) => (
                      <Option value={item} key={idx}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-wrap w-full">
              <div style={{ width: 'calc(100%)' }}>
                <div className="flex gap-1">
                  <h2>Available Time</h2> <span style={{ color: 'red' }}>*</span>
                </div>
                <Form.Item name="rangePicker" rules={[{ required: true, message: 'Select available time' }]}>
                  <RangePicker size="large" />
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-wrap w-full">
              <div style={{ width: 'calc(93%)' }}>
                <div className="flex gap-1">
                  <h2>Job Description</h2> <span className="required-field">*</span>
                </div>
                <CkEditor valueChange={jobDescription} handleChange={watchJobDescription} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-6 mt-4">
        <Button type="primary" size="large" htmlType="submit">
          Save Changes
        </Button>
      </div>
    </Form>
  );
}
