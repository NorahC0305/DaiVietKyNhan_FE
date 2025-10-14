# Stage 1: Cài đặt dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
# Dùng npm ci để cài đặt nhanh và nhất quán
RUN npm ci

# Stage 2: Build ứng dụng
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# KHÔNG truyền bất kỳ ARG secret nào vào đây.
# Next.js sẽ tự động build với các giá trị placeholder.
RUN npm run build

# Stage 3: Production Image - Tối ưu và nhỏ gọn
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
# ENV PORT=3000  <-- Không cần thiết, Next.js mặc định là 3000
# ENV HOSTNAME=0.0.0.0 <-- Không cần thiết, Next.js standalone mặc định đã lắng nghe trên tất cả các địa chỉ

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy các file cần thiết từ chế độ standalone
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

# Lệnh chạy server.js từ thư mục standalone
CMD ["node", "server.js"]