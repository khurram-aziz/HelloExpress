docker stop mongodb
docker stop helloexpress

docker rm mongodb
docker rm helloexpress

docker run -d -v mongo-data:/data/db --name mongodb khurram/mongo
docker run -d -p 3000:3000 -v /mnt/srcshare/HelloExpress:/app --link mongodb:mongodb --name helloexpress khurram/node nodejs /app/bin/www