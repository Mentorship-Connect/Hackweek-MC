//helloworld test get route from back end
//stateless functional component
import React, { Fragment } from 'react';

fetch('http://localhost:5000/v1/api/users')
.then(response => response.json())
.then(data => console.log(data));


const Forbidden = () => (  
    <Fragment>
        <div className="bounds">
            <h1>Test</h1>
        </div>
    </Fragment>
);

export default Forbidden;