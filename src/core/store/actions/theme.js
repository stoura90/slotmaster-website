import {CHANGE_THEME} from "../actionTypes";

const changeTheme = (theme) => {
    return {
        type: CHANGE_THEME,
        payload: theme
    }
}

export default {
    changeTheme
}
