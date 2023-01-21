FROM node:18-bullseye AS builder

RUN npm i --global pnpm

WORKDIR /home/app

COPY . .

RUN pnpm fetch && \
	pnpm install -r --prefer-offline --frozen-lockfile && \
    pnpm run build && \
	rm -rf node_modules

FROM nginx:1.23.1 AS runtime

COPY --from=builder /home/app/dist/ /usr/share/nginx/html/

ENV NGINX_PORT=80