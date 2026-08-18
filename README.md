# DeepSeek Harness - Android Client Dist

Deekseep Xposed 模块的 DeepSeek Harness 客户端 Web UI 分发包。

## 文件说明

- `dist/` - Vite 构建的完整 Web 前端产物（需配合 dsh-harness 后端使用）
- `dsh-harness-dist.tar.gz` - 打包好的 dist 压缩包

## 使用方式

1. 解压 `dsh-harness-dist.tar.gz` 到 DeepSeek App 的 files 目录
2. 配合 dsh-harness web 后端启动（node apps/cli/lib/bin.js web --host 127.0.0.1 --port 3080）
3. 通过 WebView 访问 http://127.0.0.1:3080

## 源码

完整 dsh-harness 源码参见 [deepseek-ai/dsh-harness](https://github.com/deepseek-ai/dsh-harness)

## 开源协议

GNU GPL-3.0-only

