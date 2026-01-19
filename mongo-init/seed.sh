#!/bin/bash
set -e

echo "Waiting for MongoDB to be ready..."
sleep 5

echo "Importing data into MongoDB..."

# Import genai_adoption data
mongoimport --host localhost --db m62 --collection genai_adoption \
    --file /docker-entrypoint-initdb.d/genai_adoption.json --jsonArray

# Import model_performance data
mongoimport --host localhost --db m62 --collection model_performance \
    --file /docker-entrypoint-initdb.d/model_performance.json --jsonArray

# Import model_releases data
mongoimport --host localhost --db m62 --collection model_releases \
    --file /docker-entrypoint-initdb.d/model_releases.json --jsonArray

echo "Data import completed successfully!"