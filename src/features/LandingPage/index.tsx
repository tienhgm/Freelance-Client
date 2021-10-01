import React from "react";
import Banner from "./components/Banner";
import FeatureCity from "./components/FeatureCity";
import FeatureJob from "./components/FeatureJob";
import PopularJob from "./components/PopularJob";

function LandingPage() {
  return (
    <div >
      <Banner />
      <PopularJob />
      <FeatureJob />
      <FeatureCity />
    </div>
  );
}

export default LandingPage;
