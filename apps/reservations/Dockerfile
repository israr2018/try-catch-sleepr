FROM node:alpine As Development
WORKDIR /user/src/app
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

RUN pnpm install
COPY . .

RUN pnpm run build

FROM node:alpine as production

ARG NODE_ENV=production

ENV NODE_ENV={NODE_ENV}

WORKDIR /user/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY --from=development user/src/app/dist ./dist



CMD [ "node","dist/apps/reservations/main" ]


