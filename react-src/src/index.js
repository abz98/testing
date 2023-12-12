import React from 'react';
import ReactDOM from 'react-dom';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

// import reportWebVitals from './reportWebVitals';
import Routes from './components/router';
import AuthProvider from './provider/userContext';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <AuthProvider>
    <Routes />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
