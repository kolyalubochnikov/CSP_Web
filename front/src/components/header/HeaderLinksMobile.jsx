import React, { useState, useEffect } from "react";
import HeaderBurger from "./HeaderBurger";

export default function HeaderLinkMobile({ burgerLinks }) {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleMenu = () => {
    setIsBurgerOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isBurgerOpen) {
        setIsBurgerOpen(false);
      }
    };

    document.body.style.overflow = isBurgerOpen ? "hidden" : "auto";

    if (isBurgerOpen) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isBurgerOpen]);
  return (
    <>
      <div
        onClick={toggleMenu}
        className={`header__link header__burger-btn ${
          isBurgerOpen ? "active" : ""
        }`}
      >
        <span></span>
      </div>
      <HeaderBurger
        burgerLinks={burgerLinks}
        isBurgerOpen={isBurgerOpen}
        toggleMenu={toggleMenu}
      />
    </>
  );
}
