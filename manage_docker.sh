#!/bin/bash

COMMAND=$1

case $COMMAND in
  up)
    echo "Uruchamianie kontenerów..."
    docker-compose up -d
    ;;
  down)
    echo "Zatrzymywanie i usuwanie kontenerów..."
    docker-compose down
    ;;
  restart)
    echo "Restartowanie kontenerów..."
    docker-compose down
    docker rm -f roque-github-app 2>/dev/null || true # Usuwanie istniejącego kontenera, jeśli istnieje
    docker-compose up -d
    ;;
  logs)
    echo "Wyświetlanie logów kontenera..."
    docker-compose logs -f
    ;;
  *)
    echo "Użycie: ./manage_docker.sh {up|down|restart|logs}"
    exit 1
    ;;
esac