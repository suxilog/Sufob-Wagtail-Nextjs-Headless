#!/bin/bash

# 检查后端服务是否就绪

npm install

# 执行健康检查
# 启动主应用程序
exec "$@"