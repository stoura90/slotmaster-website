import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./assets/styles/app.css"
import {Provider} from "./core";
import {store as Store} from "./core/store/store";
ReactDOM.render(
  <React.StrictMode>
      <Suspense  fallback={"loading ..."}>
          <Provider store={Store}>
            <App />
          </Provider>
      </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

