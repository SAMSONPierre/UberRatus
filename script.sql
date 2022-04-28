DROP TABLE IF EXISTS boissons;
DROP TABLE IF EXISTS pizzas;
DROP TABLE IF EXISTS entrees;
DROP TABLE IF EXISTS ingredients;

CREATE TABLE boissons(
    nom TEXT NOT NULL,
    volume INT NOT NULL,
    prix INT NOT NULL
);

CREATE TABLE pizzas(
    nom TEXT NOT NULL,
    prix INT NOT NULL
);

CREATE TABLE entrees(
    nom TEXT NOT NULL,
    prix INT NOT NULL,
    sauce1 TEXT NOT NULL,
    sauce2 TEXT NOT NULL
);

INSERT INTO boissons(nom, volume,prix) VALUES ('coca',33,2);
INSERT INTO boissons(nom, volume,prix) VALUES ('oasis',33,2);
INSERT INTO boissons(nom, volume,prix) VALUES ('fanta',33,2);

INSERT INTO pizzas(nom,prix) VALUES ('margherita',10);
INSERT INTO pizzas(nom,prix) VALUES ('calzone',10);
INSERT INTO pizzas(nom,prix) VALUES ('napolitaine',10);

INSERT INTO entrees(nom,prix,sauce1,sauce2) VALUES ('cesar',8,'Vinaigrette','Olive');
INSERT INTO entrees(nom,prix,sauce1,sauce2) VALUES ('wings',8,'ketchup','mayo');
INSERT INTO entrees(nom,prix,sauce1,sauce2) VALUES ('charcut',8,'moutarde forte','moutarde faible');