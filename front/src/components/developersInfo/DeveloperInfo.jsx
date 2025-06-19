import React, { useState, useEffect, useMemo } from "react";
import PageTitle from "../PageTitle/PageTitle";
import { API_BASE_URL } from "../../../apiConfig";

export default function DeveloperInfo() {
  const [developers, setDevelopers] = useState([]);
  const [stacks, setStacks] = useState([]);

  // Фетчим сразу оба массива
  useEffect(() => {
    async function fetchData() {
      try {
        const [devRes, stackRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/main_page/developer_list/`),
          fetch(`${API_BASE_URL}/api/main_page/stack_list/`),
        ]);

        if (!devRes.ok || !stackRes.ok) {
          console.error(
            "Ошибка при загрузке данных:",
            devRes.status,
            stackRes.status
          );
          return;
        }

        const [devData, stackData] = await Promise.all([
          devRes.json(),
          stackRes.json(),
        ]);

        setDevelopers(devData);
        setStacks(stackData);
      } catch (err) {
        console.error("Сетевая ошибка при загрузке:", err);
      }
    }

    fetchData();
  }, []);

  // Словарь стеков по id для быстрого поиска
  const stacksById = useMemo(() => {
    const map = {};
    stacks.forEach((s) => {
      map[s.id] = s;
    });
    return map;
  }, [stacks]);

  return (
    <section id="developers-info" className="developers-info">
      <div className="container">
        <PageTitle titleTxt="разработчики" titleTheme="dark" />
      </div>
      <div className="container">
        <div className="developers-info__wrapper">
          {developers.map((dev) => {
            // Получаем объекты стеков и сортируем по длине имени
            const devStacks = dev.stacks
              .map((stackId) => stacksById[stackId])
              .filter(Boolean)
              .sort((a, b) => a.name.length - b.name.length);

            return (
              <div className="developer" key={dev.id}>
                <h2 className="developer__title">{dev.name}</h2>
                <div className="developer__info-block skills">
                  <div className="developer__subtitle">Навыки</div>
                  <p className="skills__txt">{dev.skills}</p>
                </div>
                <div className="developer__info-block stack">
                  <div className="developer__subtitle">Стэк</div>
                  <div className="stack__wrapper">
                    {devStacks.map((item) => (
                      <div className="stack__item" key={item.id}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="stack__img"
                        />
                        <p className="stack__name">{item.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
