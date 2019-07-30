import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker.js';
import SignUp from './SignUp.js';


ReactDOM.render(<SignUp />, document.getElementById("root"));

serviceWorker.unregister();