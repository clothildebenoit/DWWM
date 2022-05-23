fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka')
.then(  response => { /* Une fois que le fichier est chargé */
  return  response.json();  /* Convertissons le en json */
})
.then(data => { /* Une fois le fichier converti */
  console.log(data); /* Appelons notre fonction */
});



// /* Allons chercher un fichier JSON */
// fetch('data.json')
// .then(  response => { /* Une fois que le fichier est chargé */
//   return  response.json();  /* Convertissons le en json */
// })
// .then(data => { /* Une fois le fichier converti */
//   createActor(data); /* Appelons notre fonction */
// });




const createActor = function(data) {
  /* Références dans le document HTML */
  const actorName = document.querySelector('.actor-name');
  const actorPicture = document.querySelector('.actor-picture');
  const actorMovies = document.querySelector('.actor-movies');
  
  /* Populons le HTML avec le contenu du JSON */
  actorName.innerHTML = data.firstname + ' ' + data.lastname;
  actorPicture.src = data.picture;
  
  let moviesList = '';
  for(var x=0; x<data.movies.length; x++) {
    let movie = data.movies[x];
    moviesList += '<li>' + movie.name + ' | ' + movie.year + '</li>';
  }
  
  actorMovies.innerHTML = moviesList;
}