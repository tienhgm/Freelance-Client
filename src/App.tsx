import Header from "components/Header";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import NotFound from "components/NotFound";
import DashboardUser from "features/DashboardUser";
import Posts from "features/Posts";
import LandingPage from "features/LandingPage";
import Login from "features/Auth/LoginForm";
import GuardedRoute from "components/GuardedRoute";
import Dialog from "features/Auth/Dialog";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/posts" component={Posts} />
        <GuardedRoute path="/dashboard/user" component={DashboardUser} redirect="/" />
        <Route component={NotFound} />
      </Switch>
      <Dialog isOpen={true} isLogin={true} />
    </div>
  );
}

export default App;
