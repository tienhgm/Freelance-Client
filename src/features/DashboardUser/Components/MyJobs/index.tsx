import { Select, Input } from 'antd';
import TableDetail from './Components/TableDetail';

export default function MyJobs() {
  const { Option } = Select;
  function handleSelect(value: any) {
    console.log(`selected ${value}`);
  }
  const data = [
    {
      key: '1',
      job_name: 'Service organization',
      company_name: 'Josh Etc',
      status: 1,
      payment: 100,
    },
    {
      key: '2',
      job_name: 'Work numui',
      company_name: 'Anemia',
      status: 2,
      payment: 0,
    },
    {
      key: '3',
      job_name: 'Chat application',
      company_name: 'SuTek Co',
      status: 3,
      payment: 300,
    },
    {
      key: '4',
      job_name: 'Bot fake auth',
      company_name: 'Memi Co',
      status: 4,
      payment: 0,
    },
    {
      key: '5',
      job_name: 'Bot fake auth',
      company_name: 'Memi Co',
      status: 4,
      payment: 0,
    },
    {
      key: '6',
      job_name: 'alohehe',
      company_name: 'Memi Co',
      status: 0,
      payment: 0,
    },
    {
      key: '7',
      job_name: 'Bot fake auth',
      company_name: 'Memi Co',
      status: 0,
      payment: 0,
    },
    {
      key: '8',
      job_name: 'Bot fake auth',
      company_name: 'Memi Co',
      status: 1,
      payment: 0,
    },
    {
      key: '9',
      job_name: 'DortBimb auth',
      company_name: 'Memi Co',
      status: 2,
      payment: 0,
    },
    {
      key: '10',
      job_name: 'Robot bevb',
      company_name: 'Memi Co',
      status: 3,
      payment: 0,
    },
    {
      key: '11',
      job_name: 'Maemmit auth',
      company_name: 'Memi Co',
      status: 4,
      payment: 0,
    },
  ];
  return (
    <div className="dashboard__earning">
      <div className="flex items-center justify-between">
        <div className="m-3 text-xl font-medium">List Jobs</div>
        <div>
          <Select style={{ width: 120, marginRight: '20px' }} onChange={handleSelect} placeholder="Payment" allowClear>
            <Option value="asc">Ascending</Option>
            <Option value="desc">Descending</Option>
          </Select>
          <Select style={{ width: 120 }} onChange={handleSelect} placeholder="Status" allowClear>
            <Option value="Applied">Applied</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Doned">Doned</Option>
            <Option value="Cancel">Cancel</Option>
          </Select>
        </div>
      </div>
      <TableDetail data={data} />
    </div>
  );
}
