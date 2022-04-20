const nbrJoueur = 2;
let min = 20;
let max = 100;
let randomAtq;
let randomDef;
let randomAncienAtq = -1;

this.nombreAleatoire = function () {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

class personnage {
    constructor(_nom, _vie, _attaque, _defense, _existe) {

        while (_nom == "") {
            // alert("pas de nom!");
            _nom = prompt("nom de votre héro : ");
        }

        this.nom = _nom;
        this.vie = nombreAleatoire();
        this.attaque = nombreAleatoire();
        this.defense = nombreAleatoire();
        this.afficheInfos = function () {
            console.log(this)
        }
        this.attaquer = function (defenseur) {
            console.log("Nouvelle attaque de" + " " + this.nom + " " + "sur" + " " + defenseur.nom);


            if (this.attaque > defenseur.defense) {
                defenseur.vie = defenseur.vie - 10;
                if (defenseur.vie <= 0) {
                    defenseur.existe = false;
                }
            }
            if (this.attaque == defenseur.defense) {
                defenseur.vie = defenseur.vie - 5;
                if (defenseur.vie <= 0) {
                    defenseur.existe = false;
                }
            }
            if (this.attaque < defenseur.defense) {
                this.vie = this.vie - 5;
                if (defenseur.vie <= 0) {
                    defenseur.existe = false;
                }
            }
            if (this.vie <= 0) {
                console.log("%cle personnage" + " " + this.nom + " " + "est mort!","color:yellow");
            }
            if (defenseur.vie <= 0) {
                console.log("%cle personnage" + " " + defenseur.nom + " " + "est mort!","color:yellow");
            }

        }

        if (this.vie <= 0) {
            this.existe = false;

        } else {
            this.existe = true;
        }
    }
}
let perso;
let joueurs = new Array();
let persoCree = 0;


while (persoCree != nbrJoueur) {
    perso = new personnage("");
    joueurs.push(perso);
    persoCree += 1;
}

//  console.log(tabPersos[0]);
//  console.log(tabPersos[1]);




// let perso1 = new perso("");
// perso1.afficheInfos();

// let perso2 = new perso("");
// perso2.afficheInfos();


// perso1.attaquer(perso2);
// perso2.afficheInfos();

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