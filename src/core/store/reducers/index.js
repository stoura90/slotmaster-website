import { combineReducers } from 'redux';
import {User} from "./User";
import {NavBar} from "./NavBar";
import {Theme} from "./Theme";
import {BottomBar} from "./BottomBar";
import Modals from "./Modals";
import {Loader} from "./Loader"
import {OTP} from "./Otp"
const root = combineReducers({
    User,
    Modals,
    Theme,
    NavBar,
    BottomBar,
    Loader,
    OTP
});

export default root;
