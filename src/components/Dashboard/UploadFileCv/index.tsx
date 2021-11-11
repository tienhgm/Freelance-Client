import  { useState } from "react";
import './index.scss'
import { Button, message } from "antd";
import { Upload } from "antd";
interface Iprops {
  disabled: boolean;
}
function UploadFile(props: Iprops) {
  const { disabled } = props;
  const [listFile, setListFile] = useState<any>([]);
  const beforeUpload = (file: any) => {
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      message.error("Image must smaller than 20MB!");
    }
    return isLt20M;
  };

  const handleChangeFile = (e: any) => {
    setListFile([e.file]);
  };
  return (
    <Upload
      beforeUpload={beforeUpload}
      onChange={(e: any) => handleChangeFile(e)}
      disabled={disabled}
    >
      <Button className="uploadBtn">Push your Certification</Button>
    </Upload>
  );
}

export default UploadFile;
