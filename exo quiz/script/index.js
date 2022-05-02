let quiz = new Array();

function ChargeInfosJson() {
    
    fetch('format_quiz.json')
        .then(response => { 
            return response.json();
        })
        .then(data => {
            console.log(data);
            CreatDivs(data);
        }
        );
}


//fonction qui affichent les questions
function CreatDivs(data) {
    let prev=document.getElementsByClassName("preview")[0];
    for (let i = 0; i < data.length; i++) {
            let quiz = document.createElement("div");
            quiz.setAttribute("class","card");
            
            quiz.innerHTML =
            '<h1 class="question">' + data[i].question + '</h1>'
            + '<li class="choix">' + data[i].choices + '</li>'
            prev.appendChild(quiz);
        }
    }


    // pour le click du choix
// evaluate[0].addEventListener("click", () => {
//     if (selected == "true") {
//         result[0].innerHTML = "True";
//         result[0].style.color = "green";
//     } else {
//         result[0].innerHTML = "False";
//         result[0].style.color = "red";
//     }
// })
// }

// if (start) {
// iterate("0");
// }

// aide Guillaume : 
//Affichage de la question et des réponse (manipulation du DOM)
// function showQuestion(data) {
//     dataElement.innerText = data.question;
//     data.choices.forEach((answer) => {

//         //on créé un bouton pour chaque réponse
//         const button = document.createElement('button');
//         button.innerText = answer;
//         button.classList.add('btn');

//         //pour la réponse correct , on rajoute un petit élement sur le bouton
//         if (answer === question.correct) {
//             ;
//             button.dataset.correct = question.correct;
//         }
//     }

//         //sur chaque bouton, on rajoute un evenement on click qui appelera la fonction selectAnswer
//         button.addEventListener('click', LafonctionAAppelerLorsduClick);

//         answerButtonsElement.appendChild(button);
//     })
//     //on cache la div explication
//     explainElement.classList.add('hide');
//     // on remplit cette div explication avec l'explication de la réponse de l'élement en cours du json
//     explainElement.innerText = question.explanation;
// }