import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'animate.css';
import Providers from './providers/Providers';

ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Providers>
            <App />
        </Providers>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
