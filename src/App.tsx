import Header from "components/Header";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import NotFound from "components/NotFound";
import DashboardUser from "features/DashboardUser";
import Posts from "features/Posts";
import LandingPage from "features/LandingPage";
import Login from "features/Auth";
import GuardedRoute from "components/GuardedRoute";
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
    </div>
  );
}

export default App;
