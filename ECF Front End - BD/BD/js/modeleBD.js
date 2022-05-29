const srcImg = "images/"; // emplacement des images de l'appli
const albumDefaultMini = srcImg + "noComicsMini.jpeg";
const albumDefault = srcImg + "noComics.jpeg";
const srcAlbumMini = "albumsMini/"; // emplacement des images des albums en petit
const srcAlbum = "albums/"; // emplacement des images des albums en grand

var txtSerie = document.getElementById("serie");
var txtNumero = document.getElementById("numero");
var txtTitre = document.getElementById("titre");
var txtAuteur = document.getElementById("auteur");
var txtPrix = document.getElementById("prix");
var imgAlbum = document.getElementById("album");
var imgAlbumMini = document.getElementById("albumMini");
var preview = document.getElementById("preview");

/**
     * Affichage de l'image par défaut si le chargement de l'image de l'album
     * ne s'est pas bien passé
     * 
     * @param {object HTML} element ;
     */

function prbImg(element) {
    // console.log(element);
    if (element.id === "albumMini")
        element.src = albumDefaultMini;
    else element.src = albumDefault;
}
/*Affichage des images, les effets sont chainés et traités
* en file d'attente par jQuery d'où les "stop()) et "clearQueue()" 
* pour éviter l'accumulation d'effets si défilement rapide des albums.
* 
* @param {object jQuery} $albumMini 
* @param {object jQuery} $album 
* @param {string} nomFic 
* @param {string} nomFicBig 
*/

function afficheAlbums($albumMini, $album, nomFicMini, nomFic) {
    $album.stop(true, true).clearQueue().fadeOut(100, function () {
        $album.attr('src', nomFic);
        $albumMini.stop(true, true).clearQueue().fadeOut(150, function () {
            $albumMini.attr('src', nomFicMini);
            $albumMini.slideDown(200, function () {
                $album.slideDown(200);
            });
        })
    })
}

//    fonction au chargement de la page
jQuery(document).ready(function ($) {

})

function mapToObject(Map) {
    return Object.assign(Object.create(null), ...[...Map].map(v => ({ [v[0]]: v[1] })));
}

// /**
//  * Récupération de l'album par son id et appel de 
//  * la fonction d'affichage
// @param {number} num 
//  */
function getAlbum(num) {

    var album = albums.get(num.value);

    if (album === undefined) {
        txtSerie.value = "";
        txtNumero.value = "";
        txtTitre.value = "";
        txtAuteur.value = "";
        txtPrix.value = 0;

        afficheAlbums($("#albumMini"), $("#album"), albumDefaultMini, albumDefault);

    } else {
        var serie = series.get(album.idSerie);
        var auteur = auteurs.get(album.idAuteur);

        txtSerie.value = serie.nom;
        txtNumero.value = album.numero;
        txtTitre.value = album.titre;
        txtAuteur.value = auteur.nom;
        txtPrix.value = album.prix;

        var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

        // Utilisation d'une expression régulière pour supprimer 
        // les caractères non autorisés dans les noms de fichiers : '!?.":$
        nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");

        afficheAlbums(
            $("#albumMini"),
            $("#album"),
            srcAlbumMini + nomFic + ".jpg",
            srcAlbum + nomFic + ".jpg"
        );
    }
}

//Tri par auteur: 
function getValueAuteur() {
    // Sélectionner l'élément input et récupérer sa valeur
    var input = document.getElementById("in").value.toLowerCase();

    // Dans un premier temps on va aller recupérer l'id de l'auteur selon la saisie utilisateur (qui sera un input)

    var idAuteurToSave = 0;
    for (var [idAuteur, auteur] of auteurs.entries()) {
        if (auteur.nom.toLowerCase() == input) { //remplacer le nom de l'auteur ici par le choix de l'utilisateur
            //on est sur le bon: on sauvegarde l'id, puis on sort de la boucle
            console.log("ça marche " + idAuteur)
            idAuteurToSave = parseInt(idAuteur);
            break;
        }
    }
    // on a notre idAuteur, on fait notre petit filtre
    if (idAuteurToSave > 0) {
        preview.innerHTML = "";
        for (var [idAlbum, album] of albums.entries()) {
            if (album.idAuteur == idAuteurToSave) {
                serie = series.get(album.idSerie);
                auteur = auteurs.get(album.idAuteur);

                // on affiche les cards de la recherche auteur
                var card = document.createElement("card");
                card.setAttribute("id", "card" + idAlbum.toString());
                var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

                var button = document.createElement("button");

                button.innerHTML = '<btn id="btn' + idAlbum.toString()
                    + '" class="add-to-cart" onclick="addToPanier(' + idAlbum.toString() + ')">Ajouter au panier</btn>';


                // Utilisation d'une expression régulière pour supprimer 
                // les caractères non autorisés dans les noms de fichiers : '!?.":$
                nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");

                card.innerHTML =
                    '<section class="titre"><h2><strong>' + album.titre + '</strong></h2>' +
                    '<span>' + " Série:" + serie.nom + '</span>' +
                    '<span>' + " N°" + album.numero + '</span>' +
                    '<h5>' + auteur.nom + '</h5>' +
                    '<p>' + album.prix + "€" + '</p></section>' +
                    '<img src="' + srcAlbumMini + nomFic + '.jpg"></img>'

                card.appendChild(button);
                preview.appendChild(card);
                console.log(album.titre + " N°" + album.numero + " Série:" + serie.nom + " Auteur:" + auteur.nom);
            }
        }
    }
}

//Ajout au panier
function addToPanier(idAlbumToAdd) {
    console.log(idAlbumToAdd);
    console.log('card' + idAlbumToAdd);
    var albumToAdd;
    for (var [idAlbum, album] of albums.entries()) {
        if (idAlbum == parseInt(idAlbumToAdd)) {
            albumToAdd = album;
            break;
        }
    }

    var panier = document.getElementsByClassName("table")[0]

    var ligne = document.createElement("div")
    var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

    ligne.innerHTML =
        albumToAdd.titre +
        // '<img src="' + srcAlbumMini + nomFic + '.jpg"></img>' +
        '<p>' + " Prix : " + album.prix + '</p>'
    panier.appendChild(ligne);


    // var txt3 = document.createElement("hr");
    // var txt4 = document.createElement("hr");
    // $('.col1-name').append(album.titre,txt3);
    // $('.col2-price').append(album.prix,txt4);

}

/*......cacher "le panier vide"
------------------------------------
const unArticleDansLePanier = function () {
     if (table.length >= 1)
         document.getElementsByClassName('empty').classlist.add('hidden');
     }
 $(document).on('click', 'btn' + idAlbum.toString()
     + '', function (e) {
         e.preventDefault();
         $('.empty').hide();*/


 /*........Le total
 ----------------------
 let subtotal = 0;
const calculateTax = subtotal => {
  const tax = subtotal * 0.13;
  const formattedTax = tax.toFixed(2);
  return formattedTax;
};
const calculateTotal = subtotal => {
  const tax = calculateTax(subtotal);
  const total = parseFloat(subtotal) + parseFloat(tax);
  const formattedTotal = total.toFixed(2);
  return formattedTotal;
};

-----ou-----
function updateCartTotal(){
    //init
    var total = 0;
    var price = 0;
    var items = 0;
    var productname = "";
    var carttable = "";
    if(sessionStorage.getItem('cart')) {
        //get cart data & parse to array
        var cart = JSON.parse(sessionStorage.getItem('cart'));
        //get no of items in cart 
        items = cart.length;
        //loop over cart array
        for (var i = 0; i < items; i++){
            //convert each JSON product in array back into object
            var x = JSON.parse(cart[i]);
            //get property value of price
            price = parseFloat(x.price.split('$')[1]);
            productname = x.productname;
            //add price to total
            carttable += "<tr><td>" + productname + "</td><td>$" + price.toFixed(2) + "</td></tr>";
            total += price;
        } 
    }
    //update total on website HTML
    document.getElementById("total").innerHTML = total.toFixed(2);
    //insert saved products to cart table
    document.getElementById("carttable").innerHTML = carttable;
    //update items in cart on website HTML
    document.getElementById("itemsquantity").innerHTML = items;
}
*/

//Tri par série
function getValueSerie() {
    // Sélectionner l'élément input et récupérer sa valeur
    input = document.getElementById("in").value.toLowerCase();
    console.log("Liste des albums par série");

    // Dans un premier temps on va aller recupérer l'id de la série selon la saisie utilisateur (qui sera un input)
    // Recherche des albums de la série
    var idSerieToSave = 0;
    for (var [idSerie, serie] of series.entries()) {
        if (serie.nom.toLowerCase() == input) {
            serie = series.get(series.nom);
            //on est sur le bon: on sauvegarde l'id, puis on sort de la boucle
            console.log("ça marche " + idSerie)
            idSerieToSave = parseInt(idSerie);
            preview.innerHTML = "";
            break;
        }
    }

    // on a notre idSerie, on fait notre petit filtre
    if (idSerieToSave > 0) {

        for (var [idAlbum, album] of albums.entries()) {
            if (album.idSerie == idSerieToSave) {
                serie = series.get(album.idSerie);
                auteur = auteurs.get(album.idAuteur);

                // on affiche les cards de la recherche série
                var card = document.createElement("card");
                card.setAttribute("id", "card" + idAlbum.toString());
                var nomFic = serie.nom + "-" + album.numero + "-" + album.titre;

                var button = document.createElement("button");
                button.innerHTML = '<btn id="btn' + idAlbum.toString()
                    + '" class="add-to-cart" onclick="addToPanier(' + idAlbum.toString() + ')">Ajouter au panier</btn>';

                // Utilisation d'une expression régulière pour supprimer 
                // les caractères non autorisés dans les noms de fichiers : '!?.":$
                nomFic = nomFic.replace(/'|!|\?|\.|"|:|\$/g, "");

                card.innerHTML =
                    '<section class="titre"><h2><strong>' + album.titre + '</strong></h2>' +
                    '<span>' + " Série:" + serie.nom + '</span>' +
                    '<span>' + " N°" + album.numero + '</span>' +
                    '<h5>' + auteur.nom + '</h5>' +
                    '<p>' + album.prix + "€" + '</p></section>' +
                    '<img src="' + srcAlbumMini + nomFic + '.jpg"></img>'

                card.appendChild(button);
                preview.appendChild(card);
                console.log(album.titre + " N°" + album.numero + " Série:" + serie.nom + " Auteur:" + auteur.nom);
            }
        }
    }
}


//Api météo
// let lon;
// let lat;
// let temperature = document.querySelector(".temp");
// let summary = document.querySelector(".summary");
// let loc = document.querySelector(".location");
// let icon = document.querySelector(".icon");
// const kelvin = 273;
  
// window.addEventListener("load", () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       console.log(position);
//       lon = position.coords.longitude;
//       lat = position.coords.latitude;
  
//       // API ID
//       const api = "bacd34aeef6ebeeeb8ea81b02b577288";
  
//       // API URL
//       const base =
//       https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={bacd34aeef6ebeeeb8ea81b02b577288}
  
//       // Calling the API
//       fetch(base)
//         .then((response) => {
//           return response.json();
//         })
//         .then((data) => {
//           console.log(data);
//           temperature.textContent = 
//               Math.floor(data.main.temp - kelvin) + "°C";
//           summary.textContent = data.weather[0].description;
//           loc.textContent = data.name + "," + data.sys.country;
//           let icon1 = data.weather[0].icon;
//           icon.innerHTML = 
//               `<img src="icons/${icon1}.svg" style= 'height:10rem'/>`;
//         });
//     });
//   }
// });