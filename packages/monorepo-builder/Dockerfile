# scratch
FROM node:12.10.0
WORKDIR /app
RUN cat ~/.npmrc > ~/.npmrc
COPY package-lock.json package.json ./
RUN npm install
RUN echo $PWD

#COPY .storybook ./.storybook
#COPY docs ./docs
COPY babel.config.js .
COPY .eslintrc.js .
COPY webpack.config.server.js .
COPY webpack.config.client.js .
COPY rollup.config.js .
COPY rollup.config.functions.ts .
COPY lerna.json .
#COPY styleguide.config.ts .
# mayb delete it - not using
#COPY rollup.config.server.js .
