var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

fetch("https://breakingbadapi.com/api/characters", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result);
        createList(result);
    })
    .catch(error => console.log('error', error));



// liste perso
var createList = function (data) {
    var perso = document.getElementById("preview");

    for (i = 0; i < data.length; i++) {
        var element = document.createElement('card');
        element.setAttribute('class', 'carte')
        console.log(data[i]);
        var element2 = document.createElement('div');
        element2.setAttribute('class', 'back')
        element2.innerHTML = data[i].name;
        var element3 = document.createElement('img');
        element3.setAttribute('class', 'front')

        element3.src = data[i].img;


        element.appendChild(element2);
        element.appendChild(element3);
        perso.appendChild(element);
    }
}

// function flip(event){
//     let retourner = event.currentTarget;
//     if (retourner.className === "carte"){
//         if(retourner.style.transform == "rotateY(180deg)"){
//             retourner.style.transform = "rotateY(0deg)";
//         }
//         else{
//             retourner.style.transform = "rotateY(180deg)";
//         }
//     }
// }



// ..........hide click en Jquery
// $(document).ready(function(){

//     let getSpoilers = $('.spoiler');

//     getSpoilers.hide();
//     getSpoilers.after('<button>Spoiler</button>');
//     getSpoilers.next().click(function(){
//         $(this).prev().fadeIn();
//         $(this).hide();
//     });

// });

// $('.carte').click(function(){
//     $(this).toggleClass('flipped');
//   });

// const flips = document.getElementsByClassName("carte");


// for (i = 0; i < flips.length; i++) {
//     flips[i].addEventListener("click", flipcard);
    
// }
// function flipcard() {
//         flips[i].classList.toggle("flipcard");
//     }