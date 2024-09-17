import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Provider } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Listings from './pages/Listings';
import Profile from './pages/Profile';
import { configureAppStore } from './store';

const store = configureAppStore();

// HUMAN ASSISTANCE NEEDED
// The following component needs review for production readiness.
// Please check the PayPal configuration and ensure all routes are correctly set up.
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PayPalScriptProvider options={{ /* Add PayPal configuration options here */ }}>
        <BrowserRouter>
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/profile" element={<Profile />} />
                {/* Add any additional routes here */}
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </PayPalScriptProvider>
    </Provider>
  );
};

export default App;