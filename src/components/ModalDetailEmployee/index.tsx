import { Modal, Skeleton } from 'antd';
import { useAppDispatch } from 'app/hooks';
import { useEffect, useState } from 'react';
import { handleGetDetailFreelancer } from 'app/slices/userSlice';
import './index.scss';
type ModalDetail = {
  title: string;
  isVisible: boolean;
  handleConfirm: (id?: any) => any;
  handleCancelConfirm: () => any;
  userId: string;
};
export default function ModalDetailEmloyee({
  isVisible,
  handleConfirm,
  title,
  handleCancelConfirm,
  userId,
}: ModalDetail) {
  const [visible, setVisible] = useState(false);
  const [freelancerDetail, setFreelancerDetail] = useState<any>({});
  const [jobs, setJobs] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    setVisible(false);
    handleConfirm();
  };
  const handleCancel = () => {
    handleCancelConfirm();
    setVisible(false);
  };
  const dispatch = useAppDispatch();
  const getDetailFreelancer = async (id: string) => {
    try {
      setLoading(true);
      const { payload } = await dispatch(handleGetDetailFreelancer(id));
      if (!!payload) {
        const { cv, jobs } = payload;
        console.log(payload);
        setFreelancerDetail(cv);
        setJobs(jobs);
      }
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  useEffect(() => {
    if (userId && !!visible) {
      getDetailFreelancer(userId);
    }
  }, [userId, visible]);
  useEffect(() => setVisible(isVisible), [isVisible]);
  return (
    <>
      <Modal
        className="custom-modal"
        width={1000}
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Skeleton active loading={loading}>
          <div className="detail">
            1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea
            deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead
            ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao
            jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea
            deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead
            ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao
            jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea
            deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead
            ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao
            jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea
            deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead
            ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao
            jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea
            deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead
            ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao
            jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea
            deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead
            ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao
            jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea
            deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead
            ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao
            jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea
            deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead
            ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao
            jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea
            deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead
            ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao
            jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea
            deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead
            ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao
            jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea
            deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead
            ea dea deadeadeadeadeadeadeadae1231ajdsiao jdklajelk dead ea dea deadeadeadeadeadeadeadae
          </div>
        </Skeleton>
      </Modal>
    </>
  );
}
