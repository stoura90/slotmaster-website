import React from 'react';
import {Redirect as Route} from 'react-router-dom';

const Redirect = () => {
    return(
        <Route to={'/ka/main'}/>
    )
}

export default Redirect;