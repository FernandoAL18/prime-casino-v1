import React from 'react';
import logo from '../assets/icons/logo.png';
import './GameLauncher.css';  // Importa el archivo CSS

const GameLauncher = ({ gameUrl, gameTitle }) => {
  const isMobileDevice = () => /Mobi|Android/i.test(navigator.userAgent);

  const finalUrl = isMobileDevice() ? gameUrl.mobile : gameUrl.desktop;

  return (
    <div className="container">
      <div className="content">
        <div className="launcher">
          <iframe
            src={finalUrl}
            title={gameTitle}
            className="iframe"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
        <div className="gameFooter">
          <img src={logo} alt="Logo" className="footerLogo" />
        </div>
      </div>
    </div>
  );
};

export default GameLauncher;