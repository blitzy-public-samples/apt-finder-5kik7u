import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import App from 'frontend/src/app';
import { configureAppStore } from 'frontend/src/store';

const store = configureAppStore();

const renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <PayPalScriptProvider options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
          <App />
        </PayPalScriptProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

renderApp();

// HUMAN ASSISTANCE NEEDED
// TODO: Implement hot module replacement (HMR) for development environment
// TODO: Add error boundary for better error handling in production
// TODO: Consider implementing service worker for offline capabilities