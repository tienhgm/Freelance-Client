import './App.less';
import { Route, Switch, useLocation } from 'react-router-dom';
import Header from 'components/Header';
import NotFound from 'components/NotFound';
import GuardedRoute from 'components/GuardedRoute';
import routesConfiguration from 'routers/routesConfig';
import BackToTop from 'components/BackTop';
import Loading from 'components/Loading';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Suspense, useMemo, useEffect } from 'react';
import { logout } from 'app/slices/authSlice';
function App() {
  const location = useLocation();
  const { pathname } = location;
  const hiddenAll = useMemo(() => {
    const routeHidden = ['/login', '/register'];
    const currentRouter = pathname;
    return routeHidden.indexOf(currentRouter) !== -1;
  }, [pathname]);

  const isLoading = useAppSelector((state) => state.app.isLoading);
  const dispatch = useAppDispatch();
  // window.addEventListener('storage', function (event) {
  //   if (event.key === 'logout-event') {
  //     // ..
  //     window.location.href = '/';
  //   }
  // });
  useEffect(() => {
    if (localStorage.isExpired !== 'false' && (localStorage.isExpired || localStorage.isExpired === 'true')) {
      localStorage.isExpired = false;
      dispatch(logout());
    }
  }, []);
  return (
    <div className="App">
      <Suspense fallback={null}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {!hiddenAll && <Header />}
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
