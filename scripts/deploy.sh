#!/bin/bash
set -e

# YUAN SHOWROOM 部署脚本
# 用法: 将 deploy-pkg.tar.gz 上传到服务器 /var/www/yuan-website 后执行此脚本

REMOTE_DIR="/var/www/yuan-website"
PM2_NAME="yuan-website"
PORT="3002"

echo "🚀 开始部署 YUAN SHOWROOM..."

# 1. 备份现有构建
if [ -d "$REMOTE_DIR/.next" ]; then
    BACKUP_NAME=".next.backup.$(date +%Y%m%d_%H%M%S)"
    echo "📦 备份现有构建到 $BACKUP_NAME..."
    mv "$REMOTE_DIR/.next" "$REMOTE_DIR/$BACKUP_NAME"
fi

# 2. 解压部署包
echo "📂 解压部署包..."
cd "$REMOTE_DIR"
tar -xzf deploy-pkg.tar.gz

# 3. 安装依赖
echo "📥 安装依赖..."
npm ci --production

# 4. 重启 PM2
echo "🔄 重启 PM2 进程..."
pm2 restart "$PM2_NAME" || pm2 start ecosystem.config.js

# 5. 验证服务
echo "🔍 验证服务状态..."
sleep 3
if curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:$PORT | grep -q "200"; then
    echo "✅ 部署成功！服务运行在端口 $PORT"
    echo "🌐 访问: https://yuanshowroom.cn"
else
    echo "❌ 服务验证失败，尝试回滚..."
    if [ -d "$REMOTE_DIR/$BACKUP_NAME" ]; then
        rm -rf "$REMOTE_DIR/.next"
        mv "$REMOTE_DIR/$BACKUP_NAME" "$REMOTE_DIR/.next"
        pm2 restart "$PM2_NAME"
        echo "↩️ 已回滚到之前的构建"
    fi
    exit 1
fi

# 6. 清理
echo "🧹 清理部署包..."
rm -f deploy-pkg.tar.gz

echo "✨ 部署完成！"
