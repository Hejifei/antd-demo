import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import HtLayout from './components/HtLayout/Layout';
import {MyRouter} from './router/router'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<MyRouter />, document.getElementById('root'));
registerServiceWorker();
