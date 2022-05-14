DROP TABLE IF EXISTS boissons;
DROP TABLE IF EXISTS pizzas;
DROP TABLE IF EXISTS entrees;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS livraison;
DROP TABLE IF EXISTS elem_livraison;
DROP TABLE IF EXISTS livreur;

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
    prix INT NOT NULL,
    sauce1 TEXT NOT NULL,
    sauce2 TEXT NOT NULL
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

create TABLE livreur(
    nom TEXT,
    flag boolean
);

create TABLE size(
    nom TEXT,
    supp int
);

create TABLE ingredients(
    nom TEXT,
    prix int
);

INSERT INTO boissons(id,nom, volume,prix) VALUES ('coca','Coca-Cola',33,2);
INSERT INTO boissons(id,nom, volume,prix) VALUES ('oasis','Oasis',33,2);
INSERT INTO boissons(id,nom, volume,prix) VALUES ('fanta','Fanta',33,2);

INSERT INTO pizzas(id,nom,prix) VALUES ('margherita','Margherita',10);
INSERT INTO pizzas(id,nom,prix) VALUES ('calzone','Calzone',10);
INSERT INTO pizzas(id,nom,prix) VALUES ('napolitaine','Napolitaine',10);

INSERT INTO entrees(id,nom,prix,sauce1,sauce2) VALUES ('cesar','Salade Cesar',8,'Vinaigrette','Olive');
INSERT INTO entrees(id,nom,prix,sauce1,sauce2) VALUES ('wings','Wings de Poulet',8,'ketchup','mayo');
INSERT INTO entrees(id,nom,prix,sauce1,sauce2) VALUES ('charcut','Plateau de charcuterie',8,'moutarde','mayo');

INSERT INTO livreur(nom,flag) VALUES('billy',false);
INSERT INTO livreur(nom,flag) VALUES('willy',false);
INSERT INTO livreur(nom,flag) VALUES('silly',false);

INSERT INTO size(nom,supp) VALUES('Petite',0);
INSERT INTO size(nom,supp) VALUES('Moyenne',2);
INSERT INTO size(nom,supp) VALUES('Grande',3);

INSERT INTO ingredients(nom,prix) VALUES('Sauce tomate',1);
INSERT INTO ingredients(nom,prix) VALUES('Creme fraiche',1);
INSERT INTO ingredients(nom,prix) VALUES('Gruyere',1);
INSERT INTO ingredients(nom,prix) VALUES('Mozarella',2);
INSERT INTO ingredients(nom,prix) VALUES('Jambon',2);
INSERT INTO ingredients(nom,prix) VALUES('Chevre',2);