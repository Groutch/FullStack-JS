const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyparser = require('body-parser');
app.use(express.static('public'));

// Création de la connexion de mysql avec le site
let connection = mysql.createConnection({
    host: 'sql7.freemysqlhosting.net',
    user: 'sql7244577',
    password: 'hY7L4pP1xD',
    database: 'sql7244577'
});
//Utilisation de body-parser par le serveur
app.use(bodyparser.urlencoded({extended: false}));

// Définition du moteur de template
app.set('view engine', 'ejs');

// Définition de la route racine
app.get("/", function (req, res) {
    //recup de la liste des documents
    let sqlListDocs = "SELECT Document.id_Document, Document.id_Type, Document.Titre, Document.Auteur, DATE_FORMAT(Document.Date_Sortie,'%d/%m/%Y') AS Date_Sortie, Type_Document.Nom_Type FROM Document, Type_Document WHERE Document.id_Type = Type_Document.id_Type ORDER BY Type_Document.id_Type DESC";
    connection.query(sqlListDocs, function select(error, results, fields) {
        if (error) {
            console.log(error);
            return;
        }
        if (results.length > 0) {
            res.render("index", {listDocs: results});
        } else {
            console.log("Pas de données");
            res.render('index', {listDocs: "nodata"});
        }
    });
});

//losqu'on appuie sur le bouton rechercher... ça recherche !!
app.post("/searchdoc", function (req, res) {
    let sqlSearchDocs = "SELECT Document.id_Document, Document.id_Type, Document.Titre, Document.Auteur, DATE_FORMAT(Document.Date_Sortie,'%d/%m/%Y') AS Date_Sortie, Type_Document.Nom_Type FROM Document, Type_Document WHERE Document.id_Type = Type_Document.id_Type AND (Document.Titre LIKE '%"+req.body.searchitem+"%' OR Document.Auteur LIKE '%"+req.body.searchitem+"%') ORDER BY Type_Document.id_Type DESC";
    
    connection.query(sqlSearchDocs, function select(error, results, fields) {
        if (error) {
            console.log(error);
            return;
        }
        if (results.length > 0) {
            res.render("index", {listDocs: results});
        } else {
            console.log("Pas de données");
            res.render("index", {listDocs: "nodata"});
        }
    });
});

//Lorsqu'on clic sur un post... ça l'affiche seul!
app.get("/display/:id", function (req, res) {
    console.log(req.params);
    let sqlReadDoc = "SELECT Document.id_Document, Document.id_Type, Document.Titre, Document.Auteur, DATE_FORMAT(Document.Date_Sortie,'%d/%m/%Y') AS Date_Sortie, Type_Document.Nom_Type FROM Document, Type_Document WHERE Document.id_Type = Type_Document.id_Type AND id_Document="+req.params.id;
    connection.query(sqlReadDoc, function select(error, results, fields) {
        if (error) {
            console.log(error);
            return;
        }
        if (results.length > 0) {
            res.render("display", {doc: results[0]});
        } else {
            console.log("Pas de données");
            res.render('display', {doc: ["Pas de données"]});
        }
    });
});

// Lancement du serveur
const server = app.listen(process.env.PORT || 8080, (req, res) =>
    console.log('Server Ready')
);
