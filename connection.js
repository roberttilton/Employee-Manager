const mysql = require('mysql');
const util = require('util');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,
  
    user: 'root',
  
    password: 'awesomexb0x',
    database: 'employeeDB',
  });
  function runTracker() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'userChoice',
            message: 'What would you like to do?',
            choices: ["Add a department, role or employee",
             "View current listings",
             "Update an employee's role",
            ]
        }
    ]).then((answer) => {
        switch(answer.userChoice) {
            case "Add a department, role or employee":
                addEntry();
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

function addEntry() {
    inquirer.prompt({
        type: 'list',
        name: 'addentry',
        message: 'What area would you like to add an entry to?',
        choices: ['Departments','Employees','Managers']
    }).then((answer) => {
        switch(answer.userChoice) {
            case "Departments":
                inquirer.prompt({
                    type: 'input',
                    name: 'departmentchoice',
                    message: 'What is the name of the department you would like to create?'
                })
                let query = `INSERT INTO departments (name) VALUES ()`;
                connection.query(query, (err, results) => {
                    if (err) throw err;
                    console.log(results);
                    runTracker();
                });
                break;
            case "Employees":
                let query = "SELECT * FROM employees";
                connection.query(query, (err, results) => {
                    if (err) throw err;
                    console.log(results);
                    runTracker();
                });
                break;
            case "Managers":
                let query = "SELECT * FROM managers";
                connection.query(query, (err, results) => {
                    if (err) throw err;
                    console.log(results);
                    runTracker();
                });
                break;
        }
       } 
    );
}

function queryMultiFilter() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'viewselection',
            message: 'Which category would you like to view all results in?',
            choices: ['Departments', 'Employees', 'Managers']
        }
    ]).then((answer) => {
        switch(answer.userChoice) {
            case "Departments":
                let query = "SELECT * FROM departments";
                connection.query(query, (err, results) => {
                    if (err) throw err;
                    console.log(results);
                    runTracker();
                });
                break;
            case "Employees":
                let query = "SELECT * FROM employees";
                connection.query(query, (err, results) => {
                    if (err) throw err;
                    console.log(results);
                    runTracker();
                });
                break;
            case "Managers":
                let query = "SELECT * FROM managers";
                connection.query(query, (err, results) => {
                    if (err) throw err;
                    console.log(results);
                    runTracker();
                });
                break;
        }
       } 
    );
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

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    runTracker();
})

connection.query = util.promisify(connection.query);

module.exports = connection;