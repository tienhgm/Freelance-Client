// import { useAppDispatch } from 'app/hooks';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router';
import Banner from './components/Banner';
import FeatureCity from './components/FeatureCity';
import FeatureJob from './components/FeatureJob';
import PopularJob from './components/PopularJob';
import Footer from 'components/Footer';

function LandingPage() {
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
