// components/GameComponent.js
import React, { useContext } from 'react';
import BalanceContext from '../context/BalanceContext';

const GameComponent = () => {
  const { balances, setBalances } = useContext(BalanceContext);

  const handleWin = (amount) => {
    setBalances((prevBalances) => ({
      ...prevBalances,
      BTC: prevBalances.BTC + amount,
    }));
  };

  return (
    <div>
      <h2>Tu balance de BTC es: {balances.BTC}</h2>
      <button onClick={() => handleWin(10)}>Ganar 10 BTC</button>
    </div>
  );
};

export default GameComponent;
