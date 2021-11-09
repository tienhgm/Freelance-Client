import NotFound from "components/NotFound";
import DashboardUser from "features/DashboardUser";
import FindFreelancer from "features/Freelancers/pages/FindFreelancer";
import FreelancerProfile from "features/Freelancers/pages/FreelancerProfile";
import FindJobs from "features/Jobs/pages/FindJobs";
import JobDetails from "features/Jobs/pages/JobDetails";
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
  jobDetails: {
    name: "Job Details",
    cPath: "/find-jobs/",
    path: "/find-jobs/:id",
    exact: true,
    breadcrumbs: [],
    navbar: false,
    component: JobDetails,
    routers: [],
    guarded: false
  },
  findFreelancers: {
    name: "Find Freelancers",
    path: "/find-freelancers",
    exact: true,
    breadcrumbs: [],
    navbar: true,
    component: FindFreelancer,
    routers: [],
    guarded: false
  },
  freelancerDetails: {
    name: "Freelancer Profile",
    cPath: "/find-freelancers/",
    path: "/find-freelancers/:id",
    exact: true,
    breadcrumbs: [],
    navbar: false,
    component: FreelancerProfile,
    routers: [],
    guarded: false
  },
  dashboard: {
    name: "Dashboard",
    path: "/dashboard",
    exact: false,
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
