This is supporting repository for "Hello Express" talk / lab / blog post

## Quick Start

To run: docker-compose up --build
- docker-compose.yml file uses official mongo and node images
Visual Studio: Use the Solution file in root

## Building your own Docker images

Dockerfile.mongodb and Dockerfile.node can be used to build your own Mongo and Node container images (for learning purposes). There is also docker-compose-manual.yml that you can be used with docker-compose -f docker-compose-manual.yml --build and it will automatically build these images first

On Windows; you can use DockerBuild.bat and DockerRun.bat files to build and run the docker images
