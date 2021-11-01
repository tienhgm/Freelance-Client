import { useAppDispatch } from "app/hooks";
import { useEffect } from "react";
import { useLocation } from "react-router";
import Banner from "./components/Banner";
import FeatureCity from "./components/FeatureCity";
import FeatureJob from "./components/FeatureJob";
import PopularJob from "./components/PopularJob";
import { activate } from "app/slices/authSlice";
import { handleLoading } from "app/slices/appSlice";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function LandingPage() {
  const dispatch = useAppDispatch();
  let query = useQuery();
  const token = query.get("token");
  // @ts-ignore
  useEffect(async () => {
    if (token) {
      try {
        await dispatch(activate(token));
      } catch (error) {}
    }
  }, [token]);
  return (
    <div>
      <Banner />
      <PopularJob />
      <FeatureJob />
      <FeatureCity />
    </div>
  );
}

export default LandingPage;
