FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --frozen-lockfile

COPY . .

ENV PORT 4003
ENV SERVICE_NAME "Email service"
ENV DATABASE_URL "postgresql://user:password@localhost:5432/email_db?schema=public"

ENV DEFAULT_SENDER_EMAIL "jahid@gmail.com"
ENV SMTP_HOST "localhost"
ENV SMTP_PORT "1025"

EXPOSE 4003

CMD ["npm", "run", "dev"]