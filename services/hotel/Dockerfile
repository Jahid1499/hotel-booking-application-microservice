FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

ENV PORT 4004
ENV DATABASE_URL "postgresql://user:password@localhost:5432/hotel_db?schema=public"

EXPOSE 4004

CMD ["npm", "run", "dev"]