import React, { useRef, useState, useEffect } from "react";
import PageTitle from "../PageTitle/PageTitle";
import { API_BASE_URL } from "../../../apiConfig";

export default function AboutUs() {
  const [advantages, setAdvantages] = useState([]);
  const scrollableRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/main_page/about_us/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAdvantages(data);
      })
      .catch((err) => console.error("Ошибка при загрузке about_us:", err));
  }, []);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - scrollableRef.current.offsetLeft);
    setScrollLeft(scrollableRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollableRef.current.offsetLeft;
    const walk = x - startX;
    scrollableRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="about-us" className="about-us">
      <div className="container">
        <PageTitle titleTxt="о нас" titleTheme="dark" />
      </div>
      <div className="container">
        <div className="about-us__wrapper">
          <h2 className="about-us__title">
            <span>CSP</span> – студия разработки дизайна и веб-приложений. Мы
            создаем уникальные решения для каждого клиента
          </h2>
          <div
            ref={scrollableRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="about-us__advantages advantages"
          >
            {advantages.map((adv) => {
              const { id, main_text, text, sub_text } = adv;
              // разбиваем по "/n" так же, как раньше
              const [line1, line2] = sub_text.split("/n");

              return (
                <div className="advantages__item" key={id}>
                  <p className="advantages__number">{main_text}</p>
                  <div className="advantages__description">
                    <p className="advantages__title">{text}</p>
                    <p className="advantages__sub-title">
                      {line1}
                      <br />
                      {line2}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
