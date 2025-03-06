import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    "currencyConverter": "Currency Converter",
                    "fromCurrency": "From Currency",
                    "toCurrency": "To Currency",
                    "result": "Result",
                    "reset": "Reset",
                    "errorMessage": "Error fetching exchange rates.",
                    "currentRate": "Current Rate",
                    "enterAmount": "Enter amount",
                    "UAH": "Hryvnia (UAH)",
                    "USD": "Dollar (USD)",
                    "EUR": "Euro (EUR)",
                    "GBP": "Pound (GBP)",
                    "JPY": "Yen (JPY)",
                    "CHF": "Swiss Franc (CHF)",
                    "AUD": "Australian Dollar (AUD)"
                }
            },
            uk: {
                translation: {
                    "currencyConverter": "Конвертер валют",
                    "fromCurrency": "Від валюты",
                    "toCurrency": "До валюты",
                    "result": "Результат",
                    "reset": "Скинути",
                    "errorMessage": "Помилка при отриманні курсів валют.",
                    "currentRate": "Поточний курс",
                    "enterAmount": "Введіть суму",
                    "UAH": "Гривня (UAH)",
                    "USD": "Долар (USD)",
                    "EUR": "Євро (EUR)",
                    "GBP": "Фунт (GBP)",
                    "JPY": "Єна (JPY)",
                    "CHF": "Швейцарський франк (CHF)",
                    "AUD": "Австралійський долар (AUD)"
                }
            },
            ru: {
                translation: {
                    "currencyConverter": "Конвертер валют",
                    "fromCurrency": "Из валюты",
                    "toCurrency": "В валюту",
                    "result": "Результат",
                    "reset": "Сбросить",
                    "errorMessage": "Ошибка при получении курсов валют.",
                    "currentRate": "Текущий курс",
                    "enterAmount": "Введите сумму",
                    "UAH": "Гривна (UAH)",
                    "USD": "Доллар (USD)",
                    "EUR": "Евро (EUR)",
                    "GBP": "Фунт (GBP)",
                    "JPY": "Йена (JPY)",
                    "CHF": "Швейцарский франк (CHF)",
                    "AUD": "Австралийский доллар (AUD)"
                }
            }
        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
