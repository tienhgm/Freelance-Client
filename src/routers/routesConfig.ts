import AboutUs from "features/AboutUs";
import DashboardUser from "features/DashboardUser";
import FindFreelancer from "features/Freelancers/pages/FindFreelancer";
import FreelancerProfile from "features/Freelancers/pages/FreelancerProfile";
import CompanyDetails from "features/Jobs/pages/CompanyDetails";
import BrowseCompanies from "features/Jobs/pages/CompanyList";
import FindJobs from "features/Jobs/pages/FindJobs";
import JobDetails from "features/Jobs/pages/JobDetails";
import LandingPage from "features/LandingPage";
import Login from "features/LoginRegister/pages/Login";
import Register from "features/LoginRegister/pages/Register";

const routesConfiguration = {
  home: {
    name: 'Home',
    path: '/',
    exact: true,
    breadcrumbs: [],
    navbar: true,
    component: LandingPage,
    routers: [],
    guarded: false,
    role: null,
  },
  browseCompanies: {
    name: 'Browse Companies',
    path: '/browse-companies',
    exact: true,
    breadcrumbs: [],
    navbar: true,
    component: BrowseCompanies,
    routers: [],
    guarded: false,
    role: null,
  },
  companyDetails: {
    name: 'Company Details',
    cPath: '/browse-companies/',
    path: '/browse-companies/:id',
    exact: true,
    breadcrumbs: [],
    navbar: false,
    component: CompanyDetails,
    routers: [],
    guarded: false,
    role: null,
  },
  findJobs: {
    name: 'Find Jobs',
    path: '/find-jobs',
    exact: true,
    breadcrumbs: [],
    navbar: true,
    component: FindJobs,
    routers: [],
    guarded: false,
    role: null,
  },

  jobDetails: {
    name: 'Job Details',
    cPath: '/find-jobs/',
    path: '/find-jobs/:id',
    exact: true,
    breadcrumbs: [],
    navbar: false,
    component: JobDetails,
    routers: [],
    guarded: false,
    role: null,
  },
  findFreelancers: {
    name: 'Find Freelancers',
    path: '/find-freelancers',
    exact: true,
    breadcrumbs: [],
    navbar: true,
    component: FindFreelancer,
    routers: [],
    guarded: false,
    role: null,
  },
  freelancerDetails: {
    name: 'Freelancer Profile',
    cPath: '/find-freelancers/',
    path: '/find-freelancers/:id',
    exact: true,
    breadcrumbs: [],
    navbar: false,
    component: FreelancerProfile,
    routers: [],
    guarded: false,
    role: null,
  },
  dashboard: {
    name: 'Dashboard',
    path: '/dashboard',
    exact: false,
    breadcrumbs: [],
    navbar: true,
    component: DashboardUser,
    routers: [],
    guarded: true,
    role: null,

  },
  aboutUs: {
    name: 'About Us',
    path: '/about-us',
    exact: true,
    breadcrumbs: [],
    navbar: true,
    component: AboutUs,
    routers: [],
    guarded: false,
    role: null,
  },
  login: {
    name: "Login",
    path: "/login",
    exact: true,
    breadcrumbs: [],
    navbar: false,
    component: Login,
    routers: [],
    guarded: false,
    role: null,
  },
  register: {
    name: "Register",
    path: "/register",
    exact: true,
    breadcrumbs: [],
    navbar: false,
    component: Register,
    routers: [],
    guarded: false,
    role: null,
  },
};

export default routesConfiguration;
