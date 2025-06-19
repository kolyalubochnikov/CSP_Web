// в config.js
export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "" // пустая строка! (для прокси)
    : "https://api.cspweb.ru"; // или ваш продовый URL
