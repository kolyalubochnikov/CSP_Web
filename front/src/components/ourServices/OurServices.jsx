import React, { useState, useEffect } from "react";
import PageTitle from "../PageTitle/PageTitle";
import { API_BASE_URL } from "../../../apiConfig";

export default function OurServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/main_page/product/`)
      .then((res) => {
        if (!res.ok) throw new Error(`Ошибка ${res.status}`);
        return res.json();
      })
      .then((data) => setServices(data))
      .catch((err) => console.error("Не удалось загрузить services:", err));
  }, []);

  // Форматирует 5000.0 → "5.000р."
  const formatPrice = (price) => {
    const intPart = Math.round(price); // убираем дробную часть
    return intPart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "р.";
  };

  return (
    <section id="our-services" className="our-services section-white">
      <div className="container">
        <PageTitle titleTxt="наши услуги" titleTheme="dark" />
      </div>
      <div className="container">
        <div className="our-services__wrapper">
          {services.map(({ id, name, about, price }, index) => {
            const [titlePart, descPart] = about.split(" – ");
            return (
              <div
                key={id}
                className="our-services__item"
                style={{
                  backgroundImage: `url(${
                    import.meta.env.BASE_URL
                  }images/impGR-${index + 1}.webp)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h2 className="our-services__name">{name}</h2>
                <p className="our-services__description">
                  <strong>{titlePart}</strong> – {descPart}
                </p>
                <p className="our-services__price">
                  цена от: <span>{formatPrice(price)}</span>
                </p>
                <a
                  href="#leave-request"
                  className="our-services__button button-alt"
                >
                  <p>заказать</p>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
