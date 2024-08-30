// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BalanceContext from './context/BalanceContext';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import GameComponent from './components/GameComponent';
import Keno from './components/games/Keno';

function App() {
  const [balances, setBalances] = useState({
    USD: 0.00,
    BTC: 0.00,
    ETH: 0.00,
    LTC: 0.00,
    TRX: 0.00,
    XRP: 0.00,
    DOGE: 0.00,
    SOL: 0.00,
  });

  return (
    <BalanceContext.Provider value={{ balances, setBalances }}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/game" element={<GameComponent />} />
            <Route path="/casino/games/keno" element={<Keno />} />
          </Route>
        </Routes>
      </Router>
    </BalanceContext.Provider>
  );
}

export default App;
