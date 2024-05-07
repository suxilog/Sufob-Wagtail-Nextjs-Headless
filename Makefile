# 定义所有的伪目标
.PHONY: build-development start-build-development start-development stop-development build-production stop-production pull-latest-backend start-production deploy-prod force

# 构建开发环境的Docker镜像
build-dev: ## Build the development docker image.
	docker compose -f docker/development/docker-compose.yml build

# 构建并启动开发环境的Docker容器
start-dev-build: ## Start the development docker container.
	docker compose -f docker/development/docker-compose.yml up --build

# 启动开发环境的Docker容器（无构建）
start-dev: ## Start the development docker container.
	docker compose -f docker/development/docker-compose.yml up

# 停止开发环境的Docker容器
stop-dev: ## Stop the development docker container.
	docker compose -f docker/development/docker-compose.yml down

# 构建生产环境的Docker镜像（指定服务）
build-prod: ## Build the production docker image.
	docker compose -f docker/production/docker-compose.yml build
# 构建并启动生产环境的Docker容器
start-prod-build: ## Start the production docker container.
	docker compose -f docker/production/docker-compose.yml up --build  > ./logs/docker.log
# 启动生产环境的Docker容器
start-prod: ## Start the production docker container.
	docker compose -f docker/production/docker-compose.yml up
# 停止生产环境的Docker容器
stop-prod: ## Stop the production docker container.
	docker compose -f docker/production/docker-compose.yml down

