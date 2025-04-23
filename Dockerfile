FROM node:20.14.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

ARG VITE_TURNSTILE_SITE_KEY
ARG VITE_BACKEND_URL
ARG VITE_TINYMCE_API_KEY

ENV VITE_TURNSTILE_SITE_KEY=$VITE_TURNSTILE_SITE_KEY
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_TINYMCE_API_KEY=$VITE_TINYMCE_API_KEY

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
