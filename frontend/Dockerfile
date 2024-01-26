ARG PROFILE

FROM node:21-alpine3.18 AS builder

WORKDIR /usr/local/app

COPY /frontend .

RUN npm install

RUN echo "Profil sélectionné: ${PROFILE}"

RUN npm run build:profile -- --configuration=${PROFILE}

FROM nginx:1.21.3-alpine

COPY /frontend/.nginx/nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=builder /usr/local/app/dist/adelium /usr/share/nginx/html

EXPOSE 80