import React from 'react';

const main = React.lazy(() => import(("./screens/main/mainScreen")));
const contact = React.lazy(() => import(("./screens/contact/contactScreen")));
const Redirect = React.lazy(() => import(("./components/redirect/redirect")));
const slots = React.lazy(() => import(("./screens/slots/slotsScreen")));
const promo = React.lazy(() => import(("./screens/promo/promoScreen")));
const terms = React.lazy(() => import(("./screens/terms/termScreen")));
const casino = React.lazy(() => import(("./screens/casino/casinoScreen")));
const deposit = React.lazy(() => import(("./screens/deposit/depositScreen")));
const account = React.lazy(() => import(("./screens/account/accountScreen")));
const sport = React.lazy(() => import(("./screens/sport/sportScreen")));
const live = React.lazy(() => import(("./screens/live/liveScreen")));
const transaction = React.lazy(() => import(("./screens/transaction/transactionScreen")));



export const guestRoutes = [
    { path: '/', name: 'Home', exact:true, component: Redirect, page:"main" },
    { path: '/:lang', name: 'Home', exact:true, component: Redirect, page:"main" },
    { path: '/:lang/main', name: 'Home', exact:true, component: main, page:"main" },
    { path: '/:lang/main/:params', name: 'Home', exact:true, component: main, page:"main" },
    { path: '/:lang/contact', name: 'Home', exact:false, component: contact , page:"contact"},
    { path: '/:lang/slots', name: 'Slots', exact:false, component: slots, page:"slots" },
    { path: '/:lang/promo', name: 'Promo', exact:false, component: promo , page:"promo"},
    { path: '/:lang/terms', name: 'Terms', exact:false, component: terms , page:"terms"},
    { path: '/:lang/casino', name: 'Casino', exact:false, component: casino, page:"casino" },
    { path: '/:lang/sport', name: 'Sport', exact:false, component: sport, page:"sport" },
    { path: '/:lang/live', name: 'Live', exact:false, component: live, page:"live" },


];

export const userRoutes = [
    { path: '/', name: 'Home', exact:true, component: Redirect , page:"main"},
    { path: '/:lang', name: 'Home', exact:true, component: Redirect , page:"main"},
    { path: '/:lang/main', name: 'Home', exact:true, component: main, page:"main" },
    { path: '/:lang/main/:params', name: 'Home', exact:true, component: main , page:"main"},
    { path: '/:lang/contact', name: 'Home', exact:false, component: contact, page:"main" },
    { path: '/:lang/slots', name: 'Slots', exact:false, component: slots, page:"slots" },
    { path: '/:lang/promo', name: 'Promo', exact:false, component: promo, page:"promo" },
    { path: '/:lang/terms', name: 'Terms', exact:false, component: terms , page:"terms"},
    { path: '/:lang/casino', name: 'Casino', exact:false, component: casino, page:"casino" },
    { path: '/:lang/deposit', name: 'Deposit', exact:false, component: deposit, page:"deposit" },
    { path: '/:lang/account', name: 'Account', exact:false, component: account, page:"account" },
    { path: '/:lang/sport', name: 'Sport', exact:false, component: sport, page:"sport" },
    { path: '/:lang/live', name: 'Live', exact:false, component: live, page:"live" },
    { path: '/:lang/transaction', name: 'Transaction', exact:false, component: transaction , page:"transaction"},
];




