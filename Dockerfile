# Use the official Node.js 19-alpine image as the base image
FROM node:19-alpine AS base

# Install pnpm globally
RUN npm install --global --no-update-notifier --no-fund pnpm

# Create the nextjs user and group
RUN addgroup -S nextjs && adduser -S -G nextjs -h /home/nextjs nextjs

# Stage to install dependencies
FROM base AS deps

# Ensure apk has necessary permissions
USER root
RUN apk add --no-cache libc6-compat

# Switch to the nextjs user
USER nextjs
WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prefer-offline

# Stage to build the application
FROM base AS builder

# Switch to the nextjs user
USER nextjs
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm build

# Production stage
FROM node:19-alpine AS runner

# Create the nextjs user and group
RUN addgroup -S nextjs && adduser -S -G nextjs -h /home/nextjs nextjs

# Switch to the nextjs user
USER nextjs
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy built files and necessary resources
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env.local* ./

# Expose the port the app runs on
EXPOSE 3000

ENV PORT 3000

# Set the default command to run the application
# CMD ["pnpm", "start"]
CMD ["node", ".next/standalone/server.js"]
