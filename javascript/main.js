

let form = document.querySelector(".form");
let sentenceContainer = document.querySelector(".sentence-container");
let result = document.querySelector(".result");
let button = document.querySelector(".button");
let gameResult = document.querySelector(".game-result");
let buttons = document.querySelector(".buttons");

const URL = ("https://api.funtranslations.com/translate/pig-latin.json?text=");

const sentences = [
    {
        text: "haz click en start para comenzar a jugar"
    },
    {
        translated: "Mi%20tia%20fue%20al%20supermercado%20en%20el%20auto",
        text: "mi tia fue al supermercado en el auto",
        image: "images/supermarket.jpg"
    },
    {
        translated: "Tengo%20tickets%20para%20el%20teatro%20si%20te%20parece%20vamos%20el%20viernes",
        text: "tengo tickets para el teatro si te parece vamos el viernes",
        image: "images/theatre.jpg"
    },
    {
        translated: "Hay%20muchos%20planetas%20en%20el%20mundo",
        text: "hay muchos planetas en el mundo",
        image: "images/global.jpg"
    },
    {
        translated: "El%20payaso%20ofrece%20un%20regalo%20muy%20divertido",
        text: "el payaso ofrece un regalo muy divertido",
        image: "images/clown.jpg"
    },
    {
        translated: "No%20funciona%20el%20teclado%20de%20mi%20computadora",
        text: "no funciona el teclado de mi computadora",
        image: "images/keyboard.jpg"
    }

];


const showDefaultText = () => {
    sentenceContainer.innerHTML = sentences[0].text;
    button.classList.add("off");
}


document.addEventListener('DOMContentLoaded', showDefaultText())

let startButton = document.querySelector(".startButton")
startButton.addEventListener('click', showSentence);

let time = document.querySelector(".time");

let startTime = () => {
    let i = 30;
    button.addEventListener("click", () => { clearInterval(interval) });
    let interval = setInterval(function () {
        time.innerHTML = i;

        if (i === 0) {
            verify();
            clearInterval(interval);
        }
        else {
            i--;
        }
    }, 1000)
}

let timeLeft = true;

function timeOff(interval) {
    clearInterval(interval);
    timeLeft = false;
    showResults(timeLeft);
}

let i = 1;
let sentence = [];

async function showSentence(event) {
    startTime();
    startButton.classList.add("off");
    button.classList.remove("off");

    if (event) {
        event.preventDefault();
    }
    form.style.setProperty("background-image", `url(./${sentences[i].image}`);
    try {
        console.log(i)
        let response = await fetch(`${URL}${sentences[i].translated}`);
        sentence = await response.json();
        console.log(sentence);
        sentenceContainer.innerHTML = `${sentence.contents.translated}`;

    }
    catch (error) {
        console.error("Error de API");

    }
}


const verify = (event) => {
    if (event) {
        event.preventDefault()
    }

    result.innerHTML = "";
    let rightAnswer = sentences[i].text.toString();
    showResults(rightAnswer)

}

button.addEventListener("click", verify)

let rightAnswers = 0;
let wrongAnswers = 0;
let totalAnswers = 0;

let answer = document.querySelector(".answer");

function showResults(rightAnswer, timeLeft) {


    if ((answer.value.trim() == rightAnswer) && (totalAnswers < 6)) {
        rightAnswers++;
        totalAnswers++;
        console.log(rightAnswers);
        result.innerHTML = `Respuesta correcta. ${rightAnswer} <button class=buttonNext>Siguiente</button>`;

    }
    else if (answer.value == "") {
        wrongAnswers++;
        totalAnswers++;
        result.innerHTML = `Respuesta incorrecta. La correcta es: ${rightAnswer} <br> Tu respuesta fue: no hubo respuesta <br> <button class=buttonNext>Siguiente</button>`;
    }
    else if ((answer.value.trim() !== rightAnswer) && (totalAnswers < 6) || timeLeft == false) {
        wrongAnswers++;
        totalAnswers++;
        console.log(wrongAnswers);

        result.innerHTML = `Respuesta incorrecta. La correcta es: ${rightAnswer} <br> Tu respuesta fue: ${answer.value} <br> <button class=buttonNext>Siguiente</button>`;
    }

    i++;

    button.classList.add("off");
    answer.classList.add("off");
    let buttonNext = document.querySelector(".buttonNext");
    buttonNext.addEventListener("click", nextRound);
    let game = `Respuestas correctas= ${rightAnswers}
    Respuestas incorrectas= ${wrongAnswers}`;
    answer.value = "";
    gameResult.innerHTML = ` ${game}`;

    if (totalAnswers == 5) {
        time.innerHTML = `<button class="buttonRestart">Restart</button>`;
        let restartButton = document.querySelector(".buttonRestart");
        restartButton.addEventListener("click", restartGame(buttonNext, restartButton));
        sentenceContainer.innerHTML = "GAME OVER";
        buttonNext.classList.add("hide");
    }

}



function restartGame(buttonNext, restartButton) {

    totalAnswers = 0;
    wrongAnswers = 0;
    rightAnswers = 0;
    buttonNext.classList.remove("hide");
    i = 1;
    result.innerHTML = "";
    startButton.classList.remove("off");
    restartButton.classList.add("hide");
    answer.classList.remove("off")
    gameResult.innerHTML = ""

}

const nextRound = () => {

    showSentence();
    button.classList.remove("off");
    answer.classList.remove("off");
    result.innerHTML = "";
}

