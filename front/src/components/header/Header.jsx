import React, { useEffect, useState } from "react";
import HeaderLinksView from "./HeaderLinksView";

export default function Header() {
  const [background, setBackground] = useState("rgba(255, 255, 255, 1)");

  const handleScroll = () => {
    const header = document.querySelector(".header");
    const sections = document.querySelectorAll("section");
    const headerPosition =
      header.getBoundingClientRect().top + window.scrollY + header.offsetHeight;

    let currentBackground = "rgba(255, 255, 255, 0.9)"; // Начальный цвет

    sections.forEach((section) => {
      const sectionPosition =
        section.getBoundingClientRect().top + window.scrollY;

      if (
        sectionPosition <= headerPosition &&
        sectionPosition + section.offsetHeight > headerPosition
      ) {
        // Проверяем класс блока
        if (section.classList.contains("section-dark")) {
          currentBackground = "rgba(65, 65, 65, 0.9)"; // Цвет #414141 с прозрачностью 70%
        } else if (section.classList.contains("section-white")) {
          currentBackground = "rgba(255, 255, 255, 0.9)"; // Белый с прозрачностью 70%
        } else if (section.classList.contains("section-footer")) {
          currentBackground = "rgba(26, 26, 26, 0.9)"; // Белый с прозрачностью 70%
        }
      }
    });

    setBackground(currentBackground);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      style={{
        background,
      }}
      className="header"
    >
      <div className="container">
        <div className="header__items">
          <a href="#" className="header__logo">
            csp
          </a>
          <nav className="header__nav">
            <HeaderLinksView />
          </nav>
        </div>
      </div>
    </header>
  );
}
