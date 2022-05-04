let quiz = new Array();

function ChargeInfosJson() {

    fetch('format_quiz.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            start(data);
        }
        );
}


// //fonction qui affichent les questions
// function CreatDivs(data) {
//     let prev=document.getElementsByClassName("preview")[0];
//     for (let i = 0; i < data.length; i++) {
//             let quiz = document.createElement("div");
//             quiz.setAttribute("class","card");

//             quiz.innerHTML =
//             '<h1 class="question">' + data[i].question + '</h1>'
//             + '<li class="choix">' + data[i].choices + '</li>'
//             prev.appendChild(quiz);
//         }
//     }


// fichier commun
function CreateDivs(data) {
    const question = document.getElementById("questionContainer");

    for (let x = 0; x < data.length; x++) {

        let questionListe = document.createElement("div");
        let questionTitre = document.createElement("h1");

        questionTitre.setAttribute("class", "titrequestion");
        questionListe.setAttribute("id", "question" + x);

        questionTitre.innerHTML += "<strong>Question : </strong>" + data[x].question;

        questionListe.appendChild(questionTitre);

        let repList = document.createElement("div");
        repList.setAttribute("id", "reponseExplication" + x);
        for (let y = 0; y < data[x].choices.length; y++) {
            let propsListe = document.createElement("h2");

            propsListe.setAttribute("id", "titreprops" + x + "" + y);
            // propsListe.setAttribute("onclick", "resultat" + y + "()");
            propsListe.innerHTML += data[x].choices[y];
            questionListe.appendChild(propsListe);
        }

        repList.innerHTML = `<h3><strong>Réponse :</strong>  ${data[x].correct}</h3><p>${data[x].explanation}</p>`;

        questionListe.appendChild(repList);
        question.appendChild(questionListe);
    }
}

var start = function (data) {
    CreateDivs(data);

    var round = 0

    for (x = 0; x < data.length; x++) {
        document.getElementById("question" + x).style.display = "none";
    }

    document.getElementById("question" + round).style.display = "grid";
    document.getElementById("reponseExplication" + round).style.display = "none";

    // document.getElementById("question" + round).style.gridTemplateColumns = "50% 50%";

    document.getElementById("bouton").style.display = "none";
    document.getElementById("titreprops" + round + "0").addEventListener("click", resultat0);


    function resultat0() {
        var stock = document.getElementById("titreprops" + round + "0");
        if (stock.innerHTML == data[round].correct) {
            console.log("yes")
            document.getElementById("reponseExplication" + round).style.display = "block";
            document.getElementById("bouton").style.display = "block";
        }
    }
// Next button
    document.getElementById("bouton").addEventListener("click", function(){
       round = [round+1];
    start(round);
    });



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