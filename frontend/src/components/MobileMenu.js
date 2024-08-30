import React from 'react';
import browseIcon from '../assets/icons/index.svg';
import casinoIcon from '../assets/icons/poker-cards.svg';
import betsIcon from '../assets/icons/ticket.svg';
import sportsIcon from '../assets/icons/ball.svg';
import chatIcon from '../assets/icons/chatea.svg';
import './MobileMenu.css';  // Importa el archivo CSS

const MobileMenu = () => {
  return (
    <div className="menu">
      <div className="menu-item">
        <img src={browseIcon} alt="Browse" className="icon" />
        <div className="label">Browse</div>
      </div>
      <div className="menu-item">
        <img src={casinoIcon} alt="Casino" className="icon" />
        <div className="label">Casino</div>
      </div>
      <div className="menu-item">
        <img src={betsIcon} alt="Bets" className="icon" />
        <div className="label">Bets</div>
      </div>
      <div className="menu-item">
        <img src={sportsIcon} alt="Sports" className="icon" />
        <div className="label">Sports</div>
      </div>
      <div className="menu-item">
        <img src={chatIcon} alt="Chat" className="icon" />
        <div className="label">Chat</div>
      </div>
    </div>
  );
};

export default MobileMenu;