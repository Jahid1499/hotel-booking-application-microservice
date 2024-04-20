FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --frozen-lockfile

COPY . .

ENV PORT 4005
ENV DATABASE_URL "postgresql://user:password@localhost:5432/booking_db?schema=public"

EXPOSE 4005

CMD ["npm", "run", "dev"]