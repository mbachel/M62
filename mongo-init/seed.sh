#!/bin/bash
set -e

echo "Waiting for MongoDB to be ready..."
sleep 5

echo "Importing data into MongoDB..."

mongoimport --host localhost --db m62 --collection genai_adoption \
    --file /docker-entrypoint-initdb.d/genai_adoption.json --jsonArray

mongoimport --host localhost --db m62 --collection model_performance \
    --file /docker-entrypoint-initdb.d/model_performance.json --jsonArray

mongoimport --host localhost --db m62 --collection model_releases \
    --file /docker-entrypoint-initdb.d/model_releases.json --jsonArray

echo "Data import completed successfully!"