import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { uploadAvt } from 'app/slices/userSlice';
import { notify } from "utils/notification";
export default function UploadFile() {
  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState('');
  function beforeUpload(file: any) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      notify('error','Image must smaller than 2MB!', null )
      }
    return isLt2M;
  }
  const dispatch = useAppDispatch();
  const previewImg = useAppSelector((state) => state.user.img);
  const handleUploadImg = async (info: any) => {
    setLoading(true);
    
    if (info && info.file) {
      await dispatch(uploadAvt(info.file));
    }
    setLoading(false);
  };
  useEffect(() => {
    setImageUrl(previewImg);
  }, [previewImg]);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div>
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        accept=".png, .jpg"
        showUploadList={false}
        customRequest={handleUploadImg}
        beforeUpload={beforeUpload}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  );
}
