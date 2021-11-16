import './App.less';
import { Route, Switch } from 'react-router-dom';
import Header from 'components/Header';
import NotFound from 'components/NotFound';
import GuardedRoute from 'components/GuardedRoute';
import routesConfiguration from 'routers/routesConfig';
import BackToTop from 'components/BackTop';
import Loading from 'components/Loading';
import { useAppSelector } from 'app/hooks';
import { Suspense } from 'react';
function App() {
  // const location = useLocation();
  // const { pathname } = location;
  // const hiddenFooter = useMemo(() => {
  //   const routerExcept = [
  //     "/find-freelancers",
  //     "/dashboard",
  //     "/dashboard/settings",
  //     "/dashboard/password",
  //     "/dashboard/message",
  //     "/dashboard/bookmarks",
  //     "/dashboard/jobs-manage",
  //     "/dashboard/post-jobs",
  //     "/dashboard/candidate-manage",
  //     "/dashboard/my-jobs",
  //     "/dashboard/reviews",
  //   ];
  //   const currentRouter = pathname;
  //   return routerExcept.indexOf(currentRouter) !== -1;
  // }, [pathname]);
  const isLoading = useAppSelector((state) => state.app.isLoading);
  return (
    <div className="App">
      <Suspense fallback={null}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Header />
            <Switch>
              {Object.entries(routesConfiguration).map(([key, route]) => (
                <GuardedRoute
                  key={key}
                  path={route.path}
                  component={route.component}
                  guarded={route.guarded}
                  exact={route.exact}
                  role={route.role}
                />
              ))}
              <Route component={NotFound} />
            </Switch>

            <BackToTop />
          </>
        )}
      </Suspense>
    </div>
  );
}

export default App;
