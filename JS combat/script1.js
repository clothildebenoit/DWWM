
let min = 20;
let max = 100;
let randomAtq;
let randomDef;
let randomAncienAtq = -1;

//-------------------------COLOR
function colorLog (message,color) {
    switch (color) {
        case "dead":
            color = "red";
            break;
        case "win":
            color = "green";
            break;
        case "battle":
            color = "orange";
            break;
        case "perso":
            color = "blue";
            break;
        default:
            color = "black";
            break;
    }
    console.log("%c" + message, "color: " + color);
}

// this.nombreAleatoire = function () {
//     return Math.floor(Math.random() * (max - min + 1) + min);
// }

// .............................ancienne classe
// class personnage {
//     constructor(_nom, _vie, _attaque, _defense, _existe) {

//         while (_nom == "") {
//             // alert("pas de nom!");
//             _nom = prompt("nom de votre héro : ");
//         }

//         this.nom = _nom;
//         this.vie = nombreAleatoire();
//         this.attaque = nombreAleatoire();
//         this.defense = nombreAleatoire();
//         this.afficheInfos = function () {
//             console.log(this)
//         }
//         this.attaquer = function (defenseur) {
//             console.log("Nouvelle attaque de" + " " + this.nom + " " + "sur" + " " + defenseur.nom);


//             if (this.attaque > defenseur.defense) {
//                 defenseur.vie = defenseur.vie - 10;
//                 if (defenseur.vie <= 0) {
//                     defenseur.existe = false;
//                 }
//             }
//             if (this.attaque == defenseur.defense) {
//                 defenseur.vie = defenseur.vie - 5;
//                 if (defenseur.vie <= 0) {
//                     defenseur.existe = false;
//                 }
//             }
//             if (this.attaque < defenseur.defense) {
//                 this.vie = this.vie - 5;
//                 if (defenseur.vie <= 0) {
//                     defenseur.existe = false;
//                 }
//             }
//             if (this.vie <= 0) {
//                 console.log("%cle personnage" + " " + this.nom + " " + "est mort!","color:yellow");
//             }
//             if (defenseur.vie <= 0) {
//                 console.log("%cle personnage" + " " + defenseur.nom + " " + "est mort!","color:yellow");
//             }

//         }

//         if (this.vie <= 0) {
//             this.existe = false;

//         } else {
//             this.existe = true;
//         }
//     }
// }


    // ------------------------CLASS

class personnage {
    
    
    // .....static
        // Static nombreAleatoire(){

        // }



    constructor(nom) {

        this.nombreAleatoire = function () {

            return Math.floor(Math.random() * (max - min + 1) + min);
        }


        // -----------------------------------------EXISTE
        var _existe;
        this.Getexiste = function () {
            return _existe;
        }
        this.Setexiste = function (newexiste) {
            _existe = newexiste;
        }
        // ---------------------------------------NOM
        var _nom = "";
        this.Getnom = function () {
            return _nom;
        }
        this.Setnom = function (newnom) {
            _nom = newnom
        }
        if (nom != "") {
            this.Setnom(nom);
            _existe = true;
        }
        // ------------------------------VIE
        var _vie = this.nombreAleatoire();

        this.Getvie = function () {
            return _vie;
        }
        this.Setvie = function (newvie) {
            _vie = newvie;
        }
        // ----------------------------------ATTAQUE
        var _attaque = this.nombreAleatoire();

        this.Getattaque = function () {
            return _attaque;
        }
        this.Setattaque = function (newattaque) {
            _attaque = newattaque;
        }
        // ---------------------------------------DEFENSE
        var _defense = this.nombreAleatoire();
        this.Getdefense = function () {
            return _defense;
        }
        this.Setdefense = function (newdefense) {
            _defense = newdefense
        }
        // ----------------------------------------------AFFICHER INFO
        this.afficherInfo = function () {
            colorLog(`Nom : ${this.Getnom()}, Vie : ${this.Getvie()}, Attaque : ${this.Getattaque()}, Défense : ${this.Getdefense()}`, "perso");
        }
        // ---------------------------------------------- SURPRISE MOTHERFUCKER
        this.attaquer = function (defenseur) {

            console.log(`nouvelle attaque de: ${this.Getnom()} sur ${defenseur.Getnom()}`)
            if (this.Getattaque() > defenseur.Getdefense()) {
                defenseur.Setvie(defenseur.Getvie() - 10);
                console.log(`niveau de vie de ${defenseur.Getnom()}: ${defenseur.Getvie()}`)
            }
            if (this.Getattaque() == defenseur.Getdefense()) {
                defenseur.Setvie(defenseur.Getvie() - 5);
                console.log(`niveau de vie de ${defenseur.Getnom()}: ${defenseur.Getvie()}`)
            }
            if (this.Getattaque() < defenseur.Getdefense()) {
                this.Setvie(this.Getvie() - 5);
                console.log(`niveau de vie de ${this.Getnom()}: ${this.Getvie()}`)
            }
            if (this.Getvie() <= 0) {
                console.log(`%cle personnage ${this.Getnom()} est dead.`, "color:red")
                this.Setexiste(false);
            }
            if (defenseur.Getvie() <= 0) {
                colorLog("le personnage "+ defenseur.Getnom() + " est dead.", "dead")
                defenseur.Setexiste(false);
            }

        }

    }
}



// ...le tableau
let nbrJoueur = 2;
let joueurs = new Array();
let nbrejoueurcree = 0;
let nomSaisie = '';
let perso;
while (nbrejoueurcree < nbrJoueur && nomSaisie == '') {

    nomSaisie = prompt("Saisissez un nom:");
    if (nomSaisie != '') {
        perso = new personnage(nomSaisie);
        perso.afficherInfo();
        joueurs.push(perso);
        nomSaisie = '';
        nbrejoueurcree += 1;
    }
}



// ------FONCTION RANDOM----------


function joueurAleatoire(length) {
    return Math.floor(Math.random() * length);
}

//tant qu'il reste plus d'un joueur
while (joueurs.length > 1) {
    //definit l'attaquant de façon aléatoire
    randomAtq = joueurAleatoire(joueurs.length);
    //definit le defenseur 
    randomDef = joueurAleatoire(joueurs.length);
    //verifie si l'attaquant est different de l'ancien attaquant
    if (randomAtq != randomAncienAtq) {
        //verifie si l'attaquand est different du defenseur 
        if (randomAtq != randomDef) {
            //attaque
            joueurs[randomAtq].attaquer(joueurs[randomDef])
            try {
                //si l'attaquant est mort on le supprime du tableau
                if (joueurs[randomAtq].existe == false) {
                    joueurs.splice(randomAtq, 1);
                }
                //si le defenseur est mort on le supprime du tableau
                if (joueurs[randomDef].existe == false) {
                    joueurs.splice(randomDef, 1);
                }
                //on intercepte l'erreur si la donnée du tableau n'existe plus 
            } catch (error) {

            }


            //l'attaquant devient l'ancien attaquant 
            randomAncienAtq = randomAtq;
        }
    }
    console.log(joueurs);
}