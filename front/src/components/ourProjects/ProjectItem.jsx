import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProjectItem = ({ title, subtitle, imgSrc, backgroundImg }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth > 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth > 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="our-projects__item project-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
        }}
        className="project-item__img"
      ></div>
      <h2 className="project-item__title">{title}</h2>
      <motion.h2
        className="project-item__subtitle"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isMobile ? (isHovered ? 1 : 0) : 1,
          y: isMobile ? (isHovered ? 0 : -20) : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {subtitle}
      </motion.h2>
    </div>
  );
};

export default ProjectItem;
