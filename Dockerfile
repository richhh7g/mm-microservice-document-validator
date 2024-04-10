ARG NODE_VERSION=18.20.1

FROM bitnami/node:$NODE_VERSION AS build
WORKDIR /home/app

COPY . .

RUN npm set progress=false && npm config set depth 0 && npm install

RUN  npm run build

RUN npm prune --production

FROM node:${NODE_VERSION}-slim

USER node
WORKDIR /home/node

ENV NODE_ENV production

COPY --from=build --chown=node:node /home/app/package*.json ./
COPY --from=build --chown=node:node /home/app/node_modules/ ./node_modules/
COPY --from=build --chown=node:node /home/app/dist/ ./dist/

CMD ["node", "dist/main.js"]
