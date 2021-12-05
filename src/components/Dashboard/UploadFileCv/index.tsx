import { useMemo, useState } from 'react';
import './index.scss';
import { Button, message } from 'antd';
import { Upload } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { removeCertification, uploadCertification } from 'app/slices/userSlice';

export default function UploadFile() {
  const dispatch = useAppDispatch();
  const certificationsList = useAppSelector((state) => state.user.curUser.certifications);
  const [showPreview, setShowPreview] = useState('');
  const [fileList, setFileList] = useState([]);
  const previewList = useMemo(() => {
    if (certificationsList instanceof Array)
      return certificationsList?.map((certification: any, id: any) => ({
        uid: id,
        status: 'done',
        name: `${certification.split('/').pop()}`,
        url: `http://${certification}`,
      }));
    return [];
  }, [certificationsList]);

  const CertificationItem = useMemo(
    () =>
      ({ originNode, file, fileList }: any) => {
        setFileList(fileList);
        function showPreview() {
          if (file?.originFileObj) {
            let url: string = URL.createObjectURL(file?.originFileObj);
            setShowPreview(url);
          } else {
            setShowPreview(file.url);
          }
        }

        document
          .querySelectorAll<HTMLElement>('.custom-certification-item .ant-upload-list-item-name')
          .forEach((item) => {
            item.addEventListener('click', function (event: any) {
              event.preventDefault();
              showPreview();
            });
          });

        return (
          <div
            className="custom-certification-item"
            style={{
              cursor: 'Pointer',
            }}
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

  const handleChangeFile = async (options: any) => {
    if (options?.file) {
      await dispatch(uploadCertification(options?.file));
      options.onSuccess('OK');
    }
  };

  const handleRemove = async (file: any) => {
    let fileIndex = fileList.findIndex((item: any) => file.uid === item.uid);
    await dispatch(removeCertification(certificationsList[fileIndex]));
  };

  return (
    <>
      <div>
        {previewList.length > 0 ? (
          <Upload
            beforeUpload={beforeUpload}
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
          <Upload beforeUpload={beforeUpload} accept=".png, .pdf" customRequest={handleChangeFile}>
            <Button className="uploadBtn">Push your Certification</Button>
          </Upload>
        )}
        {showPreview !== '' && (
          <div
            className="fixed transition-all bg-white rounded-md shadow-md preview left-1/2 top-1/2"
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
              className="fixed w-screen h-screen bg-black left-1/2 top-1/2"
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


