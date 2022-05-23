function ChargeInfosJson() {
    /* Allons chercher un fichier JSON */
    fetch('text.json')
        .then(response => { /* Une fois que le fichier est chargé */
            return response.json();  /* Convertissons le en json */
        })
        .then(data => { /*Une fois le fichier converti*/
            console.log(data); /*Appelons notre fonction */
            CreateDivs(data);
        }
        );

}
function CreateDivs(data) {
    const preview = document.getElementsByClassName("preview")[0];
    preview.innerHTML = "";

    const pizzeriaName = document.createElement("div");
    pizzeriaName.innerHTML = data.nom;

    const pizzeriaSlogan = document.createElement("div");
    pizzeriaSlogan.innerHTML = data.Slogan;

    preview.appendChild(pizzeriaName);
    preview.appendChild(pizzeriaSlogan);

    const pizzeriaListPizzas = document.createElement("div");
    pizzeriaListPizzas.setAttribute("class", "contenu");
    pizzeriaListPizzas.setAttribute("id", "PizzaList");

    let listPizzas = data.pizzas;
    for (let x = 0; x < listPizzas.length; x++) {
        let pizzaListeElement = document.createElement("div");
        pizzaListeElement.setAttribute("class", "card");
        pizzaListeElement.innerHTML =
            '<h1 class="pizzanom">' + listPizzas[x].nomPizza + '</h1>'
            + '<h2 class="pizzaprix">' + listPizzas[x].prix + '</h2>' +
            '<img class= "pizzaimage" src="' + listPizzas[x].image + '" />';
        
            pizzeriaListPizzas.appendChild(pizzaListeElement);

            // .....liste garniture
        let listgarniture = listPizzas[x].garniture;
        for (let y = 0; y < listgarniture.length; y++) {
            let garnitureListElement = document.createElement("ul");
            garnitureListElement.setAttribute("class", "ingredients");
            garnitureListElement.innerHTML =
                '<li class="ingredients">' + listPizzas[x].garniture[y] + '</li>';

            preview.appendChild(pizzeriaListPizzas);
            
            pizzaListeElement.appendChild(garnitureListeElement);
        }
    }

    
  

    // for (var x = 0; x < data.pizzas.length; x++) {
    // }
}

