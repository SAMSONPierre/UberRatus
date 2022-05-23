CREATE DATABASE ubereats;
\c ubereats
DROP TABLE IF EXISTS boissons;
DROP TABLE IF EXISTS pizzas;
DROP TABLE IF EXISTS entrees;
DROP TABLE if EXISTS menu;
DROP TABLE IF EXISTS livraison;
DROP TABLE IF EXISTS elem_livraison;
DROP TABLE IF EXISTS livreur;
DROP TABLE IF EXISTS size;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS elem_custom;
DROP TABLE IF EXISTS elem_menu;
DROP TABLE IF EXISTS sauce;
DROP TABLE IF EXISTS menu_compo;


CREATE TABLE boissons(
    id TEXT NOT NULL,
    nom TEXT NOT NULL,
    volume INT NOT NULL,
    prix INT NOT NULL
);

CREATE TABLE pizzas(
    id TEXT NOT NULL,
    nom TEXT NOT NULL,
    prix INT NOT NULL
);

CREATE TABLE entrees(
    id TEXT NOT NULL,
    nom TEXT NOT NULL,
    prix INT NOT NULL
);

CREATE TABLE menu(
    id TEXT,
    nom TEXT,
    prix INT,
    entree INT,
    pizza INT,
    boisson INT,
    cond INT
);

CREATE TABLE menu_compo(
    id_plat TEXT,
    id_menu TEXT
);

create TABLE livraison(
    id_livraison INT,
    adresse TEXT,
    nom TEXT,
    total FLOAT,
    livreur TEXT
);

create TABLE elem_livraison(
    id_livraison INT,
    type_plat TEXT,
    nom_plat TEXT,
    prix TEXT,
    x TEXT
);

create TABLE elem_custom(
    id_custom INT,
    id_livraison INT,
    nom TEXT
);

create TABLE elem_menu(
    id_menu INT,
    id_livraison INT,
    nom TEXT
);

create TABLE livreur(
    nom TEXT,
    flag boolean,
    en_service boolean
);

create TABLE size(
    nom TEXT,
    supp int
);

create TABLE ingredients(
    nom TEXT,
    prix int
);

create TABLE sauce(
    nom TEXT
);


INSERT INTO boissons(id,nom, volume,prix) VALUES ('coca33','Coca-Cola 33cL',33,2);
INSERT INTO boissons(id,nom, volume,prix) VALUES ('oasis33','Oasis 33cL',33,2);
INSERT INTO boissons(id,nom, volume,prix) VALUES ('fanta33','Fanta 33cL',33,2);
INSERT INTO boissons(id,nom, volume,prix) VALUES ('cocacherry33','Coca-Cola Cherry 33cL',33,2);
INSERT INTO boissons(id,nom, volume,prix) VALUES ('heineken33','Heineken 33cL',33,3);
INSERT INTO boissons(id,nom, volume,prix) VALUES ('orangina33','Orangina 33cL',33,2);
INSERT INTO boissons(id,nom, volume,prix) VALUES ('tropico33','Tropico 33cL',33,2);

INSERT INTO boissons(id,nom, volume,prix) VALUES ('coca50','Coca-Cola 50cL',50,3);
INSERT INTO boissons(id,nom, volume,prix) VALUES ('cristaline50','Cristaline 50cL',50,3);
INSERT INTO boissons(id,nom, volume,prix) VALUES ('fuzetea50','FuzeTea 50cL',50,3);


INSERT INTO boissons(id,nom, volume,prix) VALUES ('coca1L','Coca-Cola 1L',100,5);
INSERT INTO boissons(id,nom, volume,prix) VALUES ('oasis1L','Oasis 1L',100,5);
INSERT INTO boissons(id,nom, volume,prix) VALUES ('fanta1L','Fanta 1L',100,5);
INSERT INTO boissons(id,nom, volume,prix) VALUES ('perrier1L','Perrier 1L',100,4);




INSERT INTO pizzas(id,nom,prix) VALUES ('margherita','Margherita',10);
INSERT INTO pizzas(id,nom,prix) VALUES ('4fromages','4 Fromages',13);
INSERT INTO pizzas(id,nom,prix) VALUES ('napolitaine','Napolitaine',12);
INSERT INTO pizzas(id,nom,prix) VALUES ('brooklyn','Brooklyn',11);
INSERT INTO pizzas(id,nom,prix) VALUES ('marinara','Marinara',10);
INSERT INTO pizzas(id,nom,prix) VALUES ('prosciutto_et_funghi','Prosciutto y Funghi',13);
INSERT INTO pizzas(id,nom,prix) VALUES ('speckiale','Speckiale',12);
INSERT INTO pizzas(id,nom,prix) VALUES ('tartufo_speck','Tartufo Speck',15);
INSERT INTO pizzas(id,nom,prix) VALUES ('tripletta','Tripletta',12);

INSERT INTO entrees(id,nom,prix) VALUES ('printemps','Salade de Printemps',8);
INSERT INTO entrees(id,nom,prix) VALUES ('italienne','Salade Italienne',7);
INSERT INTO entrees(id,nom,prix) VALUES ('terremer','Salade terre-mer',10);
INSERT INTO entrees(id,nom,prix) VALUES ('mozastick','Batonnets de mozarella',6);
INSERT INTO entrees(id,nom,prix) VALUES ('camembert','Beignets au camembert',6);
INSERT INTO entrees(id,nom,prix) VALUES ('tenders','Tenders de Poulet',8);

INSERT INTO livreur(nom,flag,en_service) VALUES('Dimitri Zehef',false,true);
INSERT INTO livreur(nom,flag,en_service) VALUES('William Comore',false,false);
INSERT INTO livreur(nom,flag,en_service) VALUES('Nicolas Mouk',false,false);
INSERT INTO livreur(nom,flag,en_service) VALUES('Abdelatif Mousson',false,false);
INSERT INTO livreur(nom,flag,en_service) VALUES('Tony Baston',false,false);
INSERT INTO livreur(nom,flag,en_service) VALUES('Paul Castagne',false,false);

INSERT INTO size(nom,supp) VALUES('Petite',0);
INSERT INTO size(nom,supp) VALUES('Moyenne',2);
INSERT INTO size(nom,supp) VALUES('Grande',3);

INSERT INTO ingredients(nom,prix) VALUES('Rien',0);
INSERT INTO ingredients(nom,prix) VALUES('Sauce_tomate',1);
INSERT INTO ingredients(nom,prix) VALUES('Creme_fraiche',1);
INSERT INTO ingredients(nom,prix) VALUES('Gruyere',1);
INSERT INTO ingredients(nom,prix) VALUES('Mozarella',2);
INSERT INTO ingredients(nom,prix) VALUES('Jambon',2);
INSERT INTO ingredients(nom,prix) VALUES('Chevre',2);
INSERT INTO ingredients(nom,prix) VALUES('Anchois',2);
INSERT INTO ingredients(nom,prix) VALUES('Artichaut',3);
INSERT INTO ingredients(nom,prix) VALUES('Champignon',2);
INSERT INTO ingredients(nom,prix) VALUES('Pepperoni',2);
INSERT INTO ingredients(nom,prix) VALUES('Truffe',5);
INSERT INTO ingredients(nom,prix) VALUES('Oeuf',2);
INSERT INTO ingredients(nom,prix) VALUES('Poivron',2);
INSERT INTO ingredients(nom,prix) VALUES('Roquefort',3);
INSERT INTO ingredients(nom,prix) VALUES('Olive',2);
INSERT INTO ingredients(nom,prix) VALUES('Parmigiano',2);
INSERT INTO ingredients(nom,prix) VALUES('Basilic',1);
INSERT INTO ingredients(nom,prix) VALUES('Oignon',1);
INSERT INTO ingredients(nom,prix) VALUES('Capres',2);
INSERT INTO ingredients(nom,prix) VALUES('Lardon',3);
INSERT INTO ingredients(nom,prix) VALUES('Raclette',2);
INSERT INTO ingredients(nom,prix) VALUES('Piment',2);


INSERT INTO menu(id,nom,prix,entree,pizza,boisson,cond) VALUES('extra','Menu Extra',20,1,1,2,33);
INSERT INTO menu(id,nom,prix,entree,pizza,boisson,cond) VALUES('giga','Menu Giga',30,1,2,1,100);
INSERT INTO menu(id,nom,prix,entree,pizza,boisson,cond) VALUES('Zerma','Menu Zerma',35,2,2,1,100);

INSERT INTO sauce(nom) VALUES('Ketchup');
INSERT INTO sauce(nom) VALUES('Mayonnaise');
INSERT INTO sauce(nom) VALUES('Tatziki');
INSERT INTO sauce(nom) VALUES('Vinaigrette');
INSERT INTO sauce(nom) VALUES('Algerienne');
INSERT INTO sauce(nom) VALUES('Piquante');
INSERT INTO sauce(nom) VALUES('Moutarde');
INSERT INTO sauce(nom) VALUES('Curry');
INSERT INTO sauce(nom) VALUES('Barbecue');

