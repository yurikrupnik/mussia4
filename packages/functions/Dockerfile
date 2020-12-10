FROM gcr.io/mussia4/lerna AS builder

COPY . ./packages/functions

RUN npm i
RUN npm run postinstall
RUN npm run build

EXPOSE 3332 3333

CMD ["npm", "run", "fucntion"]
