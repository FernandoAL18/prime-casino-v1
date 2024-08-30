import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/icons/logo.png';
import btcIcon from '../assets/icons/btc.svg';  // Asegúrate de que el ícono de BTC esté en la carpeta correcta
import arrowDownIcon from '../assets/icons/arrow-down.svg';  // Asegúrate de que el ícono de flecha abajo esté en la carpeta correcta
import './Header.css';  // Importa el archivo CSS
import './Layout.css';  // Importa el archivo CSS

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <img 
        src={logo} 
        alt="Logo" 
        className="logo" 
        onClick={() => navigate('/dashboard')}  // Redirigir al dashboard al hacer clic en el logo
      />
      <div className="wallet-container">
        <div className="wallet-balance">
          <img src={btcIcon} alt="BTC" className="btc-icon" />
          <span>$0.00</span>
          <img src={arrowDownIcon} alt="Arrow Down" className="arrow-icon" />
        </div>
        <button className="wallet-button" onClick={() => console.log('Wallet button clicked')}>
          Wallet
        </button>
      </div>
      <div className="profile-icon">Profile</div>
    </header>
  );
};

export default Header;
