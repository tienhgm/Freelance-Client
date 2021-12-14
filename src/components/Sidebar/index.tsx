import { useEffect, useMemo, useState } from 'react';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Form, DatePicker, Rate, Slider, Button, Input, Tooltip, Select, Radio } from 'antd';
import { useAppDispatch } from 'app/hooks';
import { handleGetArea, handleGetSkills } from 'app/slices/resourceSlice';
import { listWorkMode, listLevel } from 'utils/enum';
import { convertDateToString } from 'helpers/generate';
import { useRouteMatch } from 'react-router';
import './index.scss';

// const { CheckableTag } = Tag;

const { Option } = Select;
const { RangePicker } = DatePicker;
interface IProps {
  handleGetSideBar: (value: any) => any;
  handleResetPage?: () => void;
  filters?: any;
}
function Sidebar({ handleGetSideBar, filters, handleResetPage }: IProps) {
  const [form] = Form.useForm();
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [listArea, setListArea] = useState<any>([]);
  const [listSkills, setListSkills] = useState<any>([]);
  const match = useRouteMatch();
  const dateFormat = 'YYYY/MM/DD';

  // const handleChange = (tag: string, checked: boolean) => {
  //   const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
  //   setSelectedTags(nextSelectedTags);
  // };
  let sideBarJobs = useMemo(() => {
    return match.path === '/find-jobs';
  }, [match.path]);
  const dispatch = useAppDispatch();
  const getArea = async () => {
    const { payload } = await dispatch(handleGetArea());
    setListArea(payload);
  };
  const getSkill = async () => {
    const { payload } = await dispatch(handleGetSkills());
    setListSkills(payload);
  };

  const onFinish = (values: any) => {
    if (values && values.datePicker) {
      values.startDate = convertDateToString(values.datePicker[0]._d);
      values.endDate = convertDateToString(values.datePicker[1]._d);
      delete values.datePicker;
    }
    handleGetSideBar(values);
  };
  const handleResetForm = () => {
    if(typeof handleResetPage === "function"){
      handleResetPage();
    }
    form.resetFields();
    handleGetSideBar(null);
  };
  const handleResetRadio = () => {
    form.setFieldsValue({
      rate: null,
    });
  };
  useEffect(() => {
    for (const key in filters) {
      if (filters[key] === undefined || filters[key] === null || filters[key] === '' || filters[key] === []) {
        delete filters[key];
      }
    }
    if (filters.areaId) {
      filters.areaId = +filters.areaId;
    }
    if (filters.skillIds) {
      filters.skillIds = filters.skillIds.map((item: any) => {
        return +item;
      });
    }
    form.setFieldsValue({
      ...filters,
    });

    getArea();
    getSkill();
  }, []);
  return (
    <Form form={form} onFinish={onFinish}>
      <div className="sidebar">
        <div className="flex justify-between pb-2" style={{ borderBottom: '1px solid #e4e4e4' }}>
          <div className="text-xl font-medium" style={{ color: '#2a41e8' }}>
            Filters
          </div>
          <div className="text-xl font-medium">
            <Tooltip placement="bottom" title={'Reset'}>
              <Button onClick={handleResetForm} icon={<UndoOutlined style={{ color: '#2a41e8' }} />} />
            </Tooltip>
          </div>
        </div>
        {sideBarJobs ? (
          <>
            <div className="mt-3 mb-8">
              <div className="text-lg font-medium">Search by keyword</div>
              <div>
                <Form.Item name="title">
                  <Input size="large" prefix={<SearchOutlined className="mr-1" />} placeholder="Name" />
                </Form.Item>
              </div>
            </div>
            <div className="mb-8 sidebar__salary">
              <div className="text-lg font-medium">Salary</div>
              <div className="mt-8">
                <Form.Item name="salary">
                  <Slider max={1500} />
                </Form.Item>
              </div>
            </div>
            <div className="mb-8">
              <div className="text-lg font-medium">Area</div>
              <div>
                <Form.Item name="areaId">
                  <Select
                    showSearch
                    filterOption={(input: any, option: any) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA: any, optionB: any) =>
                      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    allowClear
                    size="large"
                    style={{ width: '100%' }}
                    placeholder="Select your area"
                  >
                    {listArea.map((item: any) => (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="mb-8">
              <div className="text-lg font-medium">Work mode</div>
              <div>
                <Form.Item name="workMode">
                  <Select allowClear size="large" style={{ width: '100%' }} placeholder="Select work mode">
                    {listWorkMode.map((item: any, idx: number) => (
                      <Option value={item} key={idx}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>

            <div className="mb-8 sidebar__tags">
              <div className="text-lg font-medium">Level</div>
              <div>
                <Form.Item name="level">
                  <Select allowClear size="large" style={{ width: '100%' }} placeholder="Choose levels">
                    {listLevel.map((item: any, idx: number) => (
                      <Option value={item} key={idx}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="mb-8 sidebar__tags">
              <div className="text-lg font-medium">Skills</div>
              <div>
                <Form.Item name="skillIds">
                  <Select mode="multiple" allowClear size="large" style={{ width: '100%' }} placeholder="Choose skills">
                    {listSkills.map((item: any) => (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="mb-8">
              <div className="text-lg font-medium">Start - End Date</div>
              <div className="mt-8">
                <Form.Item name="datePicker">
                  <RangePicker format={dateFormat} />
                </Form.Item>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mt-3 mb-8">
              <div className="text-lg font-medium">Search by Name</div>
              <div>
                <Form.Item name="name">
                  <Input size="large" prefix={<SearchOutlined className="mr-1" />} placeholder="Name" />
                </Form.Item>
              </div>
            </div>
            <div className="mb-8">
              <div className="text-lg font-medium">Area</div>
              <div>
                <Form.Item name="areaId">
                  <Select
                    showSearch
                    filterOption={(input: any, option: any) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA: any, optionB: any) =>
                      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    allowClear
                    size="large"
                    style={{ width: '100%' }}
                    placeholder="Select your area"
                  >
                    {listArea.map((item: any) => (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="mb-8 sidebar__tags">
              <div className="text-lg font-medium">Skills</div>
              <div>
                <Form.Item name="skillIds">
                  <Select mode="multiple" allowClear size="large" style={{ width: '100%' }} placeholder="Choose skills">
                    {listSkills.map((item: any) => (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="mb-8 sidebar__tags">
              <div className="text-lg font-medium">Level</div>
              <div>
                <Form.Item name="experience">
                  <Select allowClear size="large" style={{ width: '100%' }} placeholder="Choose level">
                    {listLevel.map((item: any, idx: number) => (
                      <Option value={item} key={idx}>
                        {item}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            {/* <div className="mb-8 sidebar__tags">
              <div className="text-lg font-medium">Languages</div>
              <div>
                <Form.Item name="languageIds">
                  <Select
                    mode="multiple"
                    allowClear
                    size="large"
                    style={{ width: '100%' }}
                    placeholder="Choose languages"
                  >
                    {languages.map((item: any) => (
                      <Option value={item.id} key={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div> */}
            <div className="mb-8">
              <div className="flex justify-between">
                <div className="text-lg font-medium">Rate</div>
                <div
                  onClick={handleResetRadio}
                  style={{
                    padding: '3px 6px',
                    background: '#2e3fe5',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    color: '#fff',
                  }}
                >
                  Reset Rate
                </div>
              </div>

              <Form.Item name="rate">
                <Radio.Group>
                  <Radio value={5}>
                    <Rate disabled defaultValue={5} />
                  </Radio>
                  <br />
                  <Radio value={4}>
                    <Rate disabled defaultValue={4} />
                  </Radio>
                  <br />
                  <Radio value={3}>
                    <Rate disabled defaultValue={3} />
                  </Radio>
                  <br />
                  <Radio value={2}>
                    <Rate disabled defaultValue={2} />
                  </Radio>
                  <br />
                  <Radio value={1}>
                    <Rate disabled defaultValue={1} />
                  </Radio>
                  <br />
                </Radio.Group>
              </Form.Item>
            </div>
          </>
        )}
        <div className="pt-2 pb-10">
          <Button className="w-full" type="primary" size="large" htmlType="submit">
            Search
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default Sidebar;
