const path = require('path');
const questions = require(path.resolve('./questions/questions.json'))

const handler = async (event) => {
	try {
		const payload = JSON.parse(event.body);
		const answers = [].concat(payload);
		var response = [];
		answers.forEach(answer => {
			response.push({
				"id": answer.id,
				"correct": questions[answer.id].correct_answer == answer.answer
			})
		});
		return {
			statusCode: 200,
			body: JSON.stringify(response)
		}
	} catch (error) {
		return { statusCode: 500, body: error.toString() }
	}
}

module.exports = { handler }
