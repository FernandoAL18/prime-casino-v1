import React, { createContext, useState } from 'react';

const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
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
            {children}
        </BalanceContext.Provider>
    );
};

export default BalanceContext;
