import React, {useEffect} from "react";
import {BrowserRouter as Router, BrowserRouter, Redirect, Route} from "react-router-dom";
import {guestRoutes,userRoutes} from "../../route";
import {createBrowserHistory} from "history";
import {useUser} from "../../core/hooks/useUser";


const MainNavigator = ()=>{
    const browserHistory = createBrowserHistory();
    const {User} = useUser();
    useEffect(() => {
       console.log(navigator)
    }, []);




    return (
        <Router history={browserHistory}>
            <BrowserRouter>
                {
                    (User.isLogged?userRoutes:guestRoutes).map((route, idx) => {
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
