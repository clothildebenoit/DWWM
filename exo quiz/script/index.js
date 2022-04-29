function ChargeInfosJson() {
    /* Allons chercher un fichier JSON */
    fetch('format_quiz.json')
        .then(response => { /* Une fois que le fichier est chargé */
            return response.json();  /* Convertissons le en json */
        })
        .then(data => { /*Une fois le fichier converti*/
            console.log(data); /*Appelons notre fonction */
            CreateDivs(data);
        }
        );
}
