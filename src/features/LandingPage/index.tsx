import React from "react";
import Banner from "./components/Banner";
import FeatureJob from "./components/FeatureJob";
import PopularJob from "./components/PopularJob";

function LandingPage() {
  return (
    <div className="container">
      <Banner />
      <PopularJob />
      <FeatureJob />
    </div>
  );
}

export default LandingPage;
