import { Form, Select, Input, Button } from "antd";
import "./index.scss";
function Banner() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("value", values);
  };
  return (
    <div className="banner">
      <div className="banner__fulfil p-28">
        {/* title */}
        <div className="grid grid-cols-2">
          <div>
            <div className="text-2xl font-medium">
              Hire experts or be hired for any job, any time.
            </div>
            <div className="text-2xl">
              Thousands of small businesses use{" "}
              <span className="color-blue">Freelance</span> to turn their ideas
              into reality.
            </div>
          </div>
        </div>
        {/* end title */}
        {/* search jobs */}
        <div className="mt-24">
          <Form
            form={form}
            name="horizontal_login"
            onFinish={onFinish}
            size="large"
          >
            <div className="flex items-center">
              <div style={{ minWidth: 200, width: 300 }}>
                <Form.Item name="location">
                  <Select placeholder="Please select a location">
                    <Option value="china">Viet Nam</Option>
                    <Option value="usa">U.S.A</Option>
                  </Select>
                </Form.Item>
              </div>
              <div style={{ minWidth: 200, width: 400 }} className="mr-2">
                <Form.Item name="job-name">
                  <Input placeholder="jobs name" />
                </Form.Item>
              </div>
              <div>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Search
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
        {/* end search jobs */}
        {/* statistical  */}
        <div className="flex mt-16 statistical">
          <div className="statistical__column">
            <div className="text-3xl font-medium">1586</div>
            <div className="title" style={{ color: "#888" }}>
              Jobs Posted
            </div>
          </div>
          <div className="statistical__column">
            <div className="text-3xl font-medium">6969</div>
            <div className="title" style={{ color: "#888" }}>
              Blogs
            </div>
          </div>
          <div className="statistical__column">
            <div className="text-3xl font-medium">1586</div>
            <div className="title" style={{ color: "#888" }}>
              Jobs Posted
            </div>
          </div>
        </div>
        {/* end statistical  */}
      </div>
    </div>
  );
}

export default Banner;
