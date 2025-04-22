#
# make is a build tool on unix-like systems.
# I use it as a functional cheat-sheet
# for commands frequently used in the project.
# most commands will work on all *nix systems,
# the open command is macos specific.
#

.RECIPEPREFIX = -
.PHONY = open

port=3001
container_name=cookstore-container
url=http://localhost:${port}/hello
image_name=cookstore-image

docker-start: open
- docker container rm ${container_name} || true
- docker container rm cookstore-container || true

- docker container run --name ${container_name} --volume .:/home/node/ -p 3002:3002 ${image_name}:latest npm start
- docker container run --name cookstore-container --volume .:/home/node/ -p 3002:3002 cookstore-image:latest npm start
docker-stop: 
- docker container stop ${container_name}

docker-build:
- docker image build --tag ${image_name}:latest .

open:
- open ${url}

open80:
- open http://localhost/hello

start: open
- node index.js

open-doc:
- open http://localhost/doc

bash_nginx:
- docker container exec -ti reverse_proxy /bin/bash
bash_app:
- docker container exec -ti reverse_proxy /bin/bash


compose-start: open80
- docker compose up
compose-stop:
- docker compose down
