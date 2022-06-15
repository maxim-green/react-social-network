import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/styles/normalize.scss';
import 'assets/styles/global.scss';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { App } from 'components/App';
import { reportWebVitals } from 'reportWebVitals';
import { store } from 'store/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();
