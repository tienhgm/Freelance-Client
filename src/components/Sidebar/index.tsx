import { useEffect, useState } from 'react';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Form, DatePicker, Rate, Slider, Tag, Button, Input, Checkbox, Tooltip, Select } from 'antd';
import { useAppDispatch } from 'app/hooks';
import { handleGetArea, handleGetSkills } from 'app/slices/resourceSlice';
// const { CheckableTag } = Tag;
// const CheckboxGroup = Checkbox.Group;
import { listWorkMode, listLevel } from 'utils/enum';
import './index.scss';
import { convertDateToString } from 'utils/generate';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface IProps {
  handleGetSideBar: (value: any) => any;
}
function Sidebar({ handleGetSideBar }: IProps) {
  const [form] = Form.useForm();
  // const [selectedTags, setSelectedTags] = useState<string[]>([]);
  // const [checkedList, setCheckedList] = useState<any>();
  const [listArea, setListArea] = useState<any>([]);
  const [listSkills, setListSkills] = useState<any>([]);

  const dateFormat = 'YYYY/MM/DD';

  // const handleChange = (tag: string, checked: boolean) => {
  //   const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
  //   setSelectedTags(nextSelectedTags);
  // };
  const dispatch = useAppDispatch();
  const getArea = async () => {
    const { payload } = await dispatch(handleGetArea());
    setListArea(payload);
  };
  const getSkill = async () => {
    const { payload } = await dispatch(handleGetSkills());
    setListSkills(payload);
  };
  // const onChangeCheckbox = (list: any) => {
  //   setCheckedList(list);
  // };
  const onFinish = (values: any) => {
    if (values && values.datePicker) {
      values.startDate = convertDateToString(values.datePicker[0]._d);
      values.endDate = convertDateToString(values.datePicker[1]._d);
      delete values.datePicker;
    }
    handleGetSideBar(values);
  };
  const handleResetForm = () => {
    form.resetFields();
    handleGetSideBar(null);
  };
  useEffect(() => {
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
        {/* <div className="mb-8 sidebar__tags">
          <div className="text-lg font-medium">Tags</div>
          <div>
            {listSkills.map((tag:any) => (
              <CheckableTag
                className="custom-tag"
                key={tag}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={(checked) => handleChange(tag, checked)}
                style={{ marginBottom: '5px' }}
              >
                <p className="m-2 text-sm">{tag}</p>
              </CheckableTag>
            ))}
          </div>
        </div> */}
        {/* <div className="mb-8">
          <div className="text-lg font-medium">Reviews of Company</div>
          <CheckboxGroup value={checkedList} onChange={onChangeCheckbox}>
            <Checkbox value="5">
              <Rate disabled defaultValue={5} />
            </Checkbox>
            <br />
            <Checkbox value="4">
              <Rate disabled defaultValue={4} />
            </Checkbox>
            <br />
            <Checkbox value="3">
              <Rate disabled defaultValue={3} />
            </Checkbox>
            <br />
            <Checkbox value="2">
              <Rate disabled defaultValue={2} />
            </Checkbox>
            <br />
            <Checkbox value="1">
              <Rate disabled defaultValue={1} />
            </Checkbox>
            <br />
          </CheckboxGroup>
        </div> */}
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
