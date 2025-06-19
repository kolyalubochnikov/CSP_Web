import React from "react";
import { motion } from "framer-motion";

export default function PageTitle({ titleTxt, titleTheme }) {
  return (
    <div className="page-title">
      <motion.p
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
        className={`page-title__txt page-title__txt_${titleTheme} our-services__title`}
      >
        {titleTxt}
      </motion.p>
      <motion.span
        initial={{
          y: -50,
        }}
        whileInView={{
          y: 0,
        }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
        className={`page-title__line page-title__line_${titleTheme}`}
      ></motion.span>
    </div>
  );
}
