# Используем официальный образ Python
FROM python:3.11-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем зависимости для MySQL, Pillow, pkg-config и netcat
RUN apt-get update && apt-get install -y \
    libmariadb-dev \
    pkg-config \
    gcc \
    python3-dev \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

# Копируем requirements.txt и устанавливаем зависимости
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Копируем весь проект, включая wait-for-db.sh
COPY . .

# Делаем wait-for-db.sh исполняемым
RUN chmod +x /app/wait-for-db.sh

# Указываем переменные окружения
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Указываем порт
EXPOSE 8000

# Команда для запуска приложения с Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "djangoProject.wsgi:application"]