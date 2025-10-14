# Stage 1: Dependencies (Giữ nguyên)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Stage 2: Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Chỉ truyền các biến public và URL vào lúc build.
# TUYỆT ĐỐI KHÔNG TRUYỀN NEXTAUTH_SECRET VÀO ĐÂY.
ARG NEXTAUTH_URL
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WEBSOCKET_URL

# Tạo file .env chỉ với các biến cần thiết cho việc build
RUN echo "NEXTAUTH_URL=$NEXTAUTH_URL" >> .env.production && \
    echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" >> .env.production && \
    echo "NEXT_PUBLIC_WEBSOCKET_URL=$NEXT_PUBLIC_WEBSOCKET_URL" >> .env.production

# Next.js sẽ tự động đọc file .env.production khi build
RUN npm run build

# Stage 3: Runner (Giữ nguyên)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# Các ENV PORT và HOSTNAME không cần thiết với output standalone

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
CMD ["node", "server.js"]