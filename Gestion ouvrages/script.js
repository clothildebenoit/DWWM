let booksList = new Array()
let authorsList = new Array();
let categoriesList = new Array();
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function ChargeInfosJson() {
    /* Allons chercher un fichier JSON */
    fetch('books.json')
        .then(response => { /* Une fois que le fichier est chargé */
            return response.json();  /* Convertissons le en json */
        })
        .then(data => { /*Une fois le fichier converti*/
            console.log(data); /*Appelons notre fonction */
            CreateDivs(data);
        }
        );
}

function ChargeByAuthor() {
    
}


function CreateDivs(data) {

    const preview = document.getElementsByClassName("preview")[0];

    for (let x = 0; x < data.length; x++) {
        let listBook = document.createElement("div");
        listBook.setAttribute("class", "card");
        listBook.setAttribute("id", "livre")

        var image;
        if ((data[x].thumbnailUrl == null) || (data[x].thumbnailUrl == undefined)) {
            image = 'https://p1.storage.canalblog.com/14/48/1145642/91330992_o.png';
        }
        else {
            image = data[x].thumbnailUrl;
        }

        let shortDescription;
        if ((data[x].shortDescription== null) || (data[x].shortDescription == undefined)) {
            shortDescription = "";
        }
        else{
            shortDescription=data[x].shortDescription;
        }
        // let longDescription;
        // if ((data[x].longDescription== null) || (data[x].longDescription == undefined)) {
        //     longDescription = "";
        // }
        // else{
        //     longDescription=data[x].longDescription;
        // }



        listBook.innerHTML =
            '<img classe="image" src="' + image + '"/>'
            + '<h1 class="titre">' + data[x].title + '</h1>'
            + '<h2 class="isbn">' + "isbn: " + data[x].isbn + '</h2>'
            + '<h3 class="date">' + "date de parution: " + new Date(data[x].publishedDate.dt_txt).toLocaleDateString("fr-FR", options) + '</h3>'
            + '<p class=shortDescription>' +shortDescription + '</p>'
            // + '<p class=longDescription>' + longDescription + '</p>'
            // + '<h4 class="status">' + data[x].status + '</h4>'
            // + '<h5 class="auteur">' + data[x].authors + '</h5>'
            // + '<h6 class="categories">' + data[x].categories + '</h6>';
        preview.appendChild(listBook);
    }

}


