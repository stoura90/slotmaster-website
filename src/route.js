import React from 'react';

const main = React.lazy(() => import(("./screens/main/mainScreen")));
const contact = React.lazy(() => import(("./screens/contact/contactScreen")));
const Redirect = React.lazy(() => import(("./components/redirect/redirect")));



const routes = [
    { path: '/', name: 'Home', exact:true, component: Redirect },
    { path: '/:lang', name: 'Home', exact:true, component: Redirect },
    { path: '/:lang/main', name: 'Home', exact:true, component: main },
    { path: '/:lang/main/:params', name: 'Home', exact:true, component: main },
    { path: '/:lang/contact', name: 'Home', exact:false, component: contact },
];

export default routes;


