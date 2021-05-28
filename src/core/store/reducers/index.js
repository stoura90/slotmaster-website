import { combineReducers } from 'redux';
import {User} from "./User";
import {NavBar} from "./NavBar";
import {Theme} from "./Theme";
import {BottomBar} from "./BottomBar";
import Modals from "./Modals";
import {Loader} from "./Loader"

const root = combineReducers({
    User,
    Modals,
    Theme,
    NavBar,
    BottomBar,
    Loader
});

export default root;
