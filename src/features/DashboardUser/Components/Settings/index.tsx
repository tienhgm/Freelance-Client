import { useEffect, useState } from 'react';
import { PlusOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, Select, Form, DatePicker } from 'antd';
import UploadAvatar from 'components/Dashboard/UploadAvatar';
import UploadFile from 'components/Dashboard/UploadFileCv';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import CkEditor from 'components/Editor';
import { gender, roleWork, typeWork } from 'utils/enum';
import { handleGetProfile, handleUpdateProfile } from 'app/slices/userSlice';
import { handleGetSkills, handleGetCities, handleGetLanguages } from 'app/slices/resourceSlice';
import iconMinus from 'assets/images/minus.svg';
import { convertDateToString } from 'utils/generate';
import moment from 'moment';
import './index.scss';
import { REGEX_CHECK_EMAIL } from 'constants/regex';
import { changeAvatar } from 'app/slices/authSlice';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function Settings() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [educations, setEducations] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [listSkills, setListSkills] = useState([]);
  const [listCities, setListCities] = useState([]);
  const [listLanguages, setListLanguages] = useState([]);
  const [previewImg, setPreviewImg] = useState('');
  const watchEducation = (value: any) => {
    setEducations(value);
  };
  const watchIntroduce = (value: any) => {
    setIntroduce(value);
  };

  const getSkill = async () => {
    const { payload } = await dispatch(handleGetSkills());
    setListSkills(payload);
  };
  const getCities = async () => {
    const { payload } = await dispatch(handleGetCities());
    setListCities(payload);
  };
  const getLanguages = async () => {
    const { payload } = await dispatch(handleGetLanguages());
    setListLanguages(payload);
  };
  const userId = useAppSelector((state) => state.auth.user.id);
  const getProfile = async () => {
    const { payload } = await dispatch(handleGetProfile(userId));

    if (payload) {
      let experiencesPayload = payload.experiences;
      if (!!experiencesPayload) {
        experiencesPayload = experiencesPayload.map((item: any) => {
          return {
            ...item,
            rangePicker: [moment(item.startDate), moment(item.endDate)],
          };
        });
      }
      form.setFieldsValue({
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        phoneNumber: payload.phoneNumber,
        gender: payload.gender,
        hobbies: payload.hobbies,
        address: payload.address,
        dateOfBirth: moment(payload.dateOfBirth),
        skills: payload.skills,
        nationality: payload.nationality,
        experiences: experiencesPayload,
        languages: payload.languages,
      });
      setIntroduce(payload.introduce);
      setEducations(payload.educations);
      setPreviewImg(payload.avatar);
    }
  };
  useEffect(() => {
    getProfile();
    getSkill();
    getCities();
    getLanguages();
  }, []);
  const onFinish = async (values: any) => {
    delete values.email;
    values.minimalHourlyRate = 100;
    values.introduce = introduce;
    values.educations = educations;
    !!!values.dateOfBirth
      ? (values.dateOfBirth = '')
      : (values.dateOfBirth = convertDateToString(values.dateOfBirth._d));
    values.hobbies = [''];
    // handler experiences
    let experiences = values.experiences;
    if (!!experiences) {
      experiences = experiences.map((item: any) => {
        return {
          ...item,
          startDate: convertDateToString(item.rangePicker[0]._d),
          endDate: convertDateToString(item.rangePicker[1]._d),
          type: [item.type],
        };
      });
      experiences.forEach((item: any) => {
        delete item.rangePicker;
      });
      values.experiences = experiences;
    }
    await dispatch(handleUpdateProfile(values));
  };
  const dateFormat = 'YYYY/MM/DD';
  const handleUpdateImg = (img: any) => {
    dispatch(changeAvatar(img))
    setPreviewImg(img);
  };

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
              <UploadAvatar disabled={false} previewImg={previewImg} handleUpdateImg={handleUpdateImg} />
            </div>
            <div className="col-span-9">
              <div className="grid mt-1 mb-3 lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
                <div className="col-span-6">
                  <div className="mb-1 text-xl font-bold">
                    Email <span className="required-field">*</span>
                  </div>
                  <Form.Item name="email">
                    <Input placeholder="Email" disabled />
                  </Form.Item>
                </div>
                <div className="col-span-6 lg:ml-6">
                  <div className="mb-1 text-xl font-bold">
                    Gender <span className="required-field">*</span>
                  </div>
                  <Form.Item name="gender" rules={[{ required: true, message: 'Please select your gender' }]}>
                    <Select>
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
                    <Input placeholder="First name" />
                  </Form.Item>
                </div>
                <div className="col-span-6 lg:ml-6">
                  <div className="mb-1 text-xl font-bold">
                    Last Name <span className="required-field">*</span>
                  </div>
                  <Form.Item name="lastName" rules={[{ required: true, message: 'Please input your last name' }]}>
                    <Input placeholder="Last name" />
                  </Form.Item>
                </div>
              </div>
              <div className="grid lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
                <div className="col-span-6">
                  <div className="mb-1 text-xl font-bold">
                    Phone number <span className="required-field">*</span>
                  </div>
                  <Form.Item name="phoneNumber" rules={[{ required: true, message: 'Please input your Phone number' }]}>
                    <Input type="number" placeholder="Phone number" />
                  </Form.Item>
                </div>
                <div className="col-span-6 lg:ml-6">
                  <div className="mb-1 text-xl font-bold">
                    Address <span className="required-field">*</span>
                  </div>
                  <Form.Item name="address" rules={[{ required: true, message: 'Please input your Address' }]}>
                    <Input placeholder="Address" />
                  </Form.Item>
                </div>
              </div>
              <div className="grid lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
                <div className="col-span-6 ">
                  <div className="mb-1 text-xl font-bold">
                    Date of birth <span className="required-field">*</span>
                  </div>
                  <Form.Item name="dateOfBirth" rules={[{ required: true, message: 'Please input...' }]}>
                    <DatePicker style={{ width: 'calc(100%)' }} format={dateFormat} />
                  </Form.Item>
                </div>
                <div className="col-span-6 lg:ml-6">
                  <div className="mb-1 text-xl font-bold ">
                    City <span className="required-field">*</span>
                  </div>
                  <Form.Item name="nationality">
                    <Select style={{ width: '100%' }} placeholder="Select a city">
                      {listCities.map((item: any) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
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
            <div className="col-span-6 ">
              <div className="mb-2 text-xl font-bold">
                Skills <span className="required-field">*</span>
              </div>
              <Form.Item name="skills" rules={[{ required: true, message: 'Please select skills' }]}>
                <Select
                  mode="multiple"
                  allowClear
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Choose your skill"
                >
                  {listSkills.map((item: any) => (
                    <Option value={item.name} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-span-5 lg:ml-6">
              <div className="mb-2 text-xl font-bold ">
                Languages <span className="required-field">*</span>
              </div>
              <Form.Item name="languages" rules={[{ required: true, message: 'Please select your languages' }]}>
                <Select
                  mode="multiple"
                  allowClear
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select your languages"
                >
                  {listLanguages.map((item: any) => (
                    <Option value={item.name} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="grid lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
            <div className="col-span-5 mb-3 text-lg font-bold">
              Introduce yourself <span className="required-field">*</span>
            </div>
            <div className="col-span-11">
              <CkEditor valueChange={introduce} handleChange={watchIntroduce} />
            </div>
          </div>
          <div className="grid mt-4 lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
            <div className="col-span-5 mb-3 text-lg font-bold">
              Educations <span className="required-field">*</span>
            </div>
            <div className="col-span-11">
              <CkEditor valueChange={educations} handleChange={watchEducation} />
            </div>
          </div>
          <div className="grid my-4 lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
            <div className="col-span-11">
              <div className="mb-3 text-xl font-bold">Work Experience</div>
              <Form.List name="experiences">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <div key={key} className="flex items-center gap-2 my-3">
                        <div className="pb-2" style={{ borderBottom: '1px solid #999', width: 'calc(97%)' }}>
                          <div className="flex gap-4">
                            <Form.Item
                              {...restField}
                              name={[name, 'companyName']}
                              label="Company name"
                              fieldKey={[fieldKey, 'companyName']}
                              rules={[{ required: true, message: 'Missing Company Name' }]}
                            >
                              <Input style={{ width: '287px' }} placeholder="Company Name" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'companyEmail']}
                              label="Company Email"
                              fieldKey={[fieldKey, 'companyEmail']}
                              rules={[
                                { required: true, message: 'Missing Company Email' },
                                {
                                  pattern: REGEX_CHECK_EMAIL,
                                  message: 'Email Invalid',
                                },
                              ]}
                            >
                              <Input style={{ width: '200px' }} placeholder="Company email" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'type']}
                              label="Type"
                              fieldKey={[fieldKey, 'type']}
                              rules={[{ required: true, message: 'Missing Type' }]}
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
                          <div className="flex gap-6">
                            <Form.Item
                              {...restField}
                              name={[name, 'rangePicker']}
                              label="Start - End date"
                              fieldKey={[fieldKey, 'rangePicker']}
                              rules={[{ required: true, message: 'Missing Range Picker' }]}
                            >
                              <RangePicker />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'role']}
                              label="Role"
                              fieldKey={[fieldKey, 'role']}
                              rules={[{ required: true, message: 'Missing Role Name' }]}
                            >
                              <Select style={{ width: '200px' }} placeholder="Select your role">
                                {roleWork.map((item, idx) => (
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
                          alt="minus"
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
