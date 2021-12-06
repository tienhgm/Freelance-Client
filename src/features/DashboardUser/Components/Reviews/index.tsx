import { DeleteOutlined, EditOutlined, FieldTimeOutlined, ProfileOutlined, TeamOutlined } from '@ant-design/icons';
import { Rate, Pagination, Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { handleGetReviews } from 'app/slices/userSlice';
import Popup from 'components/PopupConfirm';
import { formatDateMonth } from 'helpers/generate';
import { useEffect, useState } from 'react';
import PopupReview from './Components';
import './index.scss';
export default function Reviews() {
  const [isLoading, setIsLoading] = useState(false);
  const [openDialogConfirm, setOpenDialogConfirm] = useState(false);
  const [openDialogReview, setOpenDialogReview] = useState(false);
  const [pageIdxAboutMe, setPageIdxAboutMe] = useState(1);
  const [reviewAboutMe, setReviewAboutMe] = useState([]);
  const handleDeleteReview = (id: any) => {
    console.log('delete');
  };
  const handleChangeReview = (values: any) => {
    console.log('change', values);
  };
  const userId = useAppSelector((state) => state.auth.user.id);
  const dispatch = useAppDispatch();
  const getReviewsToMe = async () => {
    let filters = { page: pageIdxAboutMe };
    try {
      setIsLoading(true);
      const { payload } = await dispatch(handleGetReviews({ userId, filters }));
      if (payload) {
        setReviewAboutMe(payload);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  const changePageIdxAboutMe = (idx: any) => {
    setPageIdxAboutMe(idx);
  };
  useEffect(() => {
    getReviewsToMe();
  }, [pageIdxAboutMe]);
  return (
    <div className="reviews">
      <div className="reviews__title">Reviews</div>
      <div className="flex flex-wrap gap-8 mt-8">
        <div className="reviews__left">
          <div className="title">
            <ProfileOutlined style={{ color: '#2e3fe5', paddingRight: '5px' }} /> Reviews by me
          </div>
          {reviewAboutMe.map((item: any) => (
            <div className="block" key={item.id}>
              {!isLoading ? (
                <>
                  {item.reviewer && (
                    <div className="flex items-center gap-3 block__label">
                      <img
                        src={`http://${item.reviewer.avatar}`}
                        width="30"
                        height="30"
                        style={{ borderRadius: '50%' }}
                        alt="avatar"
                      />
                      <div>{item.reviewer.firstName}</div>
                    </div>
                  )}
                  <div className="flex gap-4">
                    {item.rate && <Rate disabled defaultValue={item.rate} allowHalf />}
                    <div className="text-lg block__date">
                      <FieldTimeOutlined /> <span style={{ color: '#808080' }}>{formatDateMonth(item.createdAt)}</span>
                    </div>
                  </div>
                  {item.comment && <div className="mt-2 mb-2 font-medium break-words">{item.comment}</div>}
                  {/* <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 btn btn__edit" onClick={() => setOpenDialogReview(true)}>
                      <EditOutlined /> Edit review
                    </div>
                    <div className="flex items-center gap-1 btn btn__delete" onClick={() => setOpenDialogConfirm(true)}>
                      <DeleteOutlined /> Delete
                    </div>
                  </div> */}
                </>
              ) : (
                <Skeleton active paragraph={{ rows: 2 }} />
              )}
            </div>
          ))}
          <div className="flex justify-end mt-4 mb-4 mr-4">
            <Pagination defaultCurrent={pageIdxAboutMe} total={50} onChange={changePageIdxAboutMe} />
          </div>
          <Popup
            title="Delete Review"
            isVisible={openDialogConfirm}
            popupText="Delete?"
            handleConfirm={handleDeleteReview}
            handleCancelConfirm={() => setOpenDialogConfirm(false)}
          />
          <PopupReview
            isVisible={openDialogReview}
            handleConfirm={handleChangeReview}
            handleCancelConfirm={() => setOpenDialogReview(false)}
          />
        </div>
        <div className="reviews__right">
          <div className="title">
            <TeamOutlined style={{ color: '#2e3fe5', paddingRight: '5px' }} /> Rate Jobs
          </div>

          <div className="flex justify-end mt-4 mb-4 mr-4">
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  );
}
