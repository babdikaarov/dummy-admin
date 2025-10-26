#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="ololo-gate-admin"
CONTAINER_NAME="ololo-gate-admin-container"
PORT=4173
API_BASE_URL="${VITE_API_BASE_URL:-http://3.89.56.23:8080}"

# Function to print colored messages
print_status() {
  echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Function to check if Docker is installed
check_docker() {
  if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
  fi
  print_status "Docker is installed"
}

# Function to build the Docker image
build_image() {
  print_status "Building Docker image: $IMAGE_NAME..."
  docker build -t "$IMAGE_NAME:latest" .

  if [ $? -eq 0 ]; then
    print_status "Docker image built successfully!"
  else
    print_error "Failed to build Docker image"
    exit 1
  fi
}

# Function to stop and remove existing container
cleanup_container() {
  if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    print_status "Stopping and removing existing container: $CONTAINER_NAME..."
    docker stop "$CONTAINER_NAME" 2>/dev/null
    docker rm "$CONTAINER_NAME" 2>/dev/null
    print_status "Existing container removed"
  fi
}

# Function to run the container
run_container() {
  print_status "Starting container: $CONTAINER_NAME on port $PORT..."

  docker run \
    --name "$CONTAINER_NAME" \
    -p "$PORT:4173" \
    -e "VITE_API_BASE_URL=$API_BASE_URL" \
    -d \
    "$IMAGE_NAME:latest"

  if [ $? -eq 0 ]; then
    print_status "Container started successfully!"
    print_status "Application is running at http://localhost:$PORT"
    print_status "API Base URL: $API_BASE_URL"
  else
    print_error "Failed to start container"
    exit 1
  fi
}

# Function to show logs
show_logs() {
  print_status "Showing container logs (press Ctrl+C to exit)..."
  docker logs -f "$CONTAINER_NAME"
}

# Function to display usage information
usage() {
  cat << EOF
Usage: ./run.sh [COMMAND]

Commands:
  build       - Build the Docker image
  start       - Build and start the container
  stop        - Stop the running container
  restart     - Restart the container
  logs        - Show container logs
  clean       - Remove the container and image
  shell       - Open a shell in the running container
  status      - Show container status
  help        - Display this help message

Examples:
  ./run.sh start                              # Start the application
  ./run.sh stop                               # Stop the application
  VITE_API_BASE_URL=http://localhost:8080 ./run.sh start   # Use custom API URL

Environment Variables:
  VITE_API_BASE_URL   - API backend URL (default: http://3.89.56.23:8080)
  PORT                - Port to run on (default: 3000)

EOF
}

# Function to show container status
show_status() {
  if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    print_status "Container is running"
    docker ps --filter "name=^${CONTAINER_NAME}$" --format "table {{.ID}}\t{{.Names}}\t{{.Status}}\t{{.Ports}}"
  else
    print_warning "Container is not running"
  fi
}

# Function to open shell in container
open_shell() {
  if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    print_status "Opening shell in container..."
    docker exec -it "$CONTAINER_NAME" /bin/sh
  else
    print_error "Container is not running. Start it first with: ./run.sh start"
    exit 1
  fi
}

# Main script logic
check_docker

case "${1:-start}" in
  build)
    build_image
    ;;
  start)
    build_image
    cleanup_container
    run_container
    show_logs
    ;;
  stop)
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
      print_status "Stopping container: $CONTAINER_NAME..."
      docker stop "$CONTAINER_NAME"
      print_status "Container stopped"
    else
      print_warning "Container is not running"
    fi
    ;;
  restart)
    print_status "Restarting container..."
    docker restart "$CONTAINER_NAME"
    print_status "Container restarted"
    show_logs
    ;;
  logs)
    show_logs
    ;;
  clean)
    print_status "Cleaning up..."
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
      docker stop "$CONTAINER_NAME" 2>/dev/null
      docker rm "$CONTAINER_NAME"
      print_status "Container removed"
    fi
    if docker images --format '{{.Repository}}:{{.Tag}}' | grep -q "^${IMAGE_NAME}:latest$"; then
      docker rmi "$IMAGE_NAME:latest"
      print_status "Image removed"
    fi
    print_status "Cleanup complete"
    ;;
  shell)
    open_shell
    ;;
  status)
    show_status
    ;;
  help)
    usage
    ;;
  *)
    print_error "Unknown command: $1"
    usage
    exit 1
    ;;
esac
