mongo:
	docker run -p 27017:27017 \
	-d \
	--rm \
	--name mongodb \
	--network notes-net \
	--env-file ./config/development.env \
	-v mongo-data:/data/db \
	mongo

backend:
	docker run -p 5000:5000 \
	--rm \
	--name backend \
	--network notes-net \
	--env-file ./config/development.env \
	-v D:/Portfolio/Helpingfiles/docker-mern-master/server:/app \
	-v /app/node_modules \
	backend

frontend:
	docker run -p 3000:3000 \
	--rm \
	--name frontend \
	--network notes-net \
	-v D:/Portfolio/Helpingfiles/docker-mern-master/client/src:/client/src \
	frontend

stop:
	docker stop mongodb frontend backend

dev:
	docker-compose -f docker-compose.yml up -d

build:
	docker-compose -f docker.compose.production.yml up

down:
	docker-compose down