import React from "react";

export default function FooterLinkItem({ title, items }) {
  return (
    <div className="footer__links-item footer-info">
      <p className="footer-info__title">{title}</p>
      <div className="footer-info__content-wrapper">
        {items.map((item, index) => {
          if (item.type === "text") {
            return (
              <p key={index} className="footer-info__txt">
                {item.content}
              </p>
            );
          } else if (item.type === "link") {
            return (
              <a key={index} href={item.href} className="footer-info__txt">
                {item.content}
              </a>
            );
          } else if (item.type === "image") {
            return (
              <a key={index} target="_blank" href={item.href}>
                <img
                  src={item.src}
                  alt={item.alt}
                  className="footer-info__img"
                />
              </a>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
