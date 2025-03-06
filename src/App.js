import React from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import './styles.css';
import CurrencyConverter from './components/CurrencyConverter'; // Імпортуємо компонент конвертера валют

const App = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="App">




            <CurrencyConverter />
        </div>
    );
};

export default App;
