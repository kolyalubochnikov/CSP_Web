import React from "react";
import MacImg from "../../assets/headerPromoMac.png";
import IphoneImg from "../../assets/headerPromoIphone.png";

export default function HeaderPromo() {
  return (
    <section className="header-promo section-white">
      <div className="container">
        <div className="header-promo__offer">
          <h1 className="header-promo__title">Создание сайтов и веб-дизайн</h1>
          <h3 className="header-promo__sub-title">любой сложности под ключ</h3>
          <a href="#leave-request" className="button header-promo__button">
            <p>Оставить заявку</p>
          </a>
        </div>
      </div>
      <img
        src={MacImg}
        alt=""
        className="header-promo__backgorund-img desctop-display"
      />
      <img
        src={IphoneImg}
        alt=""
        className="header-promo__backgorund-img mobile-display"
      />
    </section>
  );
}
