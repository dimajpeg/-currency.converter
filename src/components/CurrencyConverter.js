import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../styles.css";
import { FaExchangeAlt } from "react-icons/fa"; // Иконка для кнопки обмена валютами
import { FaSpinner } from "react-icons/fa"; // Иконка для спиннера загрузки
import Flag from "react-world-flags"; // Импорт флага валюты

const CurrencyConverter = () => {
    const { t, i18n } = useTranslation();
    const [amount, setAmount] = useState(""); // Начальное значение пустое
    const [fromCurrency, setFromCurrency] = useState("UAH");
    const [toCurrency, setToCurrency] = useState("USD");
    const [exchangeRates, setExchangeRates] = useState({});
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState("light");

    // Запрашиваем курсы валют с базовой валютой fromCurrency
    useEffect(() => {
        if (!fromCurrency) return;
        setLoading(true);
        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then((res) => res.json())
            .then((data) => {
                if (data && data.rates) {
                    setExchangeRates(data.rates);
                    setLoading(false);
                } else {
                    throw new Error("Invalid data");
                }
            })
            .catch((err) => {
                setError(t("errorMessage"));
                setLoading(false);
            });
    }, [fromCurrency, t]);

    // Пересчитываем сумму при изменении amount, fromCurrency, toCurrency или exchangeRates
    useEffect(() => {
        if (exchangeRates[toCurrency] && amount !== "") {
            const newConvertedAmount = (amount * exchangeRates[toCurrency]).toFixed(2);
            setConvertedAmount(newConvertedAmount);
        } else {
            setConvertedAmount(null);
        }
    }, [amount, fromCurrency, toCurrency, exchangeRates]);

    // Обработчик обмена валютами
    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    // Обработчик переключения темы
    const handleThemeToggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <div className={`converter-container ${theme}`}>
            {error && <div className="error-message">{error}</div>}
            <h2>{t("currencyConverter")}</h2>

            <div className="input-container">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => {
                        // Разрешаем ввод только положительных чисел или пустую строку
                        if (e.target.value >= 0 || e.target.value === "") {
                            setAmount(e.target.value);
                        }
                    }}
                    className="input-field"
                    disabled={loading}
                    placeholder={t("enterAmount")}
                    min="0"
                />
            </div>

            <div className="currency-selection">
                <div className="currency-label">{t("fromCurrency")}</div>
                <div className="currency-with-flag">
                    <Flag code={fromCurrency} alt={fromCurrency} style={{ width: "20px", height: "15px" }} />
                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="select-field"
                        disabled={loading}
                    >
                        <option value="UAH">{t("UAH")}</option>
                        <option value="USD">{t("USD")}</option>
                        <option value="EUR">{t("EUR")}</option>
                        <option value="GBP">{t("GBP")}</option>
                        <option value="JPY">{t("JPY")}</option>
                        <option value="CHF">{t("CHF")}</option>
                        <option value="AUD">{t("AUD")}</option>
                    </select>
                </div>

                <div className="exchange-icon" onClick={handleSwapCurrencies}>
                    <FaExchangeAlt size={24} />
                </div>

                <div className="currency-label">{t("toCurrency")}</div>
                <div className="currency-with-flag">
                    <Flag code={toCurrency} alt={toCurrency} style={{ width: "20px", height: "15px" }} />
                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="select-field"
                        disabled={loading}
                    >
                        <option value="UAH">{t("UAH")}</option>
                        <option value="USD">{t("USD")}</option>
                        <option value="EUR">{t("EUR")}</option>
                        <option value="GBP">{t("GBP")}</option>
                        <option value="JPY">{t("JPY")}</option>
                        <option value="CHF">{t("CHF")}</option>
                        <option value="AUD">{t("AUD")}</option>
                    </select>
                </div>
            </div>

            <h3>
                {t("result")}:{" "}
                {convertedAmount
                    ? `${convertedAmount} ${toCurrency}`
                    : loading
                        ? <FaSpinner className="spinner" />
                        : "..."}
            </h3>

            {exchangeRates[toCurrency] && (
                <p className="exchange-rate">
                    {t("currentRate")}: {exchangeRates[toCurrency]} {toCurrency}
                </p>
            )}

            <button
                onClick={() => {
                    setAmount("");
                    setFromCurrency("UAH");
                    setToCurrency("USD");
                }}
                className="reset-button"
                disabled={loading}
            >
                {t("reset")}
            </button>

            <div className="language-switcher">
                <button className="language-button" onClick={() => i18n.changeLanguage("uk")}>UA</button>
                <button className="language-button" onClick={() => i18n.changeLanguage("ru")}>RU</button>
                <button className="language-button" onClick={() => i18n.changeLanguage("en")}>EN</button>
            </div>

            <div className="theme-toggle">
                <button className="theme-button" onClick={handleThemeToggle}>
                    {theme === "light" ? "🌙" : "☀️"}
                </button>
            </div>
        </div>
    );
};

export default CurrencyConverter;
