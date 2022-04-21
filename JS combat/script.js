// ------------------------VARIABLES
let min;
let max;
let randomAtq;
let randomDef;
let randomAncienAtq = -1;
min = 20;
max = 100;

//-------------------------COLOR
function colorLog(message, color) {
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
// .........class Match
    class Match {
    }

    // ------------------------CLASS personnage

    class Heros {
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

            // ....modif partie 4
            this.Setvie = function (newvie) {
                _vie = newvie;
                if (_vie <= 0) {
                    _existe = false;
                    _vie = 0;
                    console.log(`%cle personnage ${this.Getnom()} est mort.`, "color:red")
                }
            }

            // this.Setvie = function (newvie) {
            //     _vie = newvie;
            // }

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
            // ---------------------------------------------- attaquer
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


                // .... modif partie 4
                // if (this.Getvie() <= 0) {
                //     console.log("%cle personnage +{this.Getnom()} est mort.", "color:red")
                //     this.Setexiste(false);
                // }
                // if (defenseur.Getvie() <= 0) {
                //     colorLog("le personnage "+ defenseur.Getnom() + " est dead.", "dead")
                //     defenseur.Setexiste(false);
                // }

            }

        }
    }
    //-------------------------------TABLEAU-----------------------------------------
    let nbrJoueur = 2;
    var joueurs = new Array();
    var nbrejoueurcree = 0;
    var nomSaisie = '';
    var perso;
    while (nbrejoueurcree < nbrJoueur && nomSaisie == '') {

        nomSaisie = prompt("Saisissez un nom:");
        if (nomSaisie != '') {
            perso = new Heros(nomSaisie);
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
                    if (joueurs[randomAtq].Getexiste() == false) {
                        joueurs.splice(randomAtq, 1);
                    }
                    //si le defenseur est mort on le supprime du tableau
                    if (joueurs[randomDef].Getexiste() == false) {
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