import "./App.css";
import Header from "components/Header";
import { Route, Switch } from "react-router-dom";
import NotFound from "components/NotFound";
import GuardedRoute from "components/GuardedRoute";
import routesConfiguration from "routers/routesConfig";
import Footer from "components/Footer";
import BackToTop from "components/BackTop";
function App() {
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
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
