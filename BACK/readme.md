lancer le back en local:

$npm install 
$npm run dev

Routes:

    /auth: //Route authentification de l'utilisateur
        /register
        /login

    /user: //Route spécial pour l'utilisateur et utilisation d'objets
        /:user_id/inventory
        /:user_id/:object_id/update
        /:user_id/finish

    /mark: //Route spécial pour les marques
        /:labyrinth_version_id
        /create

    /trap: 
        /:labyrinth_version_id
        /create

    /top:
        /time
        /good
        /bad
    
    /shop: // tout les objets route de base
        /:object_id
        /:object_id/buy
        
    