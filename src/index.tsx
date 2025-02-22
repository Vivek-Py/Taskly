import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

import './index.css';
import AppRoutes from '@routes/index';
import reportWebVitals from '@utils/reportWebVitals';
import {ToastProvider} from '@atomComponents/Toast';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
    </ToastProvider>
  </React.StrictMode>
);

reportWebVitals();
