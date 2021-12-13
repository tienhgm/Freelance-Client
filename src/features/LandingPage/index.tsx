// import { useAppDispatch } from 'app/hooks';
// import { useEffect } from 'react';
// import { useLocation } from 'react-router';
import Banner from './components/Banner';
import FeatureCity from './components/FeatureCity';
import FeatureJob from './components/FeatureJob';
import Footer from 'components/Footer';
import LandingAgency from './components/LandingAgency';

function LandingPage() {
  return (
    <div>
      <Banner />
      <LandingAgency />
      <FeatureJob />
      <FeatureCity />
      <Footer />
    </div>
  );
}

export default LandingPage;
