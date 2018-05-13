import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HtLayout from './components/HtLayout/Layout';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<HtLayout></HtLayout>, document.getElementById('root'));
registerServiceWorker();
