FROM node:20-bookworm AS builder

ARG SENTRY_DSN
ARG SENTRY_AUTH_TOKEN

RUN npm i --global pnpm

WORKDIR /home/app

COPY . .

RUN pnpm fetch && \
	pnpm install -r --prefer-offline --frozen-lockfile && \
    pnpm run build && \
	rm -rf node_modules

FROM node:20-bookworm-slim AS runtime

WORKDIR /home/app

COPY --from=builder /home/app/package.json .
COPY --from=builder /home/app/pnpm-lock.yaml .
COPY --from=builder /home/app/dist .

RUN npm i  --global pnpm  && pnpm install --prod

ENV NODE_ENV=production
ENV HOST="0.0.0.0"

EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]