var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
var booksList = new Array()
var authorsList = new Array();
var categoriesList = new Array();

/*On cree une fonction pour l'évenemet onload*/
function jsonOnLoad() {

  /* Allons chercher un fichier JSON */
  fetch("books.JSON")
    .then(response => { /* Une fois que le fichier est chargé */
      return response.json();  /* Convertissons le en json */
    })
    .then(data => { /* Une fois le fichier converti */
      createList(data); /* Appelons notre fonction */
    });
}
//fonction qui créé les listes déroulantes
var createList = function (data) {

  //on boucle sur l'ensemble des livres
  for (var x = 0; x < data.length; x++) {

    var book = data[x];
    booksList.push(book);

    //on boucle sur les auteurs d'un livre
    for (var y = 0; y < book.authors.length; y++) {
      let author = book.authors[y];

      //On vérifie si l'auteur en question n'est pas déjà dans la liste
      if (authorsList.indexOf(author) == -1) {
        authorsList.push(author);
      }
    }

    //on boucle sur les catégories d'un livre
    for (var y = 0; y < book.categories.length; y++) {
      let category = book.categories[y];
      //On vérifie si la catégorie en question n'est pas déjà dans la liste
      if (categoriesList.indexOf(category) == -1) {
        categoriesList.push(category);
      }
    }
  }

  //tri alphabétique des listes
  booksList.sort();
  authorsList.sort();
  categoriesList.sort();

  for (var x = 0; x < authorsList.length; x++) {
    var option = document.createElement("option");
    option.value = authorsList[x];
    option.innerText = authorsList[x];
    document.getElementById("listAuthors").appendChild(option);
  }
  for (var x = 0; x < categoriesList.length; x++) {
    var option = document.createElement("option");
    option.value = categoriesList[x];
    option.innerText = categoriesList[x];
    document.getElementById("listCategories").appendChild(option);
  }
  showBooks(booksList); /* Appelons notre fonction */


}

//fonction qui charge les livres dans le html dans des card
var showBooks = function (List) {
  document.getElementById("booksList").innerHTML = "";
  for (var y = 0; y < List.length; y++) {
    var bookListe = document.createElement("div");
    bookListe.setAttribute("class", "card");
    if ((List[y].thumbnailUrl == undefined) || (List[y].thumbnailUrl == null)) {
      List[y].thumbnailUrl = "https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png";
    }

    var titre;
    if (List[y].title.length > 20) {
      titre = List[y].title.substring(0, 20) + ' (...)'
    }
    else {
      titre = List[y].title;
    }

    var description;
    var descriptionshort;

    if ((List[y].shortDescription == undefined) || (List[y].shortDescription == null)) {
      description = 'Pas de description';
      descriptionshort='Pas de description';
    }
    else {
      if (List[y].shortDescription.length > 20) {
        description = List[y].shortDescription.substring(0, 20) + ' (...)';
        descriptionshort=List[y].shortDescription;
      }
      else {
        description = List[y].shortDescription;
        descriptionshort=List[y].shortDescription;
      }
    }

    var datePubli;

    try {
      datePubli=new Date(List[y].publishedDate.dt_txt).toLocaleDateString("fr-FR", options);
    } catch (error) {
      datePubli="Pas de date de publication";
    }


    bookListe.innerHTML = '<img src="' + List[y].thumbnailUrl + '"/>'
      + '<h1 class="booktitle"> <span class="infobulle" title="' + List[y].title + '">' + titre + '</span></h1>'
      + '<h2 class="category">' + List[y].categories + '</h2> '
      + '<h4 class="category">' + datePubli + '</h4> '
      + '<h4 class="category"> <span class="infobulle" title="' + List[y].shortDescription + '">' + description + '</span></h4> '
      ;

    document.getElementById("booksList").appendChild(bookListe);
  }
}

//fonction qui renvoie les livres selon la sélection de l'auteur
var ChargeByAuthor = function () {
  var e = document.getElementById("listAuthors");
  //on récupère le choix de l'auteur
  var strAuthors = e.options[e.selectedIndex].text;
  var authorsBookList = new Array();
  if (strAuthors == "") {
    //si pas de choix
    showBooks(booksList);
  } else {
    
    //sinon on va boucler sur l'ensemble des livres contenu dans la liste booksList et vérifier les auteurs
    //pour créer une nouvelle liste authorsBookList 
    for (var x = 0; x < booksList.length; x++) {
      let bookByAuthor = booksList[x];
      console.log(x.toString() + " - Auteur à chercher:" +strAuthors);


      if (bookByAuthor.authors.indexOf(strAuthors) != -1) {
        console.log("OK");
        authorsBookList.push(bookByAuthor);
      }

      // for (var y = 0; y < bookByAuthor.authors.length; y++) {
      //   let author = bookByAuthor.authors[y];
      //   console.log(x.toString() + " - Auteurs du livre:" + author);
      //   if (strAuthors == author ) {
      //     authorsBookList.push(bookByAuthor);
      //   }
      // }
    }

    authorsBookList.sort();
    //on pousse cette nouvelle liste authorsBookList à la méthode qui va nous créé notre contenu
    showBooks(authorsBookList);
  }
}

//fonction qui renvoie les livres selon la catégorie
var ChargeByCategory = function () {
  var e = document.getElementById("listCategories");
  //on récupère le choix de la catégorie
  var strCategory = e.options[e.selectedIndex].text;
  var categoryBookList = new Array();
  if (strCategory == "") {
    //si pas de choix
    showBooks(booksList);
  }
  else {
     //sinon on va boucler sur l'ensemble des livres contenu dans la liste booksList et vérifier les catégories
    //pour créer une nouvelle liste categoryBookList 
    for (var x = 0; x < booksList.length; x++) {
      let bookByCategory = booksList[x];


      if (bookByCategory.categories.indexOf(strCategory) != -1) {
        console.log("OK");
        categoryBookList.push(bookByCategory);
      }

      // for (var y = 0; y < bookByCategory.categories.length; y++) {
      //   let category = bookByCategory.categories[y];
      //   if (category == strCategory) {
      //     categoryBookList.push(bookByCategory);
      //   }
      // }
    }
    categoryBookList.sort();
    //on pousse cette nouvelle liste categoryBookList à la méthode qui va nous créé notre contenu
    showBooks(categoryBookList);
  }

}
