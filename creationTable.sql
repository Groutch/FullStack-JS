CREATE DATABASE Mediatheque;
USE Mediatheque;

CREATE TABLE Client(
  id_Client INT NOT NULL AUTO_INCREMENT,
  Nom VARCHAR(45),
  Prenom VARCHAR(45),
  Adresse VARCHAR (60),
  Tel VARCHAR(13),
  PRIMARY KEY(id_Client)
  );
  
CREATE TABLE Reservation (
  id_Reservation INT NOT NULL AUTO_INCREMENT,
  Date DATE,
  id_Client INT,
  PRIMARY KEY(id_Reservation),
  FOREIGN KEY (id_Client) REFERENCES Client(id_Client)
  );
  
CREATE TABLE Type_Document (
  id_Type INT NOT NULL AUTO_INCREMENT,
  Nom_Type VARCHAR(45),
  PRIMARY KEY(id_Type)
  );
  
CREATE TABLE Document (
  id_Document INT NOT NULL AUTO_INCREMENT,
  Titre VARCHAR(45),
  Auteur VARCHAR(45),
  Date_Sortie DATE,
  Emprunt TINYINT(1),
  id_Type INT,
  PRIMARY KEY (id_Document),
  FOREIGN KEY (id_Type) REFERENCES Type_Document(id_Type)
  );
  
  CREATE TABLE Ligne (
  id_Ligne INT NOT NULL AUTO_INCREMENT,
  id_Document INT,
  id_Reservation INT,
  PRIMARY KEY (id_Ligne),
  FOREIGN KEY (id_Document) REFERENCES Document(id_Document),
  FOREIGN KEY (id_Reservation) REFERENCES Reservation(id_Reservation)
  );
/* insertion type documents */
INSERT INTO Type_Document (Nom_Type)
VALUES ("Livre"),("CD"),("DVD"),("Partitions");

/* insertion dans la table Document */
INSERT INTO Document (Titre, Auteur, Date_Sortie, Emprunt, id_Type)
VALUES("Le petit Prince", "Saint-Exupery","1943-01-01",0,1),
("Guerre et Paix", "Léon Tolstoï","1865-01-01",0,1),
("Donnie Darko","Richard Kelly","2001-01-19",0,3),
("Je dis aime","-M-","1999-10-25",0,2),
("... And Justice For All","Metallica","1988-08-25",0,2),
("La flute en chantier","Moe Zart","1791-09-30",0,4),
("Ink","Jamin Winans","2009-01-23",0,3),
("HALLELUJAH","Jeff Buckley","1994-01-01",0,4);
