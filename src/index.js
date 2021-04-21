import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from 'components/app';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'

import CssBaseline from '@material-ui/core/CssBaseline';

import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from 'theme'

import store from 'store'

const history = syncHistoryWithStore(createBrowserHistory(), store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
