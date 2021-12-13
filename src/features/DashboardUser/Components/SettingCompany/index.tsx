import { useEffect, useState } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Input, Button, Select, Form, DatePicker } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { handleGetArea, handleGetCountries } from 'app/slices/resourceSlice';
import { convertDateToString } from 'helpers/generate';
import moment from 'moment';
import './index.scss';
import { handleGetDetailCompany } from 'app/slices/companySlice';
import { changeLogo, updateCompany } from 'apis/companyModule';

const { Option } = Select;
const { TextArea } = Input;

export default function SettingCompany() {
  const companyId = useAppSelector((state) => state.auth.user.company.id);
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [listArea, setListArea] = useState([]);
  const [listCountries, setListCountries] = useState([]);
  const formatEstablish = 'MM-DD-YYYY';
  const [logo, setLogo] = useState<any>();
  // const chooseLogo = (e: any) => {
  //   setLogo(e.target.files[0]);
  // };

  const getArea = async () => {
    const { payload } = await dispatch(handleGetArea());
    setListArea(payload);
  };

  const getCountries = async () => {
    const { payload } = await dispatch(handleGetCountries());
    setListCountries(payload);
  };

  const getProfileCompany = async () => {
    try {
      const { payload } = await dispatch(handleGetDetailCompany(companyId));
      if (payload && payload.information) {
        setLogo(payload.logo);
        form.setFieldsValue({
          name: payload.name,
          numberOfEmployees: payload.information.numberOfEmployees,
          countryId: payload.country.id,
          areaId: payload.area.id,
          description: payload.information.description,
          phoneNumber: payload.information.phoneNumber,
          paxNumber: payload.information.paxNumber,
        });
      }
    } catch (error) { }
  };
  useEffect(() => {
    getProfileCompany();
    getCountries();
    getArea();
  }, []);

  const onChangeLogo = (event: any) => {
    const logo = URL.createObjectURL(event.target.files[0]);
    console.log(typeof logo)
    setLogo(logo);

  }

  const onFinish = async (values: any) => {
    await updateCompany({
      ...values,
      dateOfEstablishment: "2021/12/7",
      socialNetworks: { facebook: "ss" },
      addresses: ["string"],
      businessFieldIds: [],
    }, companyId)
    // @ts-ignore
    const logo = document.querySelector("#avatar")?.files[0];
    if (logo) {
      await changeLogo(logo, companyId);
    }
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <div className="h-full overflow-auto settings">
        <h1 className="text-2xl">Settings</h1>
        <div className="account">
          <div className="account__title">
            <div className="flex items-center gap-2 font-medium">
              <SettingOutlined style={{ color: '#2a41e8' }} />
              Profile company
            </div>
          </div>
          <div className="grid lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
            <div className="col-span-5 lg:mr-4">
              <div className="mb-1 text-lg font-medium">
                Company Name <span className="required-field">*</span>
              </div>
              <Form.Item name="name">
                <Input placeholder="Company name" />
              </Form.Item>
            </div>
            <div className="col-span-5">
              <div className="mb-1 text-lg font-medium">
                Total employees <span className="required-field">*</span>
              </div>
              <Form.Item
                name="numberOfEmployees"
                rules={[{ required: true, message: 'Please input number of employees' }]}
              >
                <Input type="number" placeholder="Total employees" />
              </Form.Item>
            </div>
          </div>
          <div className="grid lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
            <div className="col-span-5 lg:mr-4 mb-4" >
              <div className="mb-1 text-lg font-medium">Logo</div>
              <input id="avatar" type="file" placeholder="Logo" onChange={onChangeLogo} hidden={!!logo} />
              <label htmlFor="avatar" className="preview-logo w-28 h-28">
                <img src={logo?.indexOf("blob") != 0 ? `http://${logo}` : logo} className='w-full h-full' style={{ objectFit: "cover" }} />
              </label>
            </div>
          </div>
          <div className="grid lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
            <div className="col-span-5 lg:mr-4">
              <div className="mb-1 text-lg font-medium">
                Country <span className="required-field">*</span>
              </div>
              <Form.Item name="countryId" rules={[{ required: true, message: 'Please select company country' }]}>
                {listCountries && (
                  <Select style={{ width: '100%' }} placeholder="Select country">
                    {listCountries?.map((item: any) => (
                      <Option value={item.id} key={item.id}>
                        {item.name} - {item.emoji}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </div>
            <div className="col-span-5 ">
              <div className="mb-1 text-lg font-medium ">
                Area <span className="required-field">*</span>
              </div>
              <Form.Item name="areaId" rules={[{ required: true, message: 'Please select company area' }]}>
                {listArea && (
                  <Select allowClear style={{ width: '100%' }} placeholder="Select area">
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
            <div className="col-span-5 lg:mr-4">
              <div className="mb-1 text-lg font-medium">
                Phone number <span className="required-field">*</span>
              </div>
              <Form.Item name="phoneNumber" rules={[{ required: true, message: 'Please input company phone number' }]}>
                <Input placeholder="Phone number" />
              </Form.Item>
            </div>
            <div className="col-span-5 ">
              <div className="mb-1 text-lg font-medium ">
                Pax number <span className="required-field">*</span>
              </div>
              <Form.Item name="paxNumber" rules={[{ required: true, message: 'Please input company pax number' }]}>
                <Input placeholder="Pax number" />
              </Form.Item>
            </div>
          </div>
          <div className="grid lg:grid-cols-12 md:grid-cols-6 xs:grid-cols-1">
            <div className="col-span-10">
              <div className="mb-1 text-lg font-medium ">
                Description <span className="required-field">*</span>
              </div>
              <Form.Item name="description" rules={[{ required: true, message: 'Please input company pax number' }]}>
                <TextArea autoSize={{ minRows: 4, maxRows: 6 }} placeholder="Description" />
              </Form.Item>
            </div>
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
