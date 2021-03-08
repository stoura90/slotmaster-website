import React from "react";
const themes ={
    light: {
        foreground: '#000000',
        background: '#eeeeee',
        fontColor: 'black'
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
        fontColor: 'white'
    },
}


const ThemeContext = React.createContext({
    theme: themes.light,
});
export {
    ThemeContext,
    themes
}
