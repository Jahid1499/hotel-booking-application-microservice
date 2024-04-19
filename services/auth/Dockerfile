# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

COPY prisma ./prisma/

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 4002
EXPOSE 4002

# Set environment variable DATABASE_URL
ENV DATABASE_URL="postgresql://user:password@localhost:5432/auth_db?schema=public"


# Generate Prisma client
# RUN prisma generate

# Command to run the application
CMD ["npm", "run", "dev"]
