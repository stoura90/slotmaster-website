import { combineReducers } from 'redux';
import {User} from "./User";
import {NavBar} from "./NavBar";
import {Theme} from "./Theme";
import {BottomBar} from "./BottomBar";
import Modals from "./Modals";

const root = combineReducers({
    User,
    Modals,
    Theme,
    NavBar,
    BottomBar,
});

export default root;
