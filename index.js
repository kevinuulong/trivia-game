const fs = require('fs');
const { fork } = require('child_process');

// Check to see if 'questions.json' exists, if not it runs the generator
if (!(fs.existsSync("functions/questions/questions.json") && fs.existsSync("functions/answers/questions.json"))) {
    fork('utils/generator.js');
}
