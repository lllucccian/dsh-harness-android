#!/usr/bin/env bash
set -e
cd /data/data/com.termux/files/home/dsh-harness
export DEEPSEEK_BASE_URL=http://127.0.0.1:8765/v1
exec node --expose-internals apps/cli/lib/bin.js web --host 127.0.0.1 --port 3080
