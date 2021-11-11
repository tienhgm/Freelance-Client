import { useEffect, useState } from 'react';
import { PlusOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, Slider, Select, Form, DatePicker } from 'antd';
import UploadAvatar from 'components/Dashboard/UploadAvatar';
import UploadFile from 'components/Dashboard/UploadFileCv';
import MyEditor from 'components/Editor';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { gender, roleWork, typeWork } from 'utils/enum';
import { handleGetProfile, handleUpdateProfile } from 'app/slices/userSlice';
import { handleGetSkills, handleGetCities } from 'app/slices/resourceSlice';
import iconMinus from 'assets/images/minus.svg';
// import DatePicker  from 'components/DatePicker';
import './index.scss';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function Settings() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [minimalHourlyRate, setMinimalHourlyRate] = useState(0);
  const [educations, setEducations] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [listSkills, setListSkills] = useState([]);
  const [listCities, setListCities] = useState([]);

  const watchEducation = (value: any) => {
    setEducations(value);
  };
  const watchIntroduce = (value: any) => {
    setIntroduce(value);
  };
  const handleSetPayHourly = (value: number) => {
    setMinimalHourlyRate(value);
  };
  const currentUser = useAppSelector((state) => state.auth.user);

  const getSkill = async () => {
    const { payload } = await dispatch(handleGetSkills());
    setListSkills(payload);
  };
  const getCities = async () => {
    const { payload } = await dispatch(handleGetCities());
    setListCities(payload);
  };
  const getProfile = async () => {
    const { payload } = await dispatch(handleGetProfile());

    form.setFieldsValue({
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      minimalHourlyRate: payload.minimalHourlyRate,
      phoneNumber: payload.phoneNumber,
      gender: payload.gender,
    });
    setMinimalHourlyRate(payload.minimalHourlyRate);
  };
  useEffect(() => {
    getProfile();
    getSkill();
    getCities();
  }, []);
  const onFinish = async (values: any) => {
    // console.log(values);
    values.skills = "vuejs";
    values.introduce  = introduce;
    values.nationality  = 23;
    values.educations   = educations;
    values.languages   = "vuejs";
    const result = await dispatch(handleUpdateProfile(values));
    console.log(result);
  };
  const dateFormat = 'YYYY/MM/DD';
  return (
    <Form form={form} onFinish={onFinish}>
      <div className="h-full overflow-auto settings">
        <h1 className="text-2xl">Settings</h1>
        {/* info basic */}
        <div className="account">
          <div className="account__title">
            <div className="flex items-center ">
              <UserOutlined style={{ color: '#2e3fe5' }} className="mr-4" /> My account
            </div>
          </div>
          <div className="grid my-4 lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
            <div className="self-center col-span-2 mt-4">
              <UploadAvatar disabled={false} previewImg={'http://14.225.192.239:4000/public/avatars/5cbdc414-6c78-4120-8110-00ee34cb8001.png'} />
            </div>
            <div className="col-span-9">
              <div className="grid mt-1 mb-3 lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
                <div className="col-span-6">
                  <div className="mb-1 text-xl font-bold">
                    Email <span className="required-field">*</span>
                  </div>
                  <Form.Item name="email">
                    <Input size="large" placeholder="Email" disabled />
                  </Form.Item>
                </div>
                <div className="col-span-6 lg:ml-6">
                  <div className="mb-1 text-xl font-bold">
                    Gender <span className="required-field">*</span>
                  </div>
                  <Form.Item name="gender" rules={[{ required: true, message: 'Please select your gender' }]}>
                    <Select size="large">
                      {gender.map((item, idx) => (
                        <Option value={item.value} key={idx}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
              <div className="grid lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
                <div className="col-span-6">
                  <div className="mb-1 text-xl font-bold">
                    First Name <span className="required-field">*</span>
                  </div>
                  <Form.Item name="firstName" rules={[{ required: true, message: 'Please input your first name' }]}>
                    <Input size="large" placeholder="First name" />
                  </Form.Item>
                </div>
                <div className="col-span-6 lg:ml-6">
                  <div className="mb-1 text-xl font-bold">
                    Last Name <span className="required-field">*</span>
                  </div>
                  <Form.Item name="lastName" rules={[{ required: true, message: 'Please input your last name' }]}>
                    <Input size="large" placeholder="Last name" />
                  </Form.Item>
                </div>
              </div>
              <div className="grid lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
                <div className="col-span-6">
                  <div className="mb-1 text-xl font-bold">Phone number</div>
                  <Form.Item name="phoneNumber">
                    <Input type="number" size="large" placeholder="Phone number" />
                  </Form.Item>
                </div>
                <div className="col-span-6 lg:ml-6">
                  <div className="mb-1 text-xl font-bold">Address</div>
                  <Form.Item name="address">
                    <Input size="large" placeholder="Address" />
                  </Form.Item>
                </div>
              </div>
              <div className="grid lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
                <div className="col-span-6">
                  <div className="mb-1 text-xl font-bold">Hobbies</div>
                  <Form.Item name="hobbies">
                    <Input size="large" placeholder="Hobbies" />
                  </Form.Item>
                </div>
                <div className="col-span-6 lg:ml-6">
                  <div className="mb-1 text-xl font-bold">Date of birth</div>
                  <Form.Item name="dateOfBirth">
                    <DatePicker style={{ width: 'calc(100%)' }} size="large" format={dateFormat} />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        {/* /info basic */}
        {/* profile */}
        <div className="mt-8 profile">
          <div className="profile__title">
            <div className="flex items-center ">
              <ShoppingOutlined style={{ color: '#2e3fe5' }} className="mr-4" /> My Profile
            </div>
          </div>
          <div className="grid my-4 lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1 profile__experience">
            <div className="col-span-3">
              <div className="mb-1 text-xl font-bold">Set your minimal hourly rate</div>
              <div className="text-lg font-medium">${minimalHourlyRate}</div>
              <Form.Item name="minimalHourlyRate">
                <Slider max={150} onChange={handleSetPayHourly} />
              </Form.Item>
            </div>
            <div className="col-span-4 lg:ml-10">
              <div className="mb-3 text-xl font-bold">
                Skills <span className="required-field">*</span>
              </div>
              <Form.Item name="skills">
                <Select
                  mode="multiple"
                  allowClear
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Choose your skill"
                >
                  {listSkills.map((item, idx) => (
                    <Option value={item} key={idx}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-span-4 lg:ml-4">
              <div className="mb-3 text-xl font-bold">City</div>
              <Form.Item name="nationality">
                <Select size="large" style={{ width: '100%' }} placeholder="Select a city">
                  {listCities.map((item, idx) => (
                    <Option value={item} key={idx}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="grid lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1 ">
            <div className="col-span-5 mb-3 text-lg font-bold">Introduce yourself</div>
            <div className="col-span-11">
              <MyEditor valueChange={''} height={200} handleChange={watchIntroduce} />
            </div>
          </div>
          <div className="grid lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1 ">
            <div className="col-span-5 mb-3 text-lg font-bold">Educations</div>
            <div className="col-span-11">
              <MyEditor valueChange={''} height={150} handleChange={watchEducation} />
            </div>
          </div>
          <div className="grid my-4 lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
            <div className="col-span-11">
              <div className="mb-3 text-xl font-bold">Work Experience</div>
              <Form.List name="experiences">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <div className="flex items-center gap-2 my-3">
                        <div className="pb-2" style={{ borderBottom: '1px solid #999', width: 'calc(97%)' }}>
                          <div className="flex gap-4">
                            <Form.Item
                              {...restField}
                              name={[name, 'companyName']}
                              label="Company name"
                              fieldKey={[fieldKey, 'companyName']}
                              rules={[{ required: true, message: 'Missing company name' }]}
                            >
                              <Input placeholder="Company Name" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'role']}
                              label="Role"
                              fieldKey={[fieldKey, 'role']}
                              rules={[{ required: true, message: 'Missing role name' }]}
                            >
                              <Select style={{ width: '200px' }} placeholder="Select your role">
                                {roleWork.map((item, idx) => (
                                  <Option value={item} key={idx}>
                                    {item}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'type']}
                              label="Type"
                              fieldKey={[fieldKey, 'type']}
                              rules={[{ required: true, message: 'Missing type name' }]}
                            >
                              <Select style={{ width: '200px' }} placeholder="Select your type">
                                {typeWork.map((item, idx) => (
                                  <Option value={item} key={idx}>
                                    {item}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          </div>
                          <div>
                            <Form.Item
                              {...restField}
                              name={[name, 'range-picker']}
                              label="Start - End date"
                              fieldKey={[fieldKey, 'range-picker']}
                              rules={[{ required: true, message: 'Missing range-picker' }]}
                            >
                              <RangePicker />
                            </Form.Item>
                          </div>
                          <div>
                            <Form.Item
                              {...restField}
                              name={[name, 'description']}
                              label="Description"
                              fieldKey={[fieldKey, 'description']}
                              rules={[{ required: true, message: 'Missing Description' }]}
                            >
                              <TextArea showCount maxLength={100} />
                            </Form.Item>
                          </div>
                        </div>

                        <img
                          src={iconMinus}
                          width="24"
                          height="24"
                          onClick={() => remove(name)}
                          style={{ cursor: 'pointer' }}
                        />
                        {/* <MinusCircleOutlined onClick={() => remove(name)} /> */}
                      </div>
                    ))}
                    <Form.Item>
                      <Button
                        className="flex items-center"
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>
          <div>
            <div className="mb-3 text-lg font-bold">Certifications</div>
            <div style={{ width: 'calc(20%)' }}>
              <UploadFile disabled={false} />
            </div>
          </div>
        </div>
        {/* /profile */}
        <div className="pb-6 mt-4">
          <Button type="primary" size="large" htmlType="submit">
            Save Changes
          </Button>
        </div>
      </div>
    </Form>
  );
}
