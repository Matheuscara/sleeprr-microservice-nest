FROM node:alpine As development

WORKDIR /src/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install -g @nestjs/cli

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /src/src/app

COPY package.json ./
# COPY package-lock.json ./

RUN npm install --prod

COPY --from=development /src/src/app/dist ./dist

CMD ["node", "dist/apps/reservations/main"]