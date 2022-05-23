# projet PW

### Groupe

- MORAND Paul-Emile
- SAMSON Pierre

/!\ pour bien connecté la base de donnée au service veuillez bien renseigné vos
informations postgres dans la `const pool` du `main.js` aux lignes 12 et 13.
### Execution
- Après avoir décompressé l'archive, vous pouvez exécuter le script `init.sql` pour créer 
et remplir la base de donnée.
- Vous pouvez désormais lancé le serveur avec la commande `nodejs main.js` sur Linux ou
`node main.js` sur Windows ou MacOS.
- le service se lance. il ne vous reste plus qu'à le visiter sur le lien: 
`http://localhost:8080`

### Précisions
La connexion des livreurs est assez simpliste, il suffit de visiter le lien : `http://localhost:8080/connexion` et de rentrer le nom du livreur.
Les livreurs codés dans la BDD sont : 
- `Dimitri Zehef`
- `William Comore`
- `Nicolas Mouk`
- `Abdelatif Mousson`
- `Tony Baston`
- `Paul Castagne`

Un livreur est considéré comme `en service` et donc potentiellement `disponible` pour
faire des livraisons une fois qu'il se connecte sur le site.
Le seul livreur qui est considéré comme `en service` de base est `Dimitri Zehef`.
Si aucun serveur n'est `en service` et `disponible` la commande est en attente.
La commande est attribuée dès qu'un livreur devient disponible.

Chaque livreur visualise sa livraison ( si il en a une) dans la page `http://localhost:8080/livraison`
qu'il peut également supprimer si il l'a livré.

Il existe également un compte `administrateur` ( connexion -> administrateur) où on peut voir 
`TOUTES` les commandes.
