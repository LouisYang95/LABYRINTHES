# Projet Labyrinthes

**Labyrinthes** est une application de gaming interactive basée sur une plateforme web où les utilisateurs explorent un labyrinthe généré procéduralement. Chaque labyrinthe est réinitialisé quotidiennement, offrant une expérience renouvelée aux joueurs. Les joueurs peuvent laisser des marques, poser des pièges et interagir avec les objets du labyrinthe pour marquer leur parcours et aider ou piéger d'autres joueurs.

## Fonctionnalités Principales

1. **Exploration de Labyrinthes Dynamiques** :
   - Chaque jour, un nouveau labyrinthe est généré grâce à un système de seed.
   - Les joueurs peuvent naviguer dans le labyrinthe en quête de récompenses ou pour éviter des pièges posés par d'autres utilisateurs.

2. **Marques et Pièges** :
   - Les joueurs peuvent laisser des marques et poser des pièges dans le labyrinthe, visibles pour les autres explorateurs.
   - Les marques et pièges sont réinitialisés chaque jour pour garantir une expérience unique chaque matin.

3. **Classements en Temps Réel** :
   - Les classements sont mis à jour en temps réel via WebSocket pour afficher les meilleurs joueurs en fonction de critères tels que le temps passé dans le labyrinthe, les "Good Points", et les "Bad Points".

4. **Compatibilité avec Unity** :
   - Une extension C# permet d'intégrer le projet avec Unity pour une expérience de jeu immersive.
   - Unity peut se connecter au backend via WebSocket pour synchroniser en temps réel les éléments du labyrinthe.

5. **Gestion de l'Inventaire** :
   - Les joueurs peuvent collecter et gérer des objets dans un inventaire interactif.
   - Un système d'achat permet d'acquérir des items pour les cadeaux ou des pièges en utilisant des monnaies virtuelles.

## Technologies Utilisées

- **Backend** : Node.js, Express.js, Sequelize (pour la gestion de la base de données MySQL)
- **Frontend** : Angular pour la plateforme web, avec Toastr pour les notifications et WebSocket pour les communications en temps réel.
- **Base de Données** : MySQL pour gérer les informations utilisateurs, les objets et les classements.
- **Swagger** : Documentation des API REST.
- **Unity** : Moteur de jeu utilisé pour le développement d'une extension immersive liée au projet.

## Authors

- [@Adrien](https://github.com/Adrien140401)
- [@Abed](https://github.com/Massimiliano-HA)
- [@Thomas](https://github.com/ThomasCast3)
- [@Theo](https://github.com/Tony95Montana)
- [@Florian](https://github.com/FlorianCohenJoly)
- [@Louis](https://github.com/LouisYang95)
