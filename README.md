# le-pigeon

## ALGOLIA

1. Introduction:

API utilisée pour la géolocalisation. L'API fonction avec des API_KEY générés à partir du site fournisseur.

Chaque API_KEY gratuit donne droit à 2500 requêtes par jour.
Les API_KEY sont définies dans front\.env

REACT_APP_APP_ID_ALGOLIA_NAIM=pl9Z8TRWV4I3
REACT_APP_API_KEY_ALGOLIA_NAIM=bc1cb9962e909f0f29520e5cc8c028fd

2. Exemple appel:
   front\src\components\algolia\Places.js

## DATABASE

1. Introduction:

La database utilisée est MYSQL. L'ORM utlisé pour gérer les accès à la database est SEQUELIZE.

Les informations de connexion à la database sont définies dans back\.env

Un utilisateur avec le rôle ADMIN est créé avec l'application via les 3 SEEDERS ci-dessous. Cet admin par défaut est identifié avec son email "admin@pigeon.com" et son password "password"

2. Exemple appel:

npm install --save sequelize
npx sequelize-cli db:drop
npx sequelize-cli db:create
npx sequelize-cli db:migrate

//Initialisation de la database et de l'application
npx sequelize-cli db:seed --seed 20200319143012-UserSeed.js
npx sequelize-cli db:seed --seed 20200319144846-RolesSeed.js
npx sequelize-cli db:seed --seed 20200319152254-UserRoles.js

cd back\
npm run startDev

## WEBRTC

1. Introduction:

Nous avons utilisé la technologie WebRTC pour gérer la video conférence et le live chat.

Les ressources du serveur se trouvent dans back\services\. Il ya les CERTIFICATS SSL à remplacer avec des véritables certificats de PRODUCTION et un service nodejs qui est le service WEBRTC à lancer en même temps avec le reste de l'application.

back\package.json
"startRTC": "node ../back/services/ServerWebRTC.js"

2. Exemple appel:

cd back\
npm run startRTC

## AUTRES TECHNOLOGIES

### Back

1. NodeJS/Express
2. MYSQL/SEQUELIZE
3. JWT (Authentification)
4. AXIOS
5. WEBRTC
6. SSL

### Front

1. REACTJS
2. MATERIAL-UI
3. ALGOLIA
4. SaSS

## LIENS UTILES

Project kanban
https://trello.com/b/K30HHC3q/le-pigeon

Project brief
https://docs.google.com/presentation/d/18uy6YQfS4CgOSgbo512RWDuny3o0QZt8jg0d5o8woAg/edit?usp=sharing

Project charter
https://docs.google.com/document/d/1mM_m0S-CE24hOduglewzkkoWwPjCcCejbwc_3wWkuws/edit?usp=sharing

Project presentation
https://meet.google.com/linkredirect?authuser=0&dest=https%3A%2F%2Fdocs.google.com%2Fpresentation%2Fd%2F15ab4VcSzb-WbBA-p1qPGz4v_io3ee-RAGLcvOWvGfTg%2Fedit%3Fusp%3Dsharing
