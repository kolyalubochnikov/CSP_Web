import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_BASE_URL } from "../apiConfig";

const schema = yup.object().shape({
  name: yup.string().required("Ваше имя обязательно"),
  email: yup
    .string()
    .email("Неверный формат почты")
    .required("Почта обязательна"),
  phone: yup
    .string()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .matches(/^\+?[0-9]{10,15}$/, "Неверенный номер телефона")
    .notRequired(),
  about: yup.string(),
  agreement: yup
    .bool()
    .oneOf([true], "Необходимо согласие на обработку персональных данных"),
});

export default function Form({ Theme }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  // Обработчик и фильтрация файлов
  const handleFiles = useCallback((selectedFiles) => {
    const allowedTypes = [
      /^image\//,
      /^text\//,
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.oasis.opendocument.text",
      "application/rtf",
    ];

    const validFiles = Array.from(selectedFiles).filter((file) =>
      allowedTypes.some((type) =>
        typeof type === "string"
          ? file.type === type
          : type instanceof RegExp
          ? type.test(file.type)
          : false
      )
    );

    if (validFiles.length) {
      setFiles((prev) => [...prev, ...validFiles]);
    }
    setIsDragging(false);
  }, []);

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  // Drag & drop события
  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  };

  // Удаление файла из списка
  const removeFile = (e, index) => {
    e.stopPropagation();
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Цвет рамки драг-н-дропа
  const getBorderColor = () => {
    if (files.length > 0) return "rgba(255,255,255,0.6)";
    if (isDragging) return "rgba(255,255,255,0.4)";
    return "rgba(255,255,255,0.2)";
  };

  // Обработчик отправки
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (data.phone) formData.append("phone", data.phone);
    formData.append("about", data.about || "");
    formData.append("agreement", data.agreement);

    files.forEach((file) => formData.append("terms_of_reference", file));

    try {
      const res = await fetch(`${API_BASE_URL}/api/main_page/order/`, {
        method: "POST",
        body: formData,
      });
      const json = await res.json();

      if (!res.ok) {
        // собираем сообщения об ошибках из ответа
        const messages =
          json && typeof json === "object"
            ? Object.entries(json)
                .map(([field, msgs]) => {
                  const text = Array.isArray(msgs) ? msgs.join(", ") : msgs;
                  return `${field}: ${text}`;
                })
                .join(" | ")
            : "Произошла ошибка при отправке";
        toast.error(messages);
      } else {
        toast.success("Заявка успешно отправлена!");
        reset();
        setFiles([]);
      }
    } catch (err) {
      toast.error("Сетевая ошибка: " + err.message);
    }
  };

  return (
    <>
      <form
        className={Theme === "dark" ? "form form-dark" : "form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Ваше имя */}
        <div>
          <input
            className={
              Theme === "dark" ? "form__input form-dark__input" : "form__input"
            }
            type="text"
            placeholder="Ваше имя *"
            {...register("name")}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>

        {/* Почта */}
        <div>
          <input
            className={
              Theme === "dark" ? "form__input form-dark__input" : "form__input"
            }
            type="email"
            placeholder="Почта *"
            {...register("email")}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        {/* Телефон */}
        <div>
          <input
            className={
              Theme === "dark" ? "form__input form-dark__input" : "form__input"
            }
            type="tel"
            placeholder="Номер телефона"
            {...register("phone")}
          />
          {errors.phone && (
            <p style={{ color: "red" }}>{errors.phone.message}</p>
          )}
        </div>

        {/* Описание задачи */}
        <div>
          <textarea
            className={
              Theme === "dark"
                ? "form__textarea form-dark__textarea"
                : "form__textarea"
            }
            placeholder="Опишите вашу задачу"
            {...register("about")}
          />
        </div>

        {/* Drag & drop + выбор файлов */}
        <div
          onDragEnter={onDragEnter}
          onDragOver={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className="form__dragndrop"
          style={{
            border: `3px dashed ${getBorderColor()}`,
            color: files.length > 0 ? "#fff" : getBorderColor(),
          }}
        >
          <input
            id="dragndrop"
            type="file"
            multiple
            style={{ display: "none" }}
            accept="image/*, text/*, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
          />
          <label
            htmlFor="dragndrop"
            className="form__dragndrop-label"
            style={{
              cursor: "pointer",
              width: "100%",
              height: files.length > 0 ? "100%" : "unset",
            }}
          >
            {files.length === 0 && (
              <p>Перенесите файлы сюда или нажмите, чтобы выбрать</p>
            )}
            {files.length > 0 && (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {files.map((file, idx) => (
                  <li
                    key={idx}
                    style={{
                      margin: "8px 0",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={(e) => removeFile(e, idx)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: 36,
                      }}
                    >
                      &times;
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </label>
        </div>

        {/* Кнопка "Тех. задание" и отправка */}
        <div className="form__btns" style={{ marginBottom: 16 }}>
          <div>
            <button
              className={
                Theme === "dark"
                  ? "button-second"
                  : "button-second button-second-form"
              }
              type="button"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <p>Тех. задание</p>
            </button>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              multiple
              accept="image/*, text/*, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
            />
          </div>

          <button
            className={
              Theme === "dark"
                ? "form__button button"
                : "form__button button-alt"
            }
            type="submit"
          >
            <p>Оставить заявку</p>
          </button>
        </div>

        {/* Согласие */}
        <div>
          <label
            className={
              Theme === "dark" ? "form__label form-dark__label" : "form__label"
            }
          >
            <input type="checkbox" {...register("agreement")} />
            <span className="custom-checkbox"></span>
            <p>
              Отправляя свои данные вы соглашаетесь с политикой
              конфиденциальности
            </p>
          </label>
          {errors.agreement && (
            <p style={{ color: "red" }}>{errors.agreement.message}</p>
          )}
        </div>
      </form>
    </>
  );
}
