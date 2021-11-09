import { useState } from "react";
import "./index.scss";
import { CaretDownOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Switch, Slider, Tag, Button  } from "antd";

const { CheckableTag } = Tag;
const tagsData: string[] = ['front-end dev', 'angular', 'react', 'vue js', 'web apps', 'design', 'wordpress'];


function Sidebar() {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        setSelectedTags(nextSelectedTags);
    }

    return (
        <div className="sidebar">
            {/* location */}
            <div className="mb-12 sidebar__location">
                <h5>Location</h5>
                <div className="relative block text-gray-400 rounded shadow-md">
                    <input
                        className="h-12"
                        type="text"
                        placeholder="Location"
                    />
                    <EnvironmentOutlined className="absolute top-4 right-4" />
                </div>
            </div>
            {/* category */}
            <div className="mb-12 sidebar__category">
                <h5>Category</h5>
                <div className="relative block text-gray-400 rounded shadow-md cursor-pointer">
                    <div className="button-category">All categories</div>
                    <CaretDownOutlined className="absolute top-5 right-4" />
                </div>
            </div>
            {/* Job Type */}
            <div className="mb-12 sidebar__job">
                <h5>Job Type</h5>
                <div className="switch-list">
                    <div className="switch">
                        <Switch />
                        <span>Freelance</span>
                    </div>
                    <div className="switch">
                        <Switch />
                        <span>Full Time</span>
                    </div>
                    <div className="switch">
                        <Switch />
                        <span>Part Time</span>
                    </div>
                    <div className="switch">
                        <Switch />
                        <span>Internship</span>
                    </div>
                    <div className="switch">
                        <Switch />
                        <span>Temporary</span>
                    </div>
                </div>
            </div>
            {/* salary */}
            <div className="mb-12 sidebar__salary">
                <h5>Salary</h5>
                <div className="mt-14">
                    <Slider
                        range 
                        min={1500}
                        max={15000}
                        defaultValue={[1500, 15000]} 
                    />
                </div>
            </div>
            {/* Tags */}
            <div className="mb-12 sidebar__tags">
                <h5>Tags</h5>
                <div>
                    {tagsData.map(tag => (
                    <CheckableTag
                        className="custom-tag"
                        key={tag}
                        checked={selectedTags.indexOf(tag) > -1}
                        onChange={checked => handleChange(tag, checked)}
                        style={{marginBottom: '5px'}}
                    >
                        <p className="m-2 text-sm">{tag}</p>
                    </CheckableTag>
                    ))}
                </div>
            </div>
            {/* search */}
            <div className="sidebar__search">
                <Button className="w-full" type="primary" size="large">Search</Button>
            </div>
        </div>
    );
}

export default Sidebar;
