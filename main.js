const express = require('express');
const serv= express();
var bodyParser = require('body-parser')
const pg = require('pg');
const hostname = "127.0.0.1";
const port = 8080;


const pool = new pg.Pool({
user: 'postgres',
host: 'localhost',
database: 'ubereats',
password: 'dinoclier', // à modifier selon le compte
port: 5432
});

/* 
    Variables globales
*/

var id = 0;
var entrees;
var pizzas;
var boissons;
var menus;
var ingredients;
var livraison;
var elem_livraison;
var size;
var sauce;
var commande = [];
var total = 0;
var name_sessions = "default";
var livreur;
var flag = false;
var livreur_dispo = [];
var commande_en_attente = [];
var livreur_pas_en_service = [];
var all_livreur = [];
var id_custom = 0;
var elem_custom;

/*
    Requêtes au lancement du serveur
*/
pool.connect();
pool.query("SELECT * FROM entrees",(err,res)=>{
    if(!err){
        entrees = res.rows;
    }
    else{
        console.log(console.error);
    }
});

pool.query("SELECT * FROM size",(err,res)=>{
    if(!err){
        size = res.rows;
    }
    else{
        console.log(console.error);
    }
});


pool.query("SELECT * FROM pizzas",(err,res)=>{
    if(!err){
        pizzas = res.rows;
    }
    else{
        console.log(console.error);
    }
})

pool.query("SELECT * FROM menu",(err,res)=>{
    if(!err){
        menus = res.rows;
    }
    else{
        console.log(console.error);
    }
});

pool.query("SELECT * FROM boissons",(err,res)=>{
    if(!err){
        boissons = res.rows;
    }
    else{
        console.log(console.error);
    }
    
});

pool.query("SELECT * FROM elem_custom",(err,res)=>{
    if(!err){
        elem_custom = res.rows;
    }
    else{
        console.log(console.error);
    }
    
});

pool.query("SELECT * FROM elem_menu",(err,res)=>{
    if(!err){
        elem_menu = res.rows;
    }
    else{
        console.log(console.error);
    }

});

pool.query("SELECT * FROM livreur ",(err,res)=>{
    if(!err){
        livreur = res.rows;
    }
    else{
        console.log(console.error);
    }
    
});

pool.query("SELECT * FROM livraison ",(err,res)=>{
    if(!err){
        livraison = res.rows;
    }
    else{
        console.log(console.error);
    }
    
});

pool.query("SELECT * FROM sauce ",(err,res)=>{
    if(!err){
        sauce = res.rows;
    }
    else{
        console.log(console.error);
    }
    
});

pool.query("SELECT * FROM elem_livraison ",(err,res)=>{
    if(!err){
        elem_livraison = res.rows;
    }
    else{
        console.log(console.error);
    }
    
});

pool.query("SELECT * FROM ingredients",(err,res)=>{
    if(!err){
        ingredients = res.rows;
    }
    else{
        console.log(console.error);
    }
    
});

pool.query("SELECT MAX(id_livraison) FROM livraison",(err,res)=>{
    if(!err){
        try{
            let c = res.rows[0].max;
            id = c+1;
        }
        catch{
            id = 0;
        }
    }
    else{
        console.log(console.error);
    }
});

pool.query("SELECT MAX(id_custom) FROM elem_custom",(err,res)=>{
    if(!err){
        try{
            let c = res.rows[0].max;
            id_custom = c+1;
        }
        catch{
            id_custom = 0;
        }
    }
    else{
        console.log(console.error);
    }
});
pool.query("SELECT MAX(id_menu) FROM elem_menu",(err,res)=>{
    if(!err){
        try{
            let c = res.rows[0].max;
            id_menu = c+1;
        }
        catch{
            id_menu = 0;
        }
    }
    else{
        console.log(console.error);
    }
});


serv.use(express.static('.'));
serv.use(bodyParser.json());
serv.use(bodyParser.urlencoded());

/*
    GET
*/
serv.get('/',function (req,res) {
    if(!flag){ getLivreurDispo(); flag = true;}
    res.render("Main.ejs",{entrees:entrees,boissons:boissons,pizzas:pizzas,ingredients:ingredients,size:size,menus:menus,name_sessions:name_sessions,sauce:sauce});
});

serv.get('/livraison',function(req,res) {
    queryForLivraison();
    res.render("livraison.ejs",{livraison:livraison,elem_livraison:elem_livraison,livreur:name_sessions,elem_custom:elem_custom,elem_menu:elem_menu});
});


serv.get('/connexion',function(req,res){
    res.render("connexion.ejs");
});

serv.get('/inscription',function(req,res){
    res.render("inscription.ejs");
});

serv.get('*', function(req, res){
    res.render("error_404.ejs");
});

/*
    POST
*/

serv.post('/connexion',function(req,res){
    name_sessions = req.body.name;
    console.log("WELCOME " + name_sessions);
    queryForLivraison();
    pool.query("UPDATE livreur SET en_service = true WHERE nom = '" + name_sessions + "';");
    if(name_sessions !== "administrateur") gestionConnexionLivreur();
    res.render("Main.ejs",{entrees:entrees,boissons:boissons,pizzas:pizzas,ingredients:ingredients,size:size,menus:menus,name_sessions:name_sessions,sauce:sauce});
});

serv.post('/formulaire',function(req,res){
    let panier = req.body.panier;
    commande = [];
    total = 0;
    traitementPanier(panier);
    res.render("formulaire.ejs",{commande:commande,total:total});
    
});

serv.post('/livraison',function(req,res){
    var id = req.body.livre;
    deleteCommand(id);
    attributeCommand();
    queryForLivraison();
    res.render("Main.ejs",{entrees:entrees,boissons:boissons,pizzas:pizzas,ingredients:ingredients,size:size,menus:menus,name_sessions:name_sessions,sauce:sauce});
});

serv.post('/merci',function(req,res){
    var liv = gestionLivreur();
    nom = req.body.nom + " " + req.body.prenom;
    adresse = req.body.adresse + " " + req.body.ville + " " + req.body.postal;
    pool.query("INSERT INTO livraison(id_livraison,adresse,nom,total,livreur) VALUES(" + id +",'" +adresse +"','"+nom + "'," + total + ",'"+ liv + "');");
    commande.forEach(element => {
        insertLivraison(element);
    });
    queryForLivraison();
    pool.query("UPDATE livreur SET flag = true WHERE livreur.nom = '"+ liv +"';");
    res.render("recap_com.ejs",{commande:commande,total:total,nom:nom,adresse:adresse,liv:liv});
    id++;
});


pool.end;
serv.listen(port, hostname, () => {
    console.log(`Le serveur tourne à l'adresse https://${hostname}:${port}/`);
  })

/* 
    FUNCTIONS
*/

/**
 * 
 */
function attributeCommand(flag){
    if(commande_en_attente.length === 0 ){
        pool.query("UPDATE livreur SET flag = false WHERE livreur.nom = '"+ name_sessions +"';");
        livreur_dispo.push(name_sessions);
        console.log("Une commande vous sera bientôt attribuée");
    }
    else{
        var liv_id = commande_en_attente.shift();
        pool.query("UPDATE livraison SET livreur = '"+ name_sessions+ "' WHERE id_livraison = " +liv_id +";");
        console.log("La commande n°" + liv_id + " a été attribué à " + name_sessions);
    }
}
/** 
    * @param rien
    * 
    * @return fait les requêtes pour tous les éléments nécéssaires à la page livraison
*/
function queryForLivraison(){
    get("livraison")
    .then(res => {
        livraison = res;
    })
    .catch(error => { console.log(error)});
    get("elem_livraison")
    .then(res => {
        elem_livraison = res;
    })
    .catch(error => { console.log(error)});
    get("elem_custom")
    .then(res => {
        elem_custom = res;
    })
    .catch(error => { console.log(error)});
    get("elem_menu")
    .then(res =>{
        elem_menu = res;
    })
    .catch(error => {console.log(error)});
}

function getLivreurDispo(){
    livreur.forEach(element => {
        if(!element.flag && element.en_service){
            livreur_dispo.push(element.nom);
        }
        else if(!element.en_service){
            livreur_pas_en_service.push(element.nom);
        }
        all_livreur.push(element.nom);
    });
}
/** 
    * @param nom_table est le nom de la table à récupérer
    * 
    * @return la table dans la base de données sous forme de promise
*/
function get(nom_table){
    return promise = new Promise((resolve, reject) => {
        pool.query("SELECT * FROM " + nom_table,(err,res)=>{
            if(!err){
                resolve(res.rows);
            }
            else{
                reject(err);
            }
        });
    });
}   

/**
 * @param panier qui est les éléments envoyés par l'utilisateur
 * @return met à jour les variables globales panier / total selon ce que l'utilisateur a commandé
 */
function traitementPanier(panier){
    /* Différence de  traitement si le panier est constitué d'un ou de plusieurs éléments*/
    /* cas plusieurs */
    if(panier instanceof Array){        
        panier.forEach(element => {
            let tab = element.split(" ");
            addCust(tab);
        });
    }
    /* cas 1 */
    else{
        let tab = panier.split(" ");
        addCust(tab);
        
    }
}

/**
 * 
 * @param tab une ligne du panier
 * @return ajoute à la variable global commande chaque élément et incrémente le total en conséquence
 */
function addCust(tab){
    if(tab[0] === "custom" || tab[0] === "menu"){
        let cust = [];
        for(var i=0;i<tab.length;i++){
            cust.push(tab[i]);
        }
        commande.push(cust);
        total+= parseInt(tab[cust.length-1]);
    }
    else{
        commande.push([tab[0],tab[1],tab[2],tab[3]]);
        total += parseInt(tab[3]);
    }
}

/**
 * @param id qui lie toutes les données dans la BDD
 * @return delete toutes les données ayant id dans les livraisons
 */
function deleteCommand(id){
    pool.query("DELETE FROM livraison WHERE id_livraison = " + id + ";");
    pool.query("DELETE FROM elem_livraison WHERE id_livraison = " + id + ";");
    pool.query("DELETE FROM elem_custom WHERE id_livraison = " + id + ";");
    pool.query("DELETE FROM elem_menu WHERE id_livraison = " + id +";");
}
/**
 * 
 * @param element element d'une commande
 * @return insert dans la bdd les commandes
 */
function insertLivraison(element){
    if(element[0] === "custom"){

        pool.query("INSERT INTO elem_livraison(id_livraison,type_plat,nom_plat,prix,x) VALUES(" + id +",'" + element[0] + "','" + element[2] + "','" + element[element.length-1] + "','" + id_custom +"');" );
        for(var i=3;i<element.length-1;i++){
            pool.query("INSERT INTO elem_custom(id_custom,id_livraison,nom) VALUES("+id_custom+","+ id +",'"+element[i]+"');");
        }
        id_custom++;
    }
    else if(element[0] === "menu"){
        pool.query("INSERT INTO elem_livraison(id_livraison,type_plat,nom_plat,prix,x) VALUES(" + id +",'" + element[0] + "','" + element[1] + "','" + element[element.length-1] + "','" + id_menu +"');");
        for(var i=2;i<element.length-1;i++){
            pool.query("INSERT INTO elem_menu(id_menu,id_livraison,nom) VALUES(" + id_menu + "," + id + ",'" + element[i] + "');");
        }
        id_menu++;
    }
    else{
        pool.query("INSERT INTO elem_livraison(id_livraison,type_plat,nom_plat,prix,x) VALUES(" + id +",'" + element[0] + "','" + element[1] + "','" + element[3] + "','" + element[2] +"');" );
    }
}
/**
 * 
 * @returns waiting ou le nom du premier livreur disponible
 */
function gestionLivreur(){
    if(livreur_dispo.length === 0){
        commande_en_attente.push(id);
        return "waiting";
    }
    else{
        var res = livreur_dispo.shift();
        return res;
    }
}

function gestionConnexionLivreur(){

    if(all_livreur.includes(name_sessions)){
        if(livreur_pas_en_service.includes(name_sessions)){
            var myIndex = livreur_pas_en_service.indexOf(name_sessions);
            if (myIndex !== -1) {
                livreur_pas_en_service.splice(myIndex, 1);
            }
            pool.query("UPDATE livreur SET en_service = true WHERE livreur.nom = '" + name_sessions +"';");
            attributeCommand();
        }
        else if(livreur_dispo.includes(name_sessions)){
            attributeCommand();
        }
        else{
            console.log("Vous avez une commande à livrer");
        }
    }
    else{
        console.log("Nom de livreur incorrect.");
    }
}