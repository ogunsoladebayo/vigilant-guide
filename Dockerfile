FROM registry.access.redhat.com/ubi8/nodejs-16:1-42 AS builder

WORKDIR /opt/app-root/src

COPY . .

RUN ls -lA && npm ci && npm run build

FROM registry.access.redhat.com/ubi8/nodejs-16:1-42

USER default

LABEL name="pizza-shop-service" \
      vendor="Pizza Shop" \
      version="1" \
      release="28.1618434924" \
      summary="This is a container image." \
      description="This container image will deploy Pizza Shop Service.

WORKDIR /opt/app-root/src


COPY --from=builder /opt/app-root/src/dist dist

COPY package*.json ./
RUN npm ci --only=production

COPY licenses /licenses
COPY public public

ENV HOST=0.0.0.0 PORT=3000

EXPOSE 3000/tcp

CMD ["npm","run","serve"]

