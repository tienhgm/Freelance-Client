import { EditOutlined, FieldTimeOutlined, ProfileOutlined, TeamOutlined } from '@ant-design/icons';
import { Rate, Pagination, Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { handleGetReviewsOfCompany } from 'app/slices/userSlice';
import { formatDateMonth } from 'helpers/generate';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PopupReview from './Components';
import './index.scss';
export default function ReviewsCompany() {
  const [isLoadingByCompany, setIsLoadingByCompany] = useState(false);
  const [isLoadingFromUserToCompany, setIsLoadingFromUserToCompany] = useState(false);
  const [openDialogReview, setOpenDialogReview] = useState(false);
  const [totalReviewByCompany, setTotalReviewByCompany] = useState(0);
  const [totalReviewFromUserToCompany, setTotalReviewFromUserToCompany] = useState(0);
  const [pageIdxByCompany, setPageIdxByCompany] = useState(1);
  const [pageIdxFromUserToCompany, setPageIdxFromUserToCompany] = useState(1);
  const [reviewByCompany, setReviewByCompany] = useState([]);
  const [reviewFromUserToCompany, setReviewFromUserToCompany] = useState([]);
  const handleChangeReview = (values: any) => {
    console.log('change', values);
  };
  const userRole = useAppSelector((state) => state.user.curUser.role);
  const companyId = useAppSelector((state) => state.user.curUser?.company?.id);
  const history = useHistory();
  const dispatch = useAppDispatch();
  const getReviewsOfCompany = async () => {
    let filters = { page: pageIdxByCompany, records: 4 };
    const data = {
      companyId: companyId,
      type: 'byCompany',
      filters,
    };
    try {
      setIsLoadingByCompany(true);
      const { payload } = await dispatch(handleGetReviewsOfCompany(data));
      if (payload) {
        setReviewByCompany(payload.reviews);
        setTotalReviewByCompany(payload.totalRecords);
      }
    } catch (error) {
    } finally {
      setIsLoadingByCompany(false);
    }
  };
  const getReviewsFromUserToCompany = async () => {
    let filters = { page: pageIdxFromUserToCompany, records: 4 };
    const data = {
      companyId: companyId,
      type: 'fromUser',
      filters,
    };
    try {
      setIsLoadingFromUserToCompany(true);
      const { payload } = await dispatch(handleGetReviewsOfCompany(data));
      if (payload) {
        setReviewFromUserToCompany(payload.reviews);
        setTotalReviewFromUserToCompany(payload.totalRecords);
      }
    } catch (error) {
    } finally {
      setIsLoadingFromUserToCompany(false);
    }
  };
  const changePageIdxByCompany = (idx: any) => {
    setPageIdxByCompany(idx);
  };
  const changePageIdxFromUserToCompany = (idx: any) => {
    setPageIdxFromUserToCompany(idx);
  };
  const goToDetailJob = (jobId: any) => {
    window.open(`/find-jobs/${jobId}`, 'blank');
  };
  const goToDetailFreelancer = (userId: any) => {
    window.open(`/find-freelancers/${userId}`, 'blank');
  };
  const goToDetailCompany = (companyId: any) => {
    window.open(`/browse-companies/${companyId}`, 'blank');
  };
  useEffect(() => {
    if (userRole === 1) {
      getReviewsOfCompany();
    }
  }, [pageIdxByCompany]);
  useEffect(() => {
    if (userRole === 1) {
      getReviewsFromUserToCompany();
    }
  }, [pageIdxFromUserToCompany]);
  return (
    <div className="reviews">
      <div className="reviews__title">Reviews</div>
      <div className="flex flex-wrap gap-8 mt-8">
        <div className="reviews__left">
          <div className="title">
            <ProfileOutlined style={{ color: '#2e3fe5', paddingRight: '5px' }} /> Reviews by Company
          </div>
          {reviewByCompany.map((item: any) => (
            <div className="block" key={item.id}>
              {!isLoadingByCompany ? (
                <>
                  <div className="flex justify-between mb-1">
                    <div className="mb-2 text-lg font-medium">
                      Job:{' '}
                      <span
                        className="cursor-pointer"
                        onClick={() => goToDetailJob(item.jobId)}
                        style={{ color: '#2e3fe5' }}
                      >
                        {item.jobTitle}
                      </span>
                    </div>

                    <div className="text-lg block__date">
                      <FieldTimeOutlined /> <span style={{ color: '#808080' }}>{formatDateMonth(item.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {item.reviewee && (
                      <div className="flex items-center gap-3 block__label">
                        <img
                          src={`http://${item.reviewee.avatar}`}
                          width="30"
                          height="30"
                          style={{ borderRadius: '50%' }}
                          alt="avatar"
                        />
                        <div className="cursor-pointer" onClick={() => goToDetailFreelancer(item.reviewee.id)}>
                          {item.reviewee.firstName + ' ' + item.reviewee.lastName}
                        </div>
                      </div>
                    )}
                    {item.rate && <Rate disabled defaultValue={item.rate} allowHalf />}
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center gap-3 font-medium block__label">
                      <img
                        src={`http://${item.company.logo}`}
                        width="30"
                        height="30"
                        style={{ borderRadius: '50%' }}
                        alt="avatar"
                      />
                      <div className="cursor-pointer" onClick={() => goToDetailCompany(item.company.id)}>
                        {item.company.name}
                      </div>
                    </div>
                    {item.comment && (
                      <div className="mb-2 ml-12 font-medium break-words " style={{ color: '#999' }}>
                        {item.comment}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 btn btn__edit" onClick={() => setOpenDialogReview(true)}>
                      <EditOutlined /> Edit review
                    </div>
                  </div>
                </>
              ) : (
                <Skeleton active paragraph={{ rows: 2 }} />
              )}
            </div>
          ))}
          <div className="flex justify-end mt-4 mb-4 mr-4">
            <Pagination
              defaultCurrent={pageIdxByCompany}
              total={totalReviewByCompany}
              pageSize={4}
              onChange={changePageIdxByCompany}
            />
          </div>
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
          {reviewFromUserToCompany.map((item: any) => (
            <div className="block" key={item.id}>
              {!isLoadingFromUserToCompany ? (
                <>
                  <div className="flex justify-between mb-1">
                    <div className="mb-2 text-lg font-medium">
                      Job:{' '}
                      <span
                        className="cursor-pointer"
                        onClick={() => goToDetailJob(item.jobId)}
                        style={{ color: '#2e3fe5' }}
                      >
                        {item.jobTitle}
                      </span>
                    </div>
                    <div className="text-lg block__date">
                      <FieldTimeOutlined /> <span style={{ color: '#808080' }}>{formatDateMonth(item.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {item.reviewer && (
                      <div className="flex items-center gap-3 block__label">
                        <img
                          src={`http://${item.company.logo}`}
                          width="30"
                          height="30"
                          style={{ borderRadius: '50%' }}
                          alt="avatar"
                        />
                        <div className="cursor-pointer" onClick={() => goToDetailCompany(item.company.id)}>
                          {item.company.name}
                        </div>
                      </div>
                    )}
                    {item.rate && <Rate disabled defaultValue={item.rate} allowHalf />}
                  </div>

                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center gap-3 font-medium block__label">
                      <img
                        src={`http://${item.reviewer.avatar}`}
                        width="30"
                        height="30"
                        style={{ borderRadius: '50%' }}
                        alt="avatar"
                      />
                      <div className="cursor-pointer" onClick={() => goToDetailFreelancer(item.reviewee.id)}>
                        {item.reviewer.firstName + ' ' + item.reviewer.lastName}
                      </div>
                    </div>
                    {item.comment && (
                      <div className="mb-2 ml-12 font-medium break-words " style={{ color: '#999' }}>
                        {item.comment}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 btn btn__edit" onClick={() => setOpenDialogReview(true)}>
                      Detail
                    </div>
                    {/* <div className="flex items-center gap-1 btn btn__delete" onClick={() => setOpenDialogConfirm(true)}>
                      <DeleteOutlined /> Delete
                    </div> */}
                  </div>
                </>
              ) : (
                <Skeleton active paragraph={{ rows: 2 }} />
              )}
            </div>
          ))}
          <div className="flex justify-end mt-4 mb-4 mr-4">
            <Pagination
              defaultCurrent={pageIdxFromUserToCompany}
              pageSize={3}
              total={totalReviewFromUserToCompany}
              onChange={changePageIdxFromUserToCompany}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
