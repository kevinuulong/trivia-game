const fetch = require('node-fetch');
const fs = require('fs');

fetch('https://opentdb.com/api.php?amount=50&category=18&type=multiple')
    .then(res => res.json())
    .then(data => fs.writeFile("./questions/questions.json", JSON.stringify(data.results), err => {
        if (err) return console.error(err);
    }));
