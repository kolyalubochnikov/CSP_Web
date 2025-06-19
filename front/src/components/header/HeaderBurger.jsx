import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function HeaderBurger({
  burgerLinks,
  isBurgerOpen,
  toggleMenu,
}) {
  return (
    <AnimatePresence>
      {isBurgerOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="burger-menu"
        >
          {/* Вывод матрицы в меню бургере */}
          <div className="burger-menu__links">
            {burgerLinks.map(([linkName, link], index) => (
              <a
                key={index}
                href={link}
                className="burger-menu__link header__link"
              >
                {linkName}
              </a>
            ))}
          </div>
          <a href="#leave-request" className="burger-menu__button button">
            оставить заявку
          </a>
          <div className="burger-menu__contacts">
            <a href="tel: +79955721248" className="burger-menu__contact">
              +7 (995) 572 12-48
            </a>
            <a
              href="mailto: csp.web.dev@gmail.com"
              className="burger-menu__contact"
            >
              csp.web.dev@gmail.com
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
