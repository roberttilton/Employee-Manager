const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    port: '3306',

    user: 'root',

    password: 'awesomexb0x',
    database: 'top_songsDB',
});

function runTracker() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'userChoice',
            message: 'What would you like to do?',
            choices: ["Add a department, role or employee",
             "View current listings",
             "Update an employee's role"
            ]
        }
    ]).then((answer) => {
        switch(answer.userChoice) {
            case "Add a department, role or employee":
                queryArtist();
                break;
            case "View current listings":
                queryMultiFilter();
                break;
            case "Update an employee's role":
                queryRange();
                break;
        }
       } 
    );
}

function queryArtist() {
    inquirer.prompt({
        type: 'input',
        name: 'artist',
        message: 'What artist would you like to search for?'
    })
    .then(function (answer) {
        const query = "SELECT artist, position, song, year FROM top5000 WHERE artist = ?";
        connection.query(query, answer.artist, (err, results) => {
            if (err) throw err;
            console.log(results);
            runTracker();
        });
    })
}

function queryMultiFilter() {
        const query = "SELECT artist, COUNT(*) FROM top5000 GROUP BY artist HAVING COUNT(*) > 10";
        connection.query(query, (err, results) => {
            if (err) throw err;
            console.log(results);
            runSearch();
        });
    }

function queryRange() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'start',
        message: 'What is the starting position you would like to designate?'
    },
    {
        type: 'input',
        name: 'ending',
        message: 'What is the ending position you would like to designate?',
        validate: (val) => {
            if(isNaN(val) === false) return true;
             return false;
        }
    },
    ])
    .then(function (answer) {
        const query = "SELECT position, song, artist, year FROM top5000 WHERE position between ? and ?";
        connection.query(query, [answer.start, answer.ending], (err, results) => {
            if (err) throw err;
            console.log(results);
            runSearch();
        });
    })
}

function querySongSpecific() {
    inquirer.prompt({
        type: 'input',
        name: 'song',
        message: 'What song would you like to search for?'
    })
    .then(function (answer) {
        const query = "SELECT artist, position, song, year FROM top5000 WHERE ?";
        const ret = connection.query(query, {song: answer.song}, (err, results) => {
            if (err) throw err;
            console.log(results);
            runSearch();
        });
        console.log(ret.sql);
    })
}

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    runSearch();
})