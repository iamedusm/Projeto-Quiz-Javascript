let currentQuestion = 0, correctAnswers = 0, clicked = 0

showQuestion()

function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion]

        let percent = Math.floor((currentQuestion / questions.length) * 100)

        document.querySelector('.progress--bar').style.width = `${percent}%`

        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = q.question
        document.querySelector('.options').innerHTML = ''

        let optionsHtml = ''
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`
        }

        document.querySelector('.options').innerHTML = optionsHtml

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent)
        })
    } else {
        finishQuiz()
    }
}

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'))

    if (clicked == 0) {
        if (questions[currentQuestion].answer === clickedOption) {
            correctAnswers++
            e.target.style.backgroundColor = 'green'
        } else {
            e.target.style.backgroundColor = 'red'
        }
        clicked++
    }

}

function finishQuiz() {
    let points = Math.floor((correctAnswers / questions.length) * 100)

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Precisa estudar mais'
        document.querySelector('.scorePct').style.color = '#FF0000'
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito Bom'
        document.querySelector('.scorePct').style.color = '#FFFF00'
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabens'
        document.querySelector('.scorePct').style.color = 'green'
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questóes e acertou ${correctAnswers}`

    document.querySelector('.scoreArea').style.display = 'block'
    document.querySelector('.questionArea').style.display = 'none'
    document.querySelector('.progress--bar').style.width = `100%`
}

function reset() {
    currentQuestion = 0
    clicked = 0
    showQuestion()
}

function next() {
    currentQuestion++
    clicked = 0
    showQuestion()
}