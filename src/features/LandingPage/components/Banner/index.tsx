import { Form, Select, Input, Button } from "antd";
import "./index.scss";
function Banner() {
  const { Option } = Select;
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("value", values);
  };
  return (
    <div className="banner min-w-1/2">
      <div className="banner__fulfil p-28">
        {/* title */}
        <div className="flex">
          <div>
            <div className="font-medium lg:text-2xl md:text-xl xs:text-lg">
              Hire experts or be hired for any job, any time.
            </div>
            <div className="lg:text-2xl md:text-xl xs:text-lg">
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
            <div className="flex flex-wrap items-center gap-2">
              <div style={{ width: 300 }}>
                <Form.Item name="location">
                  <Select placeholder="Please select a location">
                    <Option value="china">Viet Nam</Option>
                    <Option value="usa">U.S.A</Option>
                  </Select>
                </Form.Item>
              </div>
              <div style={{ width: 400 }} className="">
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
        <div className="flex mt-16 flex-nowrap statistical">
          <div className="statistical__column">
            <div className="font-medium lg:text-3xl md:text-xl xs:text-lg">
              1586
            </div>
            <div className="title lg:text-lg md:text-base xs:text-sm">
              Jobs Posted
            </div>
          </div>
          <div className="statistical__column">
            <div className="font-medium lg:text-3xl md:text-xl xs:text-lg">
              6969
            </div>
            <div className="title lg:text-lg md:text-base xs:text-sm">
              Blogs
            </div>
          </div>
          <div className="statistical__column">
            <div className="font-medium lg:text-3xl md:text-xl xs:text-lg">
              1586
            </div>
            <div className="title lg:text-lg md:text-base xs:text-sm">
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
