import {Provider,connect} from 'react-redux';
import {ThemeContext,themes} from "./theme/themeContext";
import Actions from './store/actions';
import {i18n} from './i18n/i18n'
import {useTranslation} from "react-i18next";
import Request from "./http/http";
import Utils from './utils';
import {Config} from "./config";

//სატესტო კომენტარი1
export {
    Provider,
    ThemeContext,
    Actions,
    i18n,
    useTranslation,
    Request,
    Utils,
    Config,

}
