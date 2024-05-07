#!/bin/bash

# 检查后端服务是否就绪
check_backend() {
    echo "Checking if backend is ready..."
    until curl --output /dev/null --silent --head --fail http://backend:9000/health; do
        printf '.'
        sleep 5
    done
}


# 执行健康检查
check_backend

echo "All dependencies are up! Starting the main application..."
# 启动主应用程序
exec "$@"