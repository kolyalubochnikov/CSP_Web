# CSP Web

Django-проект для сайта по продаже сайтов.

## Требования
- Docker
- Docker Compose

## Установка и запуск (разработка)

1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/kolyalubochnikov/CSP_Web.git
   cd CSP_Web
2. Скопируйте .env.example в .env и настройте переменные окружения:
   ```bash
   Copy
   cp .env.example .env
   
3. Запустите проект с помощью Docker Compose:
   ```bash
   Copy
   docker-compose up --build
4. Откройте браузер и перейдите по адресу http://localhost.
## Полезные данные
- Выполнить миграции: docker-compose exec web python manage.py migrate
- Создать суперпользователя: docker-compose exec web python manage.py createsuperuser
- Собрать статику: docker-compose exec web python manage.py collectstatic --noinput
- Остановить контейнеры: docker-compose down