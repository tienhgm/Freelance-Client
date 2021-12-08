import { useEffect, useState } from 'react';
import { MinusCircleOutlined, PlusOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Input, Button, Select, Form, DatePicker, Space } from 'antd';
import UploadAvatar from 'components/Dashboard/UploadAvatar';
import UploadFile from 'components/Dashboard/UploadFileCv';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import CkEditor from 'components/Editor';
import { gender, roleWork, typeWork, listLevel } from 'utils/enum';
import { changeAvatar, handleGetProfile, handleUpdateProfile, updateCertifications } from 'app/slices/userSlice';
import { handleGetSkills, handleGetArea, handleGetLanguages, handleGetCountries } from 'app/slices/resourceSlice';
import iconMinus from 'assets/images/minus.svg';
import { convertDateToString } from 'helpers/generate';
import moment from 'moment';
import './index.scss';
import { REGEX_CHECK_EMAIL } from 'constants/regex';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function Settings() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [educations, setEducations] = useState('');
  const [introduce, setIntroduce] = useState('');
  const [listSkills, setListSkills] = useState([]);
  const [listArea, setListArea] = useState([]);
  const [listLanguages, setListLanguages] = useState([]);
  const [listCountries, setListCountries] = useState([]);
  const [previewImg, setPreviewImg] = useState('');
  const [loaded, setLoaded] = useState(false);
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
  const getArea = async () => {
    const { payload } = await dispatch(handleGetArea());
    setListArea(payload);
  };
  const getLanguages = async () => {
    const { payload } = await dispatch(handleGetLanguages());
    setListLanguages(payload);
  };
  const getCountries = async () => {
    const { payload } = await dispatch(handleGetCountries());
    setListCountries(payload);
  };

  const userId = useAppSelector((state) => state.auth.user.id);
  const getProfile = async () => {
    const { payload } = await dispatch(handleGetProfile(userId));

    if (payload) {
      let experiencesPayload = [...payload.experiences];
      if (experiencesPayload) {
        experiencesPayload = experiencesPayload?.map((item: any) => {
          return {
            ...item,
            rangePicker: [moment(item.startDate), moment(item.endDate)],
          };
        });
      }
      let skillsPayload: any = [...payload.skills];
      if (skillsPayload) {
        skillsPayload = skillsPayload.map((item: any) => {
          return {
            skillId: +item.id,
            experience: item.experience,
          };
        });
      }
      let languages = [...payload.languages];
      if (languages) {
        languages = languages.map((item: any) => {
          return item.id;
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
        skills: skillsPayload,
        areaId: payload.area?.id,
        experiences: experiencesPayload,
        languageIds: languages,
        briefIntroduce: payload.briefIntroduce,
        countryId: payload.area?.countryId,
      });
      setIntroduce(payload.introduce);
      setEducations(payload.educations);
      setPreviewImg(payload.avatar);
      dispatch(updateCertifications(payload.certifications));
      setLoaded(true);
    }
  };
  useEffect(() => {
    getProfile();
    getSkill();
    getLanguages();
    getCountries();
    getArea();
  }, []);
  const onFinish = async (values: any) => {
    delete values.email;
    let cloneSkills = [...values.skills];
    values.skills = cloneSkills.map((item: any) => {
      return {
        skillId: item.skillId,
        experience: item.experience,
      };
    });
    values.nationalityId = 194;
    values.introduce = introduce;
    values.educations = educations;
    !!!values.dateOfBirth
      ? (values.dateOfBirth = '')
      : (values.dateOfBirth = convertDateToString(values.dateOfBirth._d));
    values.hobbies = [''];
    let experiences = values.experiences;
    if (experiences) {
      experiences = experiences?.map((item: any) => {
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
    dispatch(changeAvatar(img));
    setPreviewImg(img);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <div className="h-full overflow-auto settings">
        <h1 className="text-2xl">Settings</h1>

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
                  <div className="mb-1 text-xl font-medium">
                    Email <span className="required-field">*</span>
                  </div>
                  <Form.Item name="email">
                    <Input placeholder="Email" disabled />
                  </Form.Item>
                </div>
                <div className="col-span-6 lg:ml-6">
                  <div className="mb-1 text-xl font-medium">
                    Gender <span className="required-field">*</span>
                  </div>
                  <Form.Item name="gender" rules={[{ required: true, message: 'Please select your gender' }]}>
                    <Select>
                      {gender?.map((item, idx) => (
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
                  <div className="mb-1 text-xl font-medium">
                    First Name <span className="required-field">*</span>
                  </div>
                  <Form.Item name="firstName" rules={[{ required: true, message: 'Please input your first name' }]}>
                    <Input placeholder="First name" />
                  </Form.Item>
                </div>
                <div className="col-span-6 lg:ml-6">
                  <div className="mb-1 text-xl font-medium">
                    Last Name <span className="required-field">*</span>
                  </div>
                  <Form.Item name="lastName" rules={[{ required: true, message: 'Please input your last name' }]}>
                    <Input placeholder="Last name" />
                  </Form.Item>
                </div>
              </div>
              <div className="grid lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
                <div className="col-span-6">
                  <div className="mb-1 text-xl font-medium">
                    Phone number <span className="required-field">*</span>
                  </div>
                  <Form.Item name="phoneNumber" rules={[{ required: true, message: 'Please input your Phone number' }]}>
                    <Input placeholder="Phone number" />
                  </Form.Item>
                </div>
                <div className="col-span-6 lg:ml-6">
                  <div className="mb-1 text-xl font-medium">
                    Date of birth <span className="required-field">*</span>
                  </div>
                  <Form.Item name="dateOfBirth" rules={[{ required: true, message: 'Please input...' }]}>
                    <DatePicker style={{ width: 'calc(100%)' }} format={dateFormat} />
                  </Form.Item>
                </div>
              </div>
              <div className="grid lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
                <div className="col-span-6 ">
                  <div className="mb-1 text-xl font-medium">
                    Country <span className="required-field">*</span>
                  </div>
                  <Form.Item name="countryId" rules={[{ required: true, message: 'Please select your nationality' }]}>
                    {listCountries && (
                      <Select style={{ width: '100%' }} placeholder="Select your country">
                        {listCountries?.map((item: any) => (
                          <Option value={item.id} key={item.id}>
                            {item.name} - {item.emoji}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </div>
                <div className="col-span-6 lg:ml-6">
                  <div className="mb-1 text-xl font-medium ">
                    Area <span className="required-field">*</span>
                  </div>
                  <Form.Item name="areaId" rules={[{ required: true, message: 'Please select your area' }]}>
                    {listArea && (
                      <Select allowClear style={{ width: '100%' }} placeholder="Select your area">
                        {listArea?.map((item: any) => (
                          <Option value={item.id} key={item.id}>
                            {item.name}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </Form.Item>
                </div>
              </div>
              <div className="grid lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
                <div className="col-span-12">
                  <div className="mb-1 text-xl font-medium">
                    Address <span className="required-field">*</span>
                  </div>
                  <Form.Item name="address" rules={[{ required: true, message: 'Please input your Address' }]}>
                    <Input placeholder="Address" />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 profile">
          <div className="profile__title">
            <div className="flex items-center ">
              <ShoppingOutlined style={{ color: '#2e3fe5' }} className="mr-4" /> My Profile
            </div>
          </div>

          <div className="grid my-4 lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
            <div className="col-span-11">
              <div className="mb-2 text-xl font-bold">
                Skills <span className="required-field">*</span>
              </div>
              <Form.List name="skills">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={[name, 'skillId']}
                          label="Skill"
                          fieldKey={[fieldKey, 'skillId']}
                          rules={[{ required: true, message: 'Please select skill' }]}
                        >
                          <Select size="large" style={{ width: 'calc(250px)' }} allowClear placeholder="Choose skill">
                            {listSkills?.map((item: any) => (
                              <Option value={item.id} key={item.id}>
                                {item.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'experience']}
                          fieldKey={[fieldKey, 'experience']}
                          label="Experience"
                          rules={[{ required: true, message: 'Please select experience' }]}
                        >
                          <Select
                            size="large"
                            style={{ width: 'calc(211px)' }}
                            allowClear
                            placeholder="Choose experience"
                          >
                            {listLevel?.map((item: any, idx: number) => (
                              <Option value={item} key={idx}>
                                {item}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block style={{ width: 'calc(609px)' }}>
                        <div className="flex items-center justify-center">
                          <PlusOutlined /> Add field
                        </div>
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>
          <div className="grid my-4 lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1 profile__experience">
            <div className="col-span-6">
              <div className="mb-2 text-lg font-bold ">
                Brief introduce <span className="required-field">*</span>
              </div>
              <div>
                <Form.Item name="briefIntroduce">
                  <Input size="large" placeholder="Short introduce" />
                </Form.Item>
              </div>
            </div>
            <div className="col-span-5 lg:ml-6">
              <div className="mb-2 text-xl font-bold ">
                Languages <span className="required-field">*</span>
              </div>
              <Form.Item name="languageIds" rules={[{ required: true, message: 'Please select your languages' }]}>
                <Select
                  mode="multiple"
                  allowClear
                  size="large"
                  style={{ width: '100%' }}
                  placeholder="Select your languages"
                >
                  {listLanguages?.map((item: any) => (
                    <Option value={item.id} key={item.id}>
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
                                {typeWork?.map((item, idx) => (
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
                                {roleWork?.map((item, idx) => (
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
                      <Button type="dashed" onClick={() => add()} block>
                        <div className="flex items-center justify-center">
                          <PlusOutlined /> Add field
                        </div>
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>
          <div>
            <div className="mb-3 text-lg font-bold">Certifications</div>
            {loaded && (
              <div style={{ width: 'calc(20%)' }}>
                <UploadFile />
              </div>
            )}
          </div>
        </div>
        <div className="pb-6 mt-4">
          <Button type="primary" size="large" htmlType="submit">
            Save Changes
          </Button>
        </div>
      </div>
    </Form>
  );
}
