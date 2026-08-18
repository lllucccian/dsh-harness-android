# DeepSeek Harness - Android

Deekseep Xposed 模块内置终端开发环境。

## 文件说明

- `apps/web/dist/` - Vite 构建的 Web 前端
- `apps/cli/lib/` - dsh-harness CLI 后端
- `packages/` - 插件源码
- `vendor/` - vendored Cordis

## 安装

```bash
git clone --depth 1 https://github.com/lllucccian/dsh-harness-android.git
cd dsh-harness-android
pnpm install --frozen-lockfile
```

## 启动

```bash
DEEPSEEK_API_KEY=sk-xxx DEEPSEEK_BASE_URL=http://127.0.0.1:8765/v1 \
  node --expose-internals apps/cli/lib/bin.js web --host 127.0.0.1 --port 3080
```

## 开源协议

GNU GPL-3.0-only

