# GitHub Repo Viewer

GitHub Repo Viewer to aplikacja webowa, która umożliwia wyświetlanie publicznych repozytoriów użytkownika GitHub. Aplikacja została stworzona w Node.js z wykorzystaniem frameworka Express.js i jest uruchamiana w kontenerze Docker.

## Funkcjonalności
- Wyświetlanie listy publicznych repozytoriów użytkownika GitHub.
- Automatyczne odświeżanie serwera w trybie deweloperskim dzięki `nodemon`.
- Obsługa zmiennych środowiskowych za pomocą pliku `.env`.

## Wymagania
- Docker i Docker Compose zainstalowane na komputerze.
- Konto na GitHubie oraz token dostępu osobistego (Personal Access Token).

## Instalacja i konfiguracja

1. Sklonuj repozytorium:
   ```bash
   git clone git@github.com:roq3/github-repo-viewer.git
   cd github-repo-viewer
   ```

2. Utwórz plik `.env` w katalogu głównym projektu i dodaj następujące zmienne środowiskowe:
   ```env
   GITHUB_TOKEN=twój_token_github
   GITHUB_USERNAME=twoja_nazwa_użytkownika
   ```

3. Uruchom aplikację w trybie deweloperskim za pomocą Docker Compose:
   ```bash
   docker-compose up --build
   ```

4. Aplikacja będzie dostępna pod adresem: [http://localhost:7123](http://localhost:7123)

## Licencja

Projekt jest dostępny na licencji MIT. Szczegóły znajdują się w pliku [LICENSE](LICENSE).