const questions = [
    { letter: "A", answer: "Abril", question: "Con la A. Cuarto mes del año." },
    { letter: "B", answer: "Bicicleta", question: "Con la B. Vehículo de dos ruedas." },
    { letter: "C", answer: "Cielo", question: "Con la C. Lo que está sobre nuestras cabezas." },
    { letter: "D", answer: "Dado", question: "Con la D. Objeto con el que se juega a los juegos de azar." },
    { letter: "E", answer: "Elefante", question: "Con la E. Animal terrestre de mayor tamaño." },
    { letter: "F", answer: "Fresa", question: "Con la F. Fruta pequeña y roja." },
    { letter: "G", answer: "Gato", question: "Con la G. Animal doméstico de compañía." },
    { letter: "H", answer: "Hielo", question: "Con la H. Agua congelada." },
    { letter: "I", answer: "Iglesia", question: "Con la I. Lugar de culto religioso." },
    { letter: "J", answer: "Jirafa", question: "Con la J. Animal con el cuello largo." },
    { letter: "K", answer: "Karate", question: "Con la K. Arte marcial originaria de Japón." },
    { letter: "L", answer: "Lámpara", question: "Con la L. Objeto que produce luz artificial." },
    { letter: "M", answer: "Marte", question: "Con la M. Cuarto planeta del sistema solar." },
    { letter: "N", answer: "Nido", question: "Con la N. Lugar donde las aves ponen sus huevos." },
    { letter: "Ñ", answer: "Ñu", question: "Con la Ñ. Animal mamífero africano." },
    { letter: "O", answer: "Ojo", question: "Con la O. Órgano de la vista." },
    { letter: "P", answer: "Perro", question: "Con la P. Animal doméstico leal." },
    { letter: "Q", answer: "Química", question: "Con la Q. Ciencia que estudia la composición de la materia." },
    { letter: "R", answer: "Ratón", question: "Con la R. Pequeño roedor." },
    { letter: "S", answer: "Sol", question: "Con la S. Estrella que ilumina la Tierra." },
    { letter: "T", answer: "Tigre", question: "Con la T. Animal felino de rayas." },
    { letter: "U", answer: "Uva", question: "Con la U. Fruta que se utiliza para hacer vino." },
    { letter: "V", answer: "Vaca", question: "Con la V. Animal doméstico que produce leche." },
    { letter: "W", answer: "Whisky", question: "Con la W. Bebida alcohólica destilada." },
    { letter: "X", answer: "Xilófono", question: "Con la X. Instrumento musical de percusión." },
    { letter: "Y", answer: "Yate", question: "Con la Y. Embarcación de lujo." },
    { letter: "Z", answer: "Zorro", question: "Con la Z. Animal mamífero de hábitos nocturnos." }
];

let currentQuestion = 0;
let correctAnswers = 0;
const totalQuestions = questions.length;
let timeLeft = 180; // 3 minutos

function displayQuestion() {
    if (currentQuestion < totalQuestions) {
        document.getElementById("question").textContent = questions[currentQuestion].question;
    } else {
        finishGame();
    }
}

function updateScore() {
    document.getElementById("answeredCount").textContent = currentQuestion;
    document.getElementById("totalCount").textContent = totalQuestions;
}

function checkAnswer() {
    const userAnswer = document.getElementById("answerInput").value.trim().toLowerCase();
    const correctAnswer = questions[currentQuestion].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        document.getElementById("result").textContent = "¡Correcto!";
        correctAnswers++;
    } else {
        document.getElementById("result").textContent = "Incorrecto. La respuesta correcta era: " + correctAnswer;
    }

    currentQuestion++;
    updateScore();
    document.getElementById("answerInput").value = "";
    displayQuestion();
}

function pasapalabra() {
    currentQuestion++;
    document.getElementById("result").textContent = "";
    updateScore();
    displayQuestion();
}

function finishGame() {
    clearInterval(timerInterval);
    alert(`Fin del juego. Has respondido correctamente ${correctAnswers} preguntas.`);
    currentQuestion = 0;
    correctAnswers = 0;
    timeLeft = 180; // Reiniciar el tiempo
    updateScore();
    document.querySelector('.circle').style.strokeDasharray = `0, 100`;
    displayQuestion();
}

function updateTimer() {
    const timerText = document.querySelector('.timer-text');
    const circle = document.querySelector('.circle');
    const initialOffset = 112; // Circunferencia del círculo (2 * π * radio)

    let interval = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        let formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        timerText.textContent = formattedTime;
        let percentage = ((180 - timeLeft) / 180) * 100;
        circle.style.strokeDasharray = `${percentage}, 100`;

        if (timeLeft <= 0) {
            clearInterval(interval);
            finishGame();
        }
    }, 1000);

    return interval;
}

let timerInterval = updateTimer();
updateScore();
displayQuestion();
