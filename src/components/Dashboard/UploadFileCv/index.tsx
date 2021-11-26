import { useEffect, useMemo, useState } from 'react';
import './index.scss';
import { Button, message } from 'antd';
import { Upload } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { removeCertification, uploadCertification } from 'app/slices/userSlice';
import axios from 'axios';
type uploadFilePropsType = {
  disabled: boolean;
  // certifications: string[];
};

// let listFile: [] = [];

function UploadFile(props: uploadFilePropsType) {
  const dispatch = useAppDispatch();
  const { disabled } = props;
  const certificationsList = useAppSelector((state) => state.user.curUser.certifications);
  const [showPreview, setShowPreview] = useState('');

  const previewList = useMemo(() => {
    if (certificationsList instanceof Array)
      return certificationsList?.map((certification: any, id: any) => ({
        uid: id,
        status: 'done',
        name: certification,
        url: `http://${certification}`,
      }));
    return [];
  }, [certificationsList]);

  const CertificationItem = useMemo(
    () =>
      ({ originNode, file, fileList }: any) => {
        function logData() {
          if (file?.originFileObj) {
            let url: string = URL.createObjectURL(file?.originFileObj);
            setShowPreview(url);
          } else {
            setShowPreview(`http://${file.name}`);
          }
          console.log('file', file);
          console.log('fileList', fileList);
        }

        document.querySelectorAll<HTMLElement>('.custom-certification-item a').forEach((item) => {
          item.style.pointerEvents = 'none';
        });

        return (
          <div
            className="custom-certification-item"
            style={{
              cursor: 'Pointer',
            }}
            onClick={() => logData()}
          >
            {originNode}
          </div>
        );
      },
    []
  );

  const beforeUpload = (file: any) => {
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      message.error('Image must smaller than 20MB!');
    }
    return isLt20M;
  };

  // const onChange = ({ _, fileList }: any) => {
  //   listFile = fileList.map((file: any) => file.originFileObj);
  // };

  const handleChangeFile = async (options: any) => {
    if (options?.file) {
      // console.log(listFile);
      const result = await dispatch(uploadCertification(options?.file));
      // dispatch(updateCertification(result.payload));
      console.log(result);
      options.onSuccess('OK');
    }
  };

  const handleRemove = async (file: any) => {
    const result = await dispatch(removeCertification(file));
    setShowPreview('');
    console.log(result);
  };

  return (
    <>
      <div>
        {previewList.length > 0 ? (
          <Upload
            beforeUpload={beforeUpload}
            // onChange={onChange}
            // @ts-ignore
            defaultFileList={previewList}
            itemRender={(originNode, file, currFileList) => (
              <CertificationItem originNode={originNode} file={file} fileList={currFileList} />
            )}
            accept=".png, .pdf"
            customRequest={handleChangeFile}
            onRemove={(file) => handleRemove(file)}
          >
            <Button className="uploadBtn" disabled={previewList.length > 2}>
              Push your Certification
            </Button>
          </Upload>
        ) : (
          <Upload
            beforeUpload={beforeUpload}
            // onChange={onChange}
            disabled={disabled}
            accept=".png, .pdf"
            customRequest={handleChangeFile}
          >
            <Button className="uploadBtn">Push your Certification</Button>
          </Upload>
        )}
        {showPreview !== '' && (
          <div
            className="preview fixed left-1/2 top-1/2 rounded-md bg-white shadow-md transition-all"
            style={{
              transform: 'translate(-50%, -50%)',
              width: '75vw',
              height: '80vh',
              minWidth: '700px',
              zIndex: 500,
            }}
          >
            <div
              onClick={() => setShowPreview('')}
              className="bg-black w-screen h-screen fixed left-1/2 top-1/2"
              style={{ transform: 'translate(-50%, -50%)', opacity: 0.6 }}
            ></div>
            <iframe
              src={showPreview}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                borderRadius: '6px',
                overflow: 'hidden',
              }}
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
}

export default UploadFile;
