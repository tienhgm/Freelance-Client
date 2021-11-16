import { useState } from 'react';
import './index.scss';
import { EnvironmentOutlined, UndoOutlined } from '@ant-design/icons';
import { Rate, Slider, Tag, Button, Input, Checkbox, Tooltip } from 'antd';

const { CheckableTag } = Tag;
const tagsData: string[] = ['front-end dev', 'angular', 'react', 'vue js', 'web apps', 'design', 'wordpress'];
const CheckboxGroup = Checkbox.Group;
function Sidebar() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [checkedList, setCheckedList] = useState<any>();
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };
  const handleSelect = (e: any) => {
    console.log(e);
  };
  const onChangeCheckbox = (list: any) => {
    setCheckedList(list);
  };
  return (
    <div className="sidebar">
      <div className="flex justify-between pb-2" style={{ borderBottom: '1px solid #e4e4e4' }}>
        <div className="text-xl font-medium" style={{color: '#2a41e8'}}>Filters</div>
        <div className="text-xl font-medium">
          <Tooltip placement="bottom" title={'Reset'}>
            <Button icon={<UndoOutlined style={{color: '#2a41e8'}} />} />
          </Tooltip>
        </div>
      </div>
      <div className="mt-3 mb-8">
        <div className="text-lg font-medium">Name</div>
        <div>
          <Input size="large" placeholder="Name" />
        </div>
      </div>
      <div className="mb-8">
        <div className="text-lg font-medium">Location</div>
        <div>
          <Input size="large" placeholder="location" prefix={<EnvironmentOutlined className="pl-2 pr-1" />} suffix />
        </div>
      </div>

      <div className="mb-8 sidebar__salary">
        <div className="text-lg font-medium">Salary</div>
        <div className="mt-8">
          <Slider max={1500} />
        </div>
      </div>
      <div className="mb-8 sidebar__tags">
        <div className="text-lg font-medium">Tags</div>
        <div>
          {tagsData.map((tag) => (
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
      </div>
      <div className="mb-8">
        <div className="text-lg font-medium">Reviews</div>
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
      </div>
      <div className="pt-2 pb-10">
        <Button className="w-full" type="primary" size="large">
          Search
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
