import React from "react";
import PageTitle from "../PageTitle/PageTitle";
import Form from "../../Form";

export default function LeaveRequest() {
  return (
    <section id="leave-request" className="leave-request section-dark">
      <div className="container">
        <PageTitle titleTxt="оставить заявку" titleTheme="light" />
      </div>
      <div className="container">
        <div className="leave-request__wrapper">
          <div className="leave-request__offer">
            <h2 className="leave-request__title">
              Не нашли подходящее предложение?
            </h2>
            <h3 className="leave-request__sub-title">
              оставьте заявку и наши специалисты помогут вам найти решение
            </h3>
          </div>
          <Form Theme="light" />
        </div>
      </div>
    </section>
  );
}
