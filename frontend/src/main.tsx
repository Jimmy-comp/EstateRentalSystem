import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import './index.css'
import { EstateProvider } from './context/EstateContext';
import { UserProvider } from './context/UserContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <EstateProvider>
        <App />
      </EstateProvider>
    </UserProvider>
  </React.StrictMode>,
)
