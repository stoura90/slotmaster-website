import React from 'react';

const Home = React.lazy(() => import(("./screens/main/mainScreen")));
const Redirect = React.lazy(() => import(("./components/redirect/redirect")));


const routes = [
    { path: '/', name: 'Home', exact:true, component: Redirect },
    { path: '/:lang', name: 'Home', exact:true, component: Redirect },
    { path: '/:lang/:page', name: 'Home', exact:true, component: Home },
    { path: '/:lang/:page/:params', name: 'Home', exact:true, component: Home },


];

export default routes;


