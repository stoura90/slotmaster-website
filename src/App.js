import {Suspense, useEffect} from 'react'
import {MainScreen} from "./screens";

import {store as Store} from './core/store/store'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect, BrowserRouter
} from "react-router-dom";
import {Provider} from "./core";
import routes from "./route";
import {createBrowserHistory} from "history";

const  App=()=> {
const browserHistory = createBrowserHistory();
  return (

      <Provider store={Store}>
          <Suspense  fallback={"loading ..."}>
              <Router history={browserHistory}>
                  <BrowserRouter>
                      {routes.map((route, idx) => {
                          return route.component ? (
                              <Route
                                  key={idx}
                                  path={route.path}
                                  exact={route.exact}
                                  name={route.name}
                                  render={props => (
                                      <route.component {...props} />
                                  )} />
                          ) : <Redirect to={'/ka'}/>;
                      })}
                  </BrowserRouter>

              </Router>
          </Suspense>
      </Provider>

  )
}

export default App;
