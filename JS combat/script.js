class perso {
    constructor(_nom, _vie, _attaque, _defense, _existe) {

        while (_nom == "") {
            alert("pas de nom!");
            _nom = prompt("nom de votre héro : ");
        }


        this.nom = _nom;
        this.vie = _vie;
        this.attaque = _attaque;
        this.defense = _defense;
        this.afficheInfos = function () {
            console.log(this)
        }
        this.attaquer = function (defenseur) {
            console.log ("Nouvelle attaque de" +this.nom+ "sur" + defenseur.nom);


            if (this.attaque > defenseur.defense) {
                defenseur.vie= defenseur.vie - 10;
                if (defenseur.vie<=0) {
                    defenseur.existe=false;
                }
            }
            if (this.attaque==defenseur.defense) {
                defenseur.vie= defenseur.vie -5;
                if (defenseur.vie<=0) {
                    defenseur.existe=false;
                }
            }
            if (this.attaque<defenseur.defense) {
                this.vie= this.vie -5;
                if (defenseur.vie<=0) {
                    defenseur.existe=false;
                }
            }
            
        }
        
        if (this.vie <= 0) {
            this.existe = false;
        } else {
            this.existe = true;
        }
    }
}

let perso1 = new perso("Gwen", 10, 10, 10);
perso1.afficheInfos();

let perso2 = new perso("clo", 10, 10, 10);
perso2.afficheInfos();


perso1.attaquer(perso2);
perso2.afficheInfos();

