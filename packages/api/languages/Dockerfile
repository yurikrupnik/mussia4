FROM gcr.io/mussia4/lerna AS builder

ARG distFolder=lib
ARG modulePath=.
ENV MODULE_PATH=$modulePath
ARG port=8080
ENV PORT=$port

COPY . .$MODULE_PATH
RUN npm i
RUN npm run postinstall
RUN npm run build

FROM node:12.10.0-alpine

ARG port=8080
ENV PORT=$port

ARG distFolder=dist
ARG modulePath=.
ENV DIST_FOLDER=$distFolder
ENV MODULE_PATH=$modulePath
WORKDIR /usr/src/app
COPY --from=builder /app$MODULE_PATH/$DIST_FOLDER .
RUN npm install --only=production

EXPOSE ${PORT}

CMD ["npm", "start"]
