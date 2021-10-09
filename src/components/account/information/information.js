import React, {useEffect} from 'react';
import './style.scss';


const Information = () => {
    return (
        <>
            <div className="row">
                <div className="col-12 col-md-8">


                    <div className="input-label-border">
                        <input type="text" name="name" id="name"/>
                        <label htmlFor="name">Name</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Information;