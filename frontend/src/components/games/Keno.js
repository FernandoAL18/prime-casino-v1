import React, { useState, useContext } from 'react';
import axios from 'axios';
import BalanceContext from '../../context/BalanceContext';
import './Keno.css';

const Keno = () => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [betAmount, setBetAmount] = useState('');
  const [riskLevel, setRiskLevel] = useState('High');
  const { balances, setBalances } = useContext(BalanceContext); // Acceder al contexto de balances

  const maxNumbers = 10;

  const toggleNumberSelection = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== number));
    } else if (selectedNumbers.length < maxNumbers) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handleBet = async () => {
    if (selectedNumbers.length === 0) {
      alert("Please select at least one number.");
      return;
    }

    if (!betAmount || isNaN(betAmount) || parseFloat(betAmount) <= 0) {
      alert("Please enter a valid bet amount.");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('User not authenticated');
      return;
    }

    try {
      const betData = { selectedNumbers, betAmount: parseFloat(betAmount), riskLevel };
      const response = await axios.post('http://localhost:5001/api/keno/play', betData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { newBalances, gameResult } = response.data;

      // Actualizar los balances en el contexto
      setBalances(newBalances);

      // Mostrar el resultado del juego al usuario (puedes modificar esto según el diseño deseado)
      alert(`Game Result: ${gameResult.win ? 'You won!' : 'You lost.'} Amount Won: ${gameResult.amountWon}`);
    } catch (error) {
      console.error('Error placing bet:', error);
      alert(`Failed to place bet: ${error.response?.data?.msg || 'Unknown error'}`);
    }
  };

  return (
    <div className="keno-container">
      <div className="keno-header">
        <h2>Keno</h2>
        <div className="keno-controls">
          <input 
            type="number" 
            placeholder="Bet Amount" 
            value={betAmount} 
            onChange={(e) => setBetAmount(e.target.value)} 
            min="0.01" // Establece un valor mínimo para la apuesta
            step="0.01"
          />
          <select value={riskLevel} onChange={(e) => setRiskLevel(e.target.value)}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
      <div className="keno-grid">
        {[...Array(40)].map((_, i) => {
          const number = i + 1;
          return (
            <div 
              key={number} 
              className={`keno-number ${selectedNumbers.includes(number) ? 'selected' : ''}`} 
              onClick={() => toggleNumberSelection(number)}
            >
              {number}
            </div>
          );
        })}
      </div>
      <div className="keno-footer">
        <button onClick={() => setSelectedNumbers([])}>Clear Table</button>
        <button onClick={handleBet} className="keno-bet-button">Bet</button>
      </div>
    </div>
  );
};

export default Keno;
