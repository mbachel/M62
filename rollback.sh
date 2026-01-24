#!/bin/bash
set -e

# setting colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # no color

# configuration
DEPLOY_DIR='/home/deploy/m62'
VERSION_FILE="${DEPLOY_DIR}/.deployment/current_version"
BACKUP_DIR="${DEPLOY_DIR}/.deployment/backups"

# ensure backup directory exists
mkdir -p "${BACKUP_DIR}"

# function for logging
log() {
    echo -e "${GREEN}[$(date + "%Y-%m-%d %H:%M:%S")]${NC} $1"
}

# function for error handling
error() {
    echo -e "${RED}[$(date + "%Y-%m-%d %H:%M:%S")]${NC} $1"
    exit 1
}

# function for warnings
warn() {
    echo -e "${YELLOW}[$(date + "%Y-%m-%d %H:%M:%S")]${NC} $1"
}

# check if version file exists
if [ ! -f "$VERSION_FILE" ]; then
    error "No deployment history found. Cannot proceed with rollback."
fi

# read current/previous versions
CURRENT_VERSION=$(cat "$VERSION_FILE" | tail -1)
PREVIOUS_VERSION=$(cat "$VERSION_FILE" | tail -2 | head -1)

if [ -z "$PREVIOUS_VERSION" ]; then
    error "No previous versions to rollback to."
fi

log "Current version: $CURRENT_VERSION"
log "Rolling back to: $PREVIOUS_VERSION"

# change to deploy directory
cd "$DEPLOY_DIR" || error "Failed to change directory to $DEPLOY_DIR"

# fetch latest to ensure all tags are present
git fetch origin

# checkout previous version
log "Checking out previous version $PREVIOUS_VERSION..."
git checkout "$PREVIOUS_VERSION" || error "Failed to checkout version $PREVIOUS_VERSION"

# rebuild and restart containers
log "Rebuilding and restarting containers..."
docker compose down
docker compose up -d --build || error "Failed to start containers"

# wait for services to stabilize
log "Waiting for services to stabilize..."
sleep 5

# verify health
if docker compose exec -T backend curl -s http://localhost:3000/api/health > /dev/null 2>&1; then
    log "Health check passed"
    # update version file - remove the last line (rollback by keeping only previous versions)
    sed -i '$d' "$VERSION_FILE"
    log "Rollback completed successfully!"
    log "Current deployed version: $PREVIOUS_VERSION"
else
    warn "Health check failed. Rolling forward to recover..."
    git checkout "$CURRENT_VERSION" || error "Failed to checkout back to version $CURRENT_VERSION"
    docker compose down
    docker compose up -d --build
    error "Rollback health check failed. Recovered previous state."
fi