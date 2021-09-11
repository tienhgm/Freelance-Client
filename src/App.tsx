import Header from "components/Header";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import NotFound from "components/NotFound";
import DashboardUser from "features/DashboardUser";
import Posts from "features/Posts";
import LandingPage from "features/LandingPage";
import { useMemo } from "react";
import Login from "features/Auth";
function App() {
  const pathname = window.location.pathname;
  const hiddenHeader = useMemo(() => {
    const routerExcept = ["/login", "/register"];
    const currentRouter = pathname;
    return routerExcept.indexOf(currentRouter) !== -1;
  }, [pathname]);
  // console.log(hiddenHeader);
  return (
    <div className="App">
      {hiddenHeader ? "" : <Header />}
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/posts" component={Posts} exact/>
        <Route path="/dashboard" component={DashboardUser} exact/>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
