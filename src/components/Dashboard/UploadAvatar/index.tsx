import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'app/hooks';
import { uploadAvt } from 'app/slices/userSlice';
import { notify } from "utils/notification";
interface Iprops {
  disabled: boolean;
  previewImg: string;
  handleUpdateImg: (img:any) => any;
}
export default function UploadFile(props: Iprops) {
  const {disabled, previewImg, handleUpdateImg} = props;
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
  // const previewImg = useAppSelector((state) => state.auth.user.avatar);
  const handleUploadImg = async (info: any) => {
    setLoading(true);
    
    if (info && info.file) {
      const result = await dispatch(uploadAvt(info.file));
      handleUpdateImg(result.payload)
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
        disabled={disabled}
      >
        {imageUrl ? <img src={`http://${imageUrl}`} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    </div>
  );
}
