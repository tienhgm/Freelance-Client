import "./App.less";
import { useMemo } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Header from "components/Header";
import NotFound from "components/NotFound";
import GuardedRoute from "components/GuardedRoute";
import routesConfiguration from "routers/routesConfig";
import Footer from "components/Footer";
import BackToTop from "components/BackTop";
function App() {
  const location = useLocation();
  const { pathname } = location;
  const hiddenFooter = useMemo(() => {
    const routerExcept = ["/dashboard"];
    const currentRouter = pathname;
    return routerExcept.indexOf(currentRouter) !== -1;
  }, [pathname]);
  return (
    <div className="App">
      <Header />
      <Switch>
        {Object.entries(routesConfiguration).map(([key, route]) => (
          <GuardedRoute
            key={key}
            path={route.path}
            component={route.component}
            guarded={route.guarded}
            exact={route.exact}
          />
        ))}
        <Route component={NotFound} />
      </Switch>
      {!hiddenFooter && <Footer />}
      <BackToTop />
    </div>
  );
}

export default App;
