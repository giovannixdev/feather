import React from 'react';
import { Button } from '../../common';
import { Link } from 'react-router-dom';


function RenderHomePage() {

    return(
        <div>
            <h1>Welcome to Feather!</h1>
            <Link to='/example'>To Sample Page</Link>
        </div>
    )
}

export default RenderHomePage;