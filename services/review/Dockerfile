FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

ENV PORT 4006
ENV DATABASE_URL "postgresql://user:password@localhost:5432/review_db?schema=public"

EXPOSE 4006

CMD ["npm", "run", "dev"]