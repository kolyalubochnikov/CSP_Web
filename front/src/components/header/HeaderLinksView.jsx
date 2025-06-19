import React, { useState, useEffect } from "react";
import HeaderLinksMobile from "./HeaderLinksMobile";
import HeaderLinksDesktop from "./HeaderLinksDesktop";

export default function HeaderLinks() {
  // Матрица ссылок
  const headerLinks = [
    ["О нас", "#about-us"],
    ["Разработка", "#development-process"],
    ["Наши услуги", "#our-services"],
  ];

  const burgerLinks = [
    ["Наши услуги", "#our-services"],
    ["О нас", "#about-us"],
    ["Разработка", "#development-process"],
    ["Разработчики", "#developers-info"],
    ["Наши проекты", "#our-projects"],
    ["Контакты", "#contacts"],
  ];

  // Переменная для смены отображения на мобильное
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Отслеживание ширины вьюпорта
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Проверка на мобильную версию */}
      {isMobile ? (
        <HeaderLinksMobile burgerLinks={burgerLinks} />
      ) : (
        <HeaderLinksDesktop
          headerLinks={headerLinks}
          burgerLinks={burgerLinks}
        />
      )}
    </>
  );
}
