import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './App.css'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className='bg'>
    <App />
    </div>
  </React.StrictMode>
);