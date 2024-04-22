FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

ENV PORT 4007
ENV DATABASE_URL "postgresql://user:password@localhost:5432/payment_db?schema=public"

EXPOSE 4007

CMD ["npm", "run", "dev"]