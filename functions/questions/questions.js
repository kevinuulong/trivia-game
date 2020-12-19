const path = require('path');
const questions = require(path.resolve('./functions/questions.json'))

const handler = async (event) => {
	try {
		const payload = event.body != undefined ? JSON.parse(event.body) : { "number": 1 };
		const number = payload.number;
		var questionsList = [];
		var response = [];
		if (questionsList.length == 0) questionsList = [...questions];
		for (i = 0; i < (number > questionsList.length ? questionsList.length : number); i++) {
			var random = Math.floor(Math.random() * questionsList.length);
			var question = questionsList.splice(random, 1);
			var answers = [...question[0].incorrect_answers, question[0].correct_answer];
			response.push({
				"id": random,
				"difficulty": question[0].difficulty,
				"question": question[0].question,
				"answers": shuffle(answers)
			})
		}
		return {
			statusCode: 200,
			body: JSON.stringify(response)
		}
	} catch (error) {
		return { statusCode: 500, body: error.toString() }
	}
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

module.exports = { handler }