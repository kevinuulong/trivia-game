var currentQuestionNumber = 0;
const totalQuestions = document.getElementById("question-number").dataset.totalQuestions;
var answered = false;

function updateQuestion(question) {
    document.getElementById("question").innerHTML = question;
}

function updateAnswers(answers) {
    var answersElement = document.getElementById("answers");
    answersElement.innerHTML = "";
    for (let i = 0; i < answers.length; i++) {
        answersElement.innerHTML +=
            `<div class="answer">
                <p class="identifier">${i + 1}</p>
                <p class="answer-text">${answers[i]}</p>
            </div>`;
    }
}

function updateId(id) {
    document.getElementById("question").dataset.questionId = id;
}

function updateQuestionNumber() {
    currentQuestionNumber++;
    if (totalQuestions >= currentQuestionNumber) {
        document.getElementById("question-number").innerHTML = `${currentQuestionNumber}/${totalQuestions}`;
    }
}

startTimer(15, updateQuestionNumber);

function startTimer(duration, callbackFunction) {
    document.getElementById("time").innerHTML = `${duration} sec.`;
    const timer = setInterval(() => {
        if (!answered) {
            duration--;
            document.getElementById("time").innerHTML = `${duration} sec.`;
        }
        if (duration <= 0 || answered) {
            callbackFunction();
            clearInterval(timer);
        }
    }, 1000);
}

function registerClickListeners() {
    document.querySelectorAll('.answer').forEach(el => {
        el.addEventListener('click', () => {
            console.log(el);
            validate(el.querySelector('.answer-text').innerHTML, el);
        })
    })
}

function deregisterClickListeners() {
    document.querySelectorAll('.answer').forEach(el => {
        el.parentNode.replaceChild(el.cloneNode(true), el);
    })
}

registerClickListeners();

function validate(answer, el) {
    answered = true;
    if (answer == answer) {
        el.classList.toggle('correct')
    } else {
        el.classList.toggle('incorrect')
    }
    deregisterClickListeners();
}