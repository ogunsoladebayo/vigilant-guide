FROM node:16.18-alpine AS builder

WORKDIR /opt/app-root

COPY package*.json ./
COPY src src
COPY src/util/data data
COPY test test
COPY tsconfig.json ./
COPY rest.config ./

RUN ls -lA && npm ci && npm run build

FROM node:16.18-alpine

LABEL name="pizza-shop-service" \
      vendor="Pizza Shop" \
      version="1" \
      release="1" \
      summary="This is a container image." \
      description="This container image will deploy Pizza Shop Service."

WORKDIR /opt/app-root

COPY --from=builder /opt/app-root/dist dist
COPY --from=builder /opt/app-root/data dist/src/util/data

COPY package*.json ./
RUN npm ci --only=production
RUN npm install rimraf

ENV HOST=0.0.0.0 PORT=3000

EXPOSE 3000/tcp

CMD ["npm","run","serve"]
