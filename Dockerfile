# Use the official Node.js 19-alpine image as the base image
FROM node:19-alpine AS base

# Install pnpm globally
RUN npm install --global --no-update-notifier --no-fund pnpm

# Create a user for running the application
RUN addgroup --system --gid 1001 nodejs && \
  adduser --system --uid 1001 -G nodejs nextjs

# Stage to install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
COPY .env.local ./
RUN pnpm install --frozen-lockfile --prefer-offline

# Stage to build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm build

# Production stage
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copy built files and necessary resources
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env.local ./

USER nextjs

# Expose the port the app runs on
EXPOSE 3000

ENV PORT 3000

# Set the default command to run the application
# CMD ["node", ".next/standalone/server.js"]
CMD ["pnpm", "start"]
