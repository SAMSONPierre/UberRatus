const express = require('express');
const serv= express();
const pg = require('pg');
const pool = new pg.Pool({
user: 'postgres',
host: 'localhost',
database: 'test',
password: 'dinoclier', // à modifier
port: 5432
});

async function operations() {
    const client = await pool.connect();
    // attente du résultat de la requête :
    let res = await client.query ("SELECT * FROM client");
    // chaque nom de colonne correspond à un nom de propriété de res :
    console.log(res);
    for(row in res){
        console.log("t");
    }
    console.log("test");
    // ...
    // libération du client :
    client.release();
    // retour facultatif d'un résultat :
}

operations();
    
    

serv.use(express.static('.'));


serv.get('/',function (req,res,next) {
    res.sendFile("html/Main.html",{root:'.'});
});
 
serv.listen(8080);

console.log("The server is now running at http://localhost:8080");