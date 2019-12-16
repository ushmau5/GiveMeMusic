FROM node:latest
ENV WEB_SERVER="http://localhost:5000"

COPY public /public
COPY src /src
COPY package.json /
COPY package-lock.json /

RUN npm install
EXPOSE 3000
CMD ["npm", "start"]

