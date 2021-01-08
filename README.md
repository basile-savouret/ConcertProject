### Bienvenue dans mon projet Symfony. 

Le serveur Symfony se trouve dans `/concertProject` c'est une api rest. 
Le fron-end se trouve dans  `/web` et est construit avec react en typescript.

## Démarrage du projet
Avant toute chose assurez vous d'avoir intaller toutes les dépendces du back et du front en lançant les commandes:
- `npm install` ou `yarn install` dans le dossier `/web`
- `composer install` dans le dossier `/concertProject`

Lancez d'abord le server symfony avec la commande `symfony server:start` sur le port 8000.

Puis lançez le front-end avec la commannde `npm run start` ou `yarn start`.

## Spécification du projet
Avec les fixtures dans symfony il y a le compte admin:
- email: admin@admin.fr
- mot de passe: admin

qui est créé avec tout les droits d'accès pour pouvoir tester toutes les fonctionnalités du projet.

A la crétion d'un utilisateur je laisse volontairement le choix des roles pour pouvoirs tester les différentes fonctionnalités
