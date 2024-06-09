# syntax = docker/dockerfile:experimental

FROM node:19-alpine AS base

RUN npm install --global --no-update-notifier --no-fund pnpm

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json .npmrc pnpm-lock.yaml* ./

# Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Get the latest Git tag and pass it as a build argument
# ARG GIT_COMMIT_SHA
# ENV NEXT_PUBLIC_GIT_COMMIT_SHA=$GIT_COMMIT_SHA

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env.local* ./

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["pnpm", "start"]
# CMD ['node' '.next/standalone/server.js']
