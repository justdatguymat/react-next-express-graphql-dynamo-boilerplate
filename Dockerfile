# BASE
FROM node:12.18-stretch-slim as base
WORKDIR /app
RUN mkdir client && mkdir server && chown -R node:node /app
RUN mkdir -p /var/log/app && chown node:node /var/log/app
USER node

# SERVER: Install Dependencies
FROM base as server-dependencies
WORKDIR /app/server
COPY ./server/package*.json ./
COPY ./server/tsconfig.json ./
RUN yarn install

# CLIENT: Install Dependencies
FROM base as client-dependencies
WORKDIR /app/client
COPY ./client/package*.json ./
COPY ./client/tsconfig.json ./
COPY ./client/.graphql.json ./
RUN yarn install

# SERVER: Build Source Code
FROM server-dependencies as server-build
COPY --chown=node:node ./server/src/ ./src/
RUN yarn run build

# CLIENT: Build Source Code
FROM client-dependencies as client-build
COPY --chown=node:node ./client/src/ ./src/
COPY --chown=node:node ./client/public/ ./public/
RUN yarn run build

# SERVER: Run Prod
FROM server-build as server-prod
EXPOSE 9001
CMD ["yarn", "run", "start"]

# CLIENT: Run Prod
FROM client-build as client-prod
EXPOSE 9000
CMD ["yarn", "run", "start"]

