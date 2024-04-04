# Application ONEPAGE JS

## Description

Ce projet est une application web en une seule page (onepage) qui permet de visualiser des informations sur des Pokémon. L'application est développée en JavaScript et utilise JSON Server pour simuler une API REST.

## Installation

1. Clonez ce dépôt en utilisant la commande suivante :
   ```bash
   git clone https://github.com/rossetremine/tponepage
   ```

2. Installez json server avec npm.
    ```bash
    npm install -g json-server
    ```

3. Naviguez vers le répertoire du projet :
   ```bash
   cd tponepage
   ```

4. Lancez JSON server avec la commande suivante :
   ```bash
   npx json server pokedex.json
   ```

5. Lancez un serveur HTTP (par exemple, php -S localhost:8000 ou python).
    ```bash
    php -S localhost:8000
    ```
    ou
    ```bash
    python -m http.server
    ```

## Développeurs

- Julien ROSSE
- Marin TREMINE

## Fonctionnalités

- Lazy loading (scroll infini)
- Recherche côté client
- Détails des Pokémon
- Système de notation
- Système de favoris
- Générateur de Pokémon aléatoire
