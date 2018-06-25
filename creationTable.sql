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
  
