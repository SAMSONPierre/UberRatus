const express = require('express');
const serv= express();
var bodyParser = require('body-parser')
const pg = require('pg');
const session = require('express-session')


const pool = new pg.Pool({
user: 'postgres',
host: 'localhost',
database: 'ubereats',
password: 'dinoclier', // à modifier
port: 5432
});

serv.use(session({
    // It holds the secret key for session
    secret: 'Your_Secret_Key',
    // Forces the session to be saved
    // back to the session store
    resave: true,
    // Forces a session that is "uninitialized"
    // to be saved to the store
    saveUninitialized: true
}));

var id = 0;
var entrees;
var pizzas;
var boissons;
var ingredients;
var livraison;
var elem_livraison;
var commande = [];
var total = 0;
var name_sessions = "default";
var livreur;
var flag = false;
var livreur_dispo = [];

pool.connect();
pool.query("SELECT * FROM entrees",(err,res)=>{
    if(!err){
        entrees = res.rows;
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

pool.query("SELECT * FROM boissons",(err,res)=>{
    if(!err){
        boissons = res.rows;
    }
    else{
        console.log(console.error);
    }
    
});
function getLivraison(){
    return promise = new Promise((resolve, reject) => {
        pool.query("SELECT * FROM livraison",(err,res)=>{
            if(!err){
                resolve(res.rows);
            }
            else{
                reject(err);
            }
        });
    });
    
    
}

function getElemLivraison(){
    return promise = new Promise((resolve, reject) => {
        pool.query("SELECT * FROM elem_livraison",(err,res)=>{
            if(!err){
                resolve(res.rows);
            }
            else{
                reject(err);
            }
        });
    });
}

  pool.query("SELECT * FROM livreur ",(err,res)=>{
    if(!err){
        livreur = res.rows;
    }
    else{
        console.log(console.error);
    }
    
});

function getLivreurDispo(){
    livreur.forEach(element => {
        if(!element.flag){
            livreur_dispo.push(element.nom);
        }
    });
}


pool.query("SELECT * FROM livraison ",(err,res)=>{
    if(!err){
        livraison = res.rows;
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
            let test = res.rows;
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


serv.use(express.static('.'));
serv.use(bodyParser.json());
serv.use(bodyParser.urlencoded());

serv.get('/',function (req,res) {
    res.render("Main.ejs",{entrees:entrees,boissons:boissons,pizzas:pizzas,ingredients:ingredients});
});

serv.get('/livraison',function(req,res) {
    getLivraison()
    .then(res => {
        //console.log(res);
        livraison = res;
    })
    .catch(error => { console.log("test")});
    getElemLivraison()
    .then(res => {
        //console.log(res);
        elem_livraison = res;
    })
    .catch(error => { console.log("test")});
    res.render("livraison.ejs",{livraison:livraison,elem_livraison:elem_livraison,livreur:name_sessions});
});


serv.get('/connexion',function(req,res){
    res.render("connexion.ejs");
});

serv.post('/connexion',function(req,res){
    name_sessions = req.body.name;
    console.log("WELCOME " + name_sessions);
    res.render("Main.ejs",{entrees:entrees,boissons:boissons,pizzas:pizzas,ingredients:ingredients});
});

serv.post('/formulaire',function(req,res){
    let panier = req.body.panier;
    commande = [];
    total = 0;
    if(panier instanceof Array){
        console.log(panier);
        
        panier.forEach(element => {
            let tab = element.split(" ");
            commande.push([tab[0],tab[1],tab[2],tab[3]]);
            total += parseInt(tab[3]);
        });
        res.render('formulaire.ejs');
    }
    else{
        let tab = panier.split(" ");
        commande.push([tab[0],tab[1],tab[2],tab[3]]);
        total += parseInt(tab[3]);
        res.render("formulaire.ejs");
        
    }
});

serv.post('/livraison',function(req,res){
    var id = req.body.livre;
    //console.log(req.body.livre);
    pool.query("DELETE FROM livraison WHERE id_livraison = " + id + ";");
    pool.query("DELETE FROM elem_livraison WHERE id_livraison = " + id + ";");
    pool.query("UPDATE livreur SET flag = false WHERE livreur.nom = '"+ name_sessions +"';");
    console.log(livreur_dispo);
    livreur_dispo.push(name_sessions);
    console.log(livreur_dispo);
    res.render("Main.ejs",{entrees:entrees,boissons:boissons,pizzas:pizzas,ingredients:ingredients});
});

serv.post('/merci',function(req,res){
    if(!flag){ getLivreurDispo(); flag = true;}
    var liv = livreur_dispo[0];
    console.log(livreur_dispo);
    livreur_dispo.shift();
    console.log(livreur_dispo);
    nom = req.body.nom + " " + req.body.prenom;
    adresse = req.body.adresse + " " + req.body.ville + " " + req.body.postal;
    pool.query("INSERT INTO livraison(id_livraison,adresse,nom,total,livreur) VALUES(" + id +",'" +adresse +"','"+nom + "'," + total + ",'"+ liv + "');");
    commande.forEach(element => {
        pool.query("INSERT INTO elem_livraison(id_livraison,type_plat,nom_plat,prix,x) VALUES(" + id +",'" + element[0] + "','" + element[1] + "','" + element[3] + "','" + element[2] +"');" );
    });
    pool.query("UPDATE livreur SET flag = true WHERE livreur.nom = '"+ liv +"';");
    res.send("Merci " + nom + " pour votre commande. Elle arrivera dans 20 minutes au " + adresse + " et sera livrée par " + liv);
    id++;
});
pool.end;
serv.listen(8080);

console.log("The server is now running at http://localhost:8080");