import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from './Provider'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Provider>
      <App />
    </Provider>

    </BrowserRouter>,
  document.getElementById('root')
);
