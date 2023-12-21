FROM --platform=linux/amd64 node:20.10.0-alpine as builder
WORKDIR /usr/src/app
COPY package*.json .
RUN npm i 
COPY . .
RUN npm run build

FROM --platform=linux/amd64 node:20.10.0-alpine as development
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
CMD ["npm", "run", "start:dev"]

FROM --platform=linux/amd64 node:20.10.0-alpine as production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist .
COPY --from=builder /usr/src/app/package*.json .
RUN npm ci
CMD ["node", "main"]
