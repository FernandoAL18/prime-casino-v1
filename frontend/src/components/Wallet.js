import React, { useContext, useState } from 'react';
import BalanceContext from '../context/BalanceContext';
import { updateUserBalance } from '../services/api';
import btcIcon from '../assets/icons/btc.svg';
import ethIcon from '../assets/icons/eth.svg';
import usdIcon from '../assets/icons/usd.svg';
import ltcIcon from '../assets/icons/ltc.svg';
import trxIcon from '../assets/icons/trx.svg';
import xrpIcon from '../assets/icons/xrp.svg';
import dogeIcon from '../assets/icons/doge.svg';
import solIcon from '../assets/icons/sol.svg';
import './Wallet.css';

const Wallet = ({ onClose, onDeposit }) => {
    const { setBalances } = useContext(BalanceContext);
    const [selectedCrypto, setSelectedCrypto] = useState('BTC');
    const [depositAmount, setDepositAmount] = useState('');

    const handleCryptoSelect = (crypto) => {
        setSelectedCrypto(crypto);
    };

    const handleDeposit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('User not authenticated');
            return;
        }

        if (!depositAmount || parseFloat(depositAmount) <= 0) {
            alert('Please enter a valid deposit amount');
            return;
        }

        try {
            const balanceData = { crypto: selectedCrypto, amount: parseFloat(depositAmount) };
            const updatedBalances = await updateUserBalance(token, balanceData);
            setBalances(updatedBalances.balances);
            onDeposit(selectedCrypto, parseFloat(depositAmount)); // Pasar el crypto correcto a la función onDeposit
            onClose(); // Cerrar modal después de actualizar
        } catch (error) {
            console.error('Error updating balance:', error);
            alert(`Failed to update balance: ${error.response?.data?.msg || 'Unknown error'}`);
        }
    };

    return (
        <div className="wallet-modal">
            <div className="wallet-header">
                <h2>Wallet</h2>
                <button onClick={onClose} className="close-button">X</button>
            </div>
            <div className="wallet-tabs">
                <button className="active">Deposit</button>
                <button>Withdraw</button>
                <button>Buy Crypto</button>
                <button>Redeem</button>
            </div>
            <div className="wallet-content">
                <h3>Select Cryptocurrency</h3>
                <div className="crypto-selection">
                    <div 
                        className={`crypto-option ${selectedCrypto === 'BTC' ? 'selected' : ''}`} 
                        onClick={() => handleCryptoSelect('BTC')}
                    >
                        <img src={btcIcon} alt="BTC" />
                        <span>Bitcoin</span>
                    </div>
                    <div 
                        className={`crypto-option ${selectedCrypto === 'ETH' ? 'selected' : ''}`} 
                        onClick={() => handleCryptoSelect('ETH')}
                    >
                        <img src={ethIcon} alt="ETH" />
                        <span>Ethereum</span>
                    </div>
                    <div 
                        className={`crypto-option ${selectedCrypto === 'USD' ? 'selected' : ''}`} 
                        onClick={() => handleCryptoSelect('USD')}
                    >
                        <img src={usdIcon} alt="USD" />
                        <span>USD</span>
                    </div>
                    <div 
                        className={`crypto-option ${selectedCrypto === 'LTC' ? 'selected' : ''}`} 
                        onClick={() => handleCryptoSelect('LTC')}
                    >
                        <img src={ltcIcon} alt="LTC" />
                        <span>Litecoin</span>
                    </div>
                    <div 
                        className={`crypto-option ${selectedCrypto === 'TRX' ? 'selected' : ''}`} 
                        onClick={() => handleCryptoSelect('TRX')}
                    >
                        <img src={trxIcon} alt="TRX" />
                        <span>TRON</span>
                    </div>
                    <div 
                        className={`crypto-option ${selectedCrypto === 'XRP' ? 'selected' : ''}`} 
                        onClick={() => handleCryptoSelect('XRP')}
                    >
                        <img src={xrpIcon} alt="XRP" />
                        <span>Ripple</span>
                    </div>
                    <div 
                        className={`crypto-option ${selectedCrypto === 'DOGE' ? 'selected' : ''}`} 
                        onClick={() => handleCryptoSelect('DOGE')}
                    >
                        <img src={dogeIcon} alt="DOGE" />
                        <span>Doge</span>
                    </div>
                    <div 
                        className={`crypto-option ${selectedCrypto === 'SOL' ? 'selected' : ''}`} 
                        onClick={() => handleCryptoSelect('SOL')}
                    >
                        <img src={solIcon} alt="SOL" />
                        <span>Solana</span>
                    </div>
                </div>
                <div className="wallet-form">
                    <h4>{selectedCrypto} Deposit</h4>
                    <input 
                        type="number" 
                        value={depositAmount} 
                        onChange={(e) => setDepositAmount(e.target.value)} 
                        placeholder="Enter amount" 
                    />
                    <button onClick={handleDeposit} className="deposit-button">
                        Deposit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Wallet;