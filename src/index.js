import React from 'react';
import ReactDOM from 'react-dom';
import '../src/css/index.css';
import Routers from './routes/Routers';

ReactDOM.render(
  <React.StrictMode>
    <Routers />
  </React.StrictMode>,
  document.getElementById('root')
);
