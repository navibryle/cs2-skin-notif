FROM node:21-bullseye

ARG DATABASE_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG DOMAIN_URL
ARG GOOGLE_CLIENT_SECRET
ARG GOOGLE_CLIENT_ID

RUN mkdir -p /home/cs/repo
WORKDIR /home/cs/repo
RUN git clone https://github.com/navibryle/cs2-skin-notif.git
WORKDIR /home/cs/repo/cs2-skin-notif
RUN touch .env && echo "DATABASE_URL=${DATABASE_URL}" >> .env  && echo "NEXTAUTH_SECRET=${NEXTAUTH_SECRET}" >> .env && echo "NEXTAUTH_URL=${NEXTAUTH_URL}" >> .env && echo "DOMAIN_URL=${DOMAIN_URL}" >> .env && echo "GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}" >> .env && echo "GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}" >> .env && echo "NEXTAUTH_URL_INTERNAL=${NEXTAUTH_URL_INTERNAL}" >> .env
#RUN npm i && npm run build

#CMD npm run start
