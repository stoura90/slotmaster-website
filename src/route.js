import React from 'react';

const main = React.lazy(() => import(("./screens/main/mainScreen")));
const contact = React.lazy(() => import(("./screens/contact/contactScreen")));
const Redirect = React.lazy(() => import(("./components/redirect/redirect")));
const slots = React.lazy(() => import(("./screens/slots/slotsScreen")));
const promo = React.lazy(() => import(("./screens/promo/promoScreen")));
const terms = React.lazy(() => import(("./screens/terms/termScreen")));
const casino = React.lazy(() => import(("./screens/casino/casinoScreen")));
const virtuals = React.lazy(() => import(("./screens/virtuals/virtualsScreen")));
const account = React.lazy(() => import(("./screens/account/accountScreen")));
const sport = React.lazy(() => import(("./screens/sport/sportScreen")));
const live = React.lazy(() => import(("./screens/live/liveScreen")));
const transaction = React.lazy(() => import(("./screens/transaction/transactionScreen")));
const kyc_aml = React.lazy(() => import(("./screens/kyc_aml/kycAmlScreen")));
//const aml = React.lazy(() => import(("./screens/aml/amlScreen")));
const privacy = React.lazy(() => import(("./screens/privacy/privacyScreen")));
const self_exclusion_policy = React.lazy(() => import(("./screens/self_exclusion_policy/sepScreen")));
const privacy_policy = React.lazy(() => import(("./screens/privacy_policy/privacyPolicy")));
const responsible_gaming = React.lazy(() => import(("./screens/responsible_gaming/responsibleGaming")));
const playSlot = React.lazy(() => import(("./screens/playSlot/PlaySlot")));
const verification = React.lazy(() => import(("./screens/verification/verificationScreen")));



export const guestRoutes = [
    { path: '/', name: 'Home', exact:true, component: Redirect, page:"main" },
    { path: '/:lang', name: 'Home', exact:true, component: Redirect, page:"main" },
    { path: '/:lang/main', name: 'Home', exact:true, component: main, page:"main" },
    { path: '/:lang/main/:params', name: 'Home', exact:true, component: main, page:"main" },
    { path: '/:lang/contact', name: 'Home', exact:false, component: contact , page:"contact"},
    { path: '/:lang/slots', name: 'Slots', exact:false, component: slots, page:"slots" },
    { path: '/:lang/virtuals', name: 'Slots', exact:false, component: virtuals, page:"virtuals" },
    { path: '/:lang/promo', name: 'Promo', exact:false, component: promo , page:"promo"},
    { path: '/:lang/terms', name: 'Terms', exact:false, component: terms , page:"terms"},
    { path: '/:lang/casino', name: 'Casino', exact:false, component: casino, page:"casino" },
    { path: '/:lang/sport', name: 'Sport', exact:false, component: sport, page:"sport" },
    { path: '/:lang/live', name: 'Live', exact:false, component: live, page:"live" },
    { path: '/:lang/kyc_aml', name: 'kyc_aml', exact:false, component: kyc_aml , page:"kyc_aml"},
    //{ path: '/:lang/aml', name: 'aml', exact:false, component:aml, page:"aml"},
    { path: '/:lang/privacy', name: 'privacy', exact:false, component:privacy, page:"privacy"},
    { path: '/:lang/self_exclusion_policy', name: 'self_exclusion_policy', exact:false, component:self_exclusion_policy, page:"self_exclusion_policy"},
    { path: '/:lang/privacy_policy', name: 'privacy_policy', exact:false, component:privacy_policy, page:"privacy_policy"},
    { path: '/:lang/responsible_gaming', name: 'responsible_gaming', exact:false, component:responsible_gaming, page:"responsible_gaming"},
    { path: '/:lang/playSlot', name: 'playSlot', exact:false, component:playSlot, page:"playSlot"},
    { path: '/:lang/play', name: 'playSlot', exact:false, component:()=><div></div>, page:"play"},
    { path: '/:lang/verification', name: 'verification', exact:false, component:verification, page:"verification"},


];

export const userRoutes = [
    { path: '/', name: 'Home', exact:true, component: main , page:"main"},
    { path: '/:lang', name: 'Home', exact:true, component: main , page:"main"},
    { path: '/:lang/main', name: 'Home', exact:true, component: main, page:"main" },
    { path: '/:lang/main/:params', name: 'Home', exact:true, component: main , page:"main"},
    { path: '/:lang/contact', name: 'Home', exact:false, component: contact, page:"main" },
    { path: '/:lang/slots', name: 'Slots', exact:false, component: slots, page:"slots" },
    { path: '/:lang/virtuals', name: 'Slots', exact:false, component: virtuals, page:"virtuals" },
    { path: '/:lang/promo', name: 'Promo', exact:false, component: promo, page:"promo" },
    { path: '/:lang/terms', name: 'Terms', exact:false, component: terms , page:"terms"},
    { path: '/:lang/casino', name: 'Casino', exact:false, component: casino, page:"casino" },
    { path: '/:lang/account', name: 'Account', exact:true, component: account, page:"account" },
    { path: '/:lang/account/:route', name: 'Account', exact:false, component: account, page:"account" },
    { path: '/:lang/sport', name: 'Sport', exact:false, component: sport, page:"sport" },
    { path: '/:lang/live', name: 'Live', exact:false, component: live, page:"live" },
    { path: '/:lang/transaction', name: 'Transaction', exact:false, component: transaction , page:"transaction"},
    { path: '/:lang/kyc_aml', name: 'kyc_aml', exact:false, component: kyc_aml , page:"kyc_aml"},
    //{ path: '/:lang/aml', name: 'aml', exact:false, component:aml, page:"aml"},
    { path: '/:lang/privacy', name: 'privacy', exact:false, component:privacy, page:"privacy"},
    { path: '/:lang/self_exclusion_policy', name: 'self_exclusion_policy', exact:false, component:self_exclusion_policy, page:"self_exclusion_policy"},
    { path: '/:lang/privacy_policy', name: 'privacy_policy', exact:false, component:privacy_policy, page:"privacy_policy"},
    { path: '/:lang/responsible_gaming', name: 'responsible_gaming', exact:false, component:responsible_gaming, page:"responsible_gaming"},
    { path: '/:lang/playSlot', name: 'playSlot', exact:false, component:playSlot, page:"playSlot"},
    { path: '/:lang/play', name: 'playSlot', exact:false, component:()=><div></div>, page:"playSlot"},
    { path: '/:lang/verification', name: 'verification', exact:false, component:verification, page:"verification"},
    { path: '/:lang/loader', name: 'verification', exact:false, component:()=><div>please wait</div>, page:"loader"},

];




