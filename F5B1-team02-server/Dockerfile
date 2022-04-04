FROM node:14

WORKDIR /flog_backend/
COPY ./package.json /flog_backend/
COPY ./yarn.lock /flog_backend/
RUN yarn install

COPY . /flog_backend/
CMD yarn start:dev