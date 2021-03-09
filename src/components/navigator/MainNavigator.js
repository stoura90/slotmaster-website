import React, {useEffect} from "react";
import {BrowserRouter as Router, BrowserRouter, Redirect, Route} from "react-router-dom";
import routes from "../../route";
import {createBrowserHistory} from "history";


const MainNavigator = ()=>{
    const browserHistory = createBrowserHistory();
    useEffect(() => {
       console.log(navigator)
    }, []);


    return (
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
    )

}
export default MainNavigator;
