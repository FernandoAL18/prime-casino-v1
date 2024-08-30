import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import Wallet from './Wallet';
import { getUserProfile } from '../services/api'; // Asegúrate de que la función esté correctamente importada
import './Layout.css';

// Import the icons used in the sidebar and header
import { ReactComponent as DashboardIcon } from '../assets/icons/dashboard.svg';
import { ReactComponent as GamesIcon } from '../assets/icons/games.svg';
import { ReactComponent as SettingsIcon } from '../assets/icons/settings.svg';
import userIcon from '../assets/icons/user.svg';
import menuIcon from '../assets/icons/menu.svg';
import btcIcon from '../assets/icons/btc.svg';
import arrowDownIcon from '../assets/icons/arrow-down.svg';
import usdIcon from '../assets/icons/usd.svg';
import ethIcon from '../assets/icons/eth.svg';
import ltcIcon from '../assets/icons/ltc.svg';
import trxIcon from '../assets/icons/trx.svg';
import xrpIcon from '../assets/icons/xrp.svg';
import dogeIcon from '../assets/icons/doge.svg';
import solIcon from '../assets/icons/sol.svg';

const iconMap = {
  USD: usdIcon,
  BTC: btcIcon,
  ETH: ethIcon,
  LTC: ltcIcon,
  TRX: trxIcon,
  XRP: xrpIcon,
  DOGE: dogeIcon,
  SOL: solIcon,
};

const Layout = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isBalanceMenuOpen, setIsBalanceMenuOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState({ icon: btcIcon, label: 'BTC', balance: 0.00 });

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

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        
        const userData = await getUserProfile(token); // Obtener los balances del perfil de usuario
        setBalances(userData.balances);
      } catch (error) {
        console.error('Error fetching balances:', error);
      }
    };

    fetchBalances();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleBalanceMenu = () => {
    setIsBalanceMenuOpen(!isBalanceMenuOpen);
  };

  const toggleWallet = () => {
    setIsWalletOpen(!isWalletOpen);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setIsUserMenuOpen(false);
  };

  const handleCryptoSelection = (crypto) => {
    setSelectedCrypto({
        icon: iconMap[crypto],
        label: crypto,
        balance: balances[crypto].toFixed(2),
    });
    setIsBalanceMenuOpen(false); // Close the menu after selection
  };

  const handleDeposit = (crypto, amount) => {
    setBalances((prevBalances) => ({
      ...prevBalances,
      [crypto]: prevBalances[crypto] + amount,
    }));
    if (selectedCrypto.label === crypto) {
      setSelectedCrypto((prevSelectedCrypto) => ({
        ...prevSelectedCrypto,
        balance: (parseFloat(prevSelectedCrypto.balance) + amount).toFixed(2),
      }));
    }
  };

  return (
    <div className={`layout-container ${isSidebarCollapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
      {!isMobile && (
        <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
          <button className="toggle-button" onClick={toggleSidebar}>
            <img src={menuIcon} alt="Toggle Sidebar" className="menu-icon" />
          </button>
          <ul className="sidebar-menu">
            <li onClick={() => navigate('/dashboard')}>
              <DashboardIcon className="sidebar-icon" />
              {!isSidebarCollapsed && <span>Dashboard</span>}
            </li>
            <li onClick={() => navigate('/all-slots')}>
              <GamesIcon className="sidebar-icon" />
              {!isSidebarCollapsed && <span>All Slots</span>}
            </li>
            <li onClick={() => navigate('/settings')}>
              <SettingsIcon className="sidebar-icon" />
              {!isSidebarCollapsed && <span>Settings</span>}
            </li>
          </ul>
        </aside>
      )}
      <div className={`main-content ${isSidebarCollapsed || isMobile ? 'sidebar-collapsed' : 'sidebar-expanded'}`}>
        <header className={`header ${isSidebarCollapsed || isMobile ? 'header-collapsed' : 'header-expanded'}`}>
          <img 
            src={require('../assets/icons/logo.png')} 
            alt="Logo" 
            className="logo" 
            onClick={() => navigate('/dashboard')}
          />
          <div className="wallet-container">
            <div className="wallet-balance" onClick={toggleBalanceMenu}>
              <img src={selectedCrypto.icon} alt={selectedCrypto.label} className="btc-icon" />
              <span>${balances[selectedCrypto.label].toFixed(2)}</span>
              <img src={arrowDownIcon} alt="Arrow Down" className="arrow-icon" />
            </div>
            <button className="wallet-button" onClick={toggleWallet}>
              Wallet
            </button>
            {isBalanceMenuOpen && (
              <div className="balance-menu">
                <ul className="balance-list">
                  {Object.keys(balances).map((crypto) => (
                    <li 
                      key={crypto}
                      onClick={() => handleCryptoSelection(crypto)}
                    >
                      <img src={iconMap[crypto]} alt={crypto} /> {crypto} ${balances[crypto].toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="user-menu-wrapper">
            <img 
              src={userIcon} 
              alt="User Menu" 
              className="user-icon" 
              onClick={toggleUserMenu} 
            />
            {isUserMenuOpen && (
              <div className="user-menu">
                <ul>
                  <li onClick={() => handleMenuItemClick('/wallet')}>Wallet</li>
                  <li onClick={() => handleMenuItemClick('/vault')}>Vault</li>
                  <li onClick={() => handleMenuItemClick('/vip')}>VIP</li>
                  <li onClick={() => handleMenuItemClick('/affiliate')}>Affiliate</li>
                  <li onClick={() => handleMenuItemClick('/statistics')}>Statistics</li>
                  <li onClick={() => handleMenuItemClick('/transactions')}>Transactions</li>
                  <li onClick={() => handleMenuItemClick('/my-bets')}>My Bets</li>
                  <li onClick={() => handleMenuItemClick('/settings')}>Settings</li>
                  <li onClick={() => handleMenuItemClick('/live-support')}>Live Support</li>
                  <li onClick={() => handleMenuItemClick('/logout')}>Logout</li>
                </ul>
              </div>
            )}
          </div>
        </header>
        {isWalletOpen && <Wallet onClose={toggleWallet} onDeposit={handleDeposit} />}
        <div className="content">
          <Outlet />
        </div>
      </div>
      {isMobile && <MobileMenu className="menu" />}
    </div>
  );
};

export default Layout;
