import React, { Component } from 'react';
import axios from 'axios';
import {Navbar, Button} from 'react-bootstrap';

import NodeLaunchPlanRegistration from './NodeLaunchPlanRegistration.js';

function App() {
    return (
        <div>
            <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
            />
            <NodeLaunchPlanRegistration />
        </div>
    )
}

export default App;