import React from 'react';
import './BottomMenu.css';  // Importa el archivo CSS

const BottomMenu = () => {
  return (
    <div className="container">
      <div className="item">Browse</div>
      <div className="item">Casino</div>
      <div className="item">Bets</div>
      <div className="item">Sports</div>
      <div className="item">Chat</div>
    </div>
  );
};

export default BottomMenu;