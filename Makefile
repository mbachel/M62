.PHONY: help build up down logs rollback tag deploy

help:
	@echo "M62 Deployment Commands"
	@echo "======================="
	@echo ""
	@echo "Development:"
	@echo "  make up             - Start all containers (with rebuild)"
	@echo "  make down           - Stop all containers"
	@echo "  make logs           - Tail logs from all services"
	@echo ""
	@echo "Deployment & Releases:"
	@echo "  make tag            - Tag current commit as a release (usage: make tag VERSION=v0.1.0)"
	@echo "  make deploy         - Deploy current main branch"
	@echo "  make rollback       - Rollback to previous deployment"
	@echo ""

build:
	docker compose build

up:
	docker compose up -d --build

down:
	docker compose down
	
logs:
	docker compose logs -f

tag:
	@powershell -Command "if ('$(VERSION)' -eq '') { Write-Host 'Usage: make tag VERSION=v0.1.0'; exit 1 }"
	@echo "Creating tag $(VERSION)..."
	git tag -a $(VERSION) -m "Release $(VERSION)"
	git push origin $(VERSION)
	@echo "Tag $(VERSION) created and pushed."

deploy:
	@echo "Deploying from main branch..."
	@echo "Ensure you've pushed to main, then run deploy on the server:"
	@echo "  ssh deploy@your-server 'cd /home/deploy/M62 && git pull && docker compose up -d --build'"

rollback:
	@echo "Rolling back to previous deployment..."
	bash rollback.sh