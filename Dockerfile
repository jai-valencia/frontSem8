FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build -- --output-path=./dist/frontend-microservicios


FROM nginx:alpine


RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/frontend-microservicios/browser /usr/share/nginx/html


COPY nginx.conf /etc/nginx/conf.d/default.conf


RUN chown -R nginx:nginx /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
