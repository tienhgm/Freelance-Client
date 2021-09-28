import NotFound from "components/NotFound";
import DashboardUser from "features/DashboardUser";
import Freelancers from "features/Freelancers";
import FindJobs from "features/Jobs/pages/FindJobs";
import LandingPage from "features/LandingPage";
const routesConfiguration = {
  home: {
    name: "Home",
    path: "/",
    exact: true,
    breadcrumbs: [],
    navbar: true,
    component: LandingPage,
    routers: [],
    guarded: false
  },
  findJobs: {
    name: "Find Jobs",
    path: "/find-jobs",
    exact: true,
    breadcrumbs: [],
    navbar: true,
    component: FindJobs,
    routers: [],
    guarded: false
  },
  findFreelancers: {
    name: "Find Freelancers",
    path: "/find-freelancers",
    exact: true,
    breadcrumbs: [],
    navbar: true,
    component: Freelancers,
    routers: [],
    guarded: false
  },
  dashboard: {
    name: "Dashboard",
    path: "/dashboard",
    exact: true,
    breadcrumbs: [],
    navbar: true,
    component: DashboardUser,
    routers: [],
    guarded: false
  },
  aboutUs: {
    name: "About Us",
    path: "/about-us",
    exact: true,
    breadcrumbs: [],
    navbar: true,
    component: NotFound,
    routers: [],
    guarded: false
  },
};

export default routesConfiguration;
