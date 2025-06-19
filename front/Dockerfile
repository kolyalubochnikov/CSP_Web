# 1) билдим статические файлы с Vite (или CRA)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY vite.config.js ./
COPY . .
RUN npm ci
RUN npm run build           # <-- соберёт dist/  

# 2) служим их через nginx
FROM nginx:alpine
# убираем дефолтный конфиг
RUN rm /etc/nginx/conf.d/default.conf
# копируем собранную папку в папку, откуда Nginx будет раздавать фронтенд
COPY --from=builder /app/dist /usr/share/nginx/html/frontend
