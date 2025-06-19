FROM nginx:alpineAdd
# убираем дефолтный конфиг
RUN rm /etc/nginx/conf.d/default.conf
# копируем собранную папку в папку, откуда Nginx будет раздавать фронтенд
COPY --from=builder /app/dist /usr/share/nginx/html/frontend