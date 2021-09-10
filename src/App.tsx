import Header from "components/Header";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import NotFound from "components/NotFound";
import DashboardUser from "features/DashboardUser";
import Posts from "features/Posts";
import LandingPage from "features/LandingPage";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/posts" component={Posts} />
        <Route path="/dashboard/user" component={DashboardUser} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
