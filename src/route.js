import React from 'react';

const main = React.lazy(() => import(("./screens/main/mainScreen")));
const contact = React.lazy(() => import(("./screens/contact/contactScreen")));
const Redirect = React.lazy(() => import(("./components/redirect/redirect")));
const slots = React.lazy(() => import(("./screens/slots/slotsScreen")));
const promo = React.lazy(() => import(("./screens/promo/promoScreen")));
const casino = React.lazy(() => import(("./screens/casino/casinoScreen")));
const deposit = React.lazy(() => import(("./screens/deposit/depositScreen")));
const account = React.lazy(() => import(("./screens/account/accountScreen")));
const sport = React.lazy(() => import(("./screens/sport/sportScreen")));
const transaction = React.lazy(() => import(("./screens/transaction/transactionScreen")));



export const guestRoutes = [
    { path: '/', name: 'Home', exact:true, component: Redirect },
    { path: '/:lang', name: 'Home', exact:true, component: Redirect },
    { path: '/:lang/main', name: 'Home', exact:true, component: main },
    { path: '/:lang/main/:params', name: 'Home', exact:true, component: main },
    { path: '/:lang/contact', name: 'Home', exact:false, component: contact },
    { path: '/:lang/slots', name: 'Slots', exact:false, component: slots },
    { path: '/:lang/promo', name: 'Promo', exact:false, component: promo },
    { path: '/:lang/casino', name: 'Casino', exact:false, component: casino },
    { path: '/:lang/sport', name: 'Sport', exact:false, component: sport },
    { path: '/:lang/live', name: 'Live', exact:false, component: sport },


];

export const userRoutes = [
    { path: '/', name: 'Home', exact:true, component: Redirect },
    { path: '/:lang', name: 'Home', exact:true, component: Redirect },
    { path: '/:lang/main', name: 'Home', exact:true, component: main },
    { path: '/:lang/main/:params', name: 'Home', exact:true, component: main },
    { path: '/:lang/contact', name: 'Home', exact:false, component: contact },
    { path: '/:lang/slots', name: 'Slots', exact:false, component: slots },
    { path: '/:lang/promo', name: 'Promo', exact:false, component: promo },
    { path: '/:lang/casino', name: 'Casino', exact:false, component: casino },
    { path: '/:lang/deposit', name: 'Deposit', exact:false, component: deposit },
    { path: '/:lang/account', name: 'Account', exact:false, component: account },
    { path: '/:lang/sport', name: 'Sport', exact:false, component: sport },
    { path: '/:lang/live', name: 'Live', exact:false, component: sport },
    { path: '/:lang/transaction', name: 'Transaction', exact:false, component: transaction },
];




