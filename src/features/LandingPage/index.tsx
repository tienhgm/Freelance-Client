// import { useAppDispatch } from 'app/hooks';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router';
import Banner from './components/Banner';
import FeatureCity from './components/FeatureCity';
import FeatureJob from './components/FeatureJob';
import PopularJob from './components/PopularJob';
// import { activate } from 'app/slices/authSlice';
import Footer from 'components/Footer';
// import queryString from 'query-string';

function LandingPage() {
  // const dispatch = useAppDispatch();
  window.addEventListener('storage', function (event) {
    if (event.key == 'logout-event') {
      // ..
      window.location.href = '/';
    }
  });
  // const location = useLocation();
  // const token = queryString.parse(location.search);
  // const activeAccount = async (token: any) => {
  //   try {
  //     await dispatch(activate(token));
  //   } catch (error) {}
  // };
  // useEffect(() => {
  //   if (token) {
  //     activeAccount(token);
  //   }
  // }, [token]);
  return (
    <div>
      <Banner />
      <PopularJob />
      <FeatureJob />
      <FeatureCity />
      <Footer />
    </div>
  );
}

export default LandingPage;
