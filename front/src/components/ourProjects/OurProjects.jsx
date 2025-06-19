import React, { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import { API_BASE_URL } from "/apiConfig";

import PageTitle from "../PageTitle/PageTitle";
import ProjectItem from "./ProjectItem";
import Masonry from "react-masonry-css";

export default function OurProjects() {
  const [projects, setProjects] = useState([]);
  const [breakpointCols, setBreakpointCols] = useState({
    default: 2,
    960: 1,
  });

  const handleResize = debounce(() => {
    const width = window.innerWidth;
    if (width < 960) {
      setBreakpointCols({ default: 1 });
    } else {
      setBreakpointCols({ default: 2 });
    }
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/main_page/our_project_list/`)
      .then((res) => {
        return res.json();
      })
      .then((data) => setProjects(data))
      .catch((err) => console.error("Ошибка:", err));
  }, []);

  return (
    <section id="our-projects" className="our-projects">
      <div className="container">
        <PageTitle titleTxt="наши проекты" titleTheme="dark" />
      </div>
      <div className="container">
        <div className="our-projects__wrapper">
          <Masonry
            breakpointCols={breakpointCols}
            className="our-projects__masonry-grid"
            columnClassName="our-projects__masonry-grid_column"
          >
            {projects.map((project) => (
              <ProjectItem
                key={project.id}
                title={project.main_text}
                subtitle={project.about}
                backgroundImg={project.image}
              />
            ))}
          </Masonry>
        </div>
      </div>
    </section>
  );
}
