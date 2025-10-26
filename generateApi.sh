#!/usr/bin/env bash

# Exit on any error
set -e

# Load environment variables
if [ -f .env ]; then
    echo "Loading environment variables from .env file..."
    set -o allexport
    source .env
    set +o allexport
    echo "Environment variables loaded successfully"
else
    echo "Warning: .env file not found"
fi

# Debug: Print the environment variable
echo "VITE_API_BASE_URL: ${VITE_API_BASE_URL:-'NOT SET'}"

# Run the generator
echo "Starting API generation..."
node ./generate-api-contract.mjs

# Remove hardcoded baseURL from generated http-client.ts
echo "Removing hardcoded baseURL..."
sed -i '' "s|baseURL: axiosConfig\.baseURL \|\| \"${VITE_API_BASE_URL}\"|baseURL: axiosConfig.baseURL|g" ./src/api/http-client.ts

echo "API contract generation completed successfully!"
