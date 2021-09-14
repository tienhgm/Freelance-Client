import "./App.css";
import Header from "components/Header";
import { Route, Switch } from "react-router-dom";
import NotFound from "components/NotFound";
import DashboardUser from "features/DashboardUser";
import Posts from "features/Posts";
import LandingPage from "features/LandingPage";
import GuardedRoute from "components/GuardedRoute";
import Freelancers from "features/Freelancers";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <GuardedRoute path="/dashboard/user" component={DashboardUser} redirect="/" />
        <Route path="/posts" component={Posts} exact />
        <Route path="/freelancers" component={Freelancers} exact />
        <Route path="/dashboard" component={DashboardUser} exact />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
