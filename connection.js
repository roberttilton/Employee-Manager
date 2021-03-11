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
                viewEmployees();
                break;
            case "Update an employee's role":
                updateRole();
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
                }).then((answer) => {
                let query = "INSERT INTO departments (name) VALUES (?)";
                connection.query(query, answer.departmentchoice, (err, results) => {
                    if (err) throw err;
                    console.log(results);
                    runTracker();
                });
            })
                break;
            case "Employees":
                inquirer.prompt({
                    type: 'input',
                    name: 'firstname',
                    message: 'What is the first name of the employee you would like to create?'
                },
                {
                    type: 'input',
                    name: 'lastname',
                    message: 'What is the last name of the employee you would like to create?'
                }).then((answer) => {
                let query = "INSERT INTO employee (first_name, last_name) VALUES (?)";
                connection.query(query, [answer.firstname, answer.lastname], (err, results) => {
                    if (err) throw err;
                    console.log(results);
                    runTracker();
                });
            })
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

function viewEmployees() {
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

function updateRole() {
    inquirer.prompt([
    {
        type: 'input',
        name: 'role',
        message: 'What role would you like to assign an employee?'
    }
    ]).then(function (answer) {
        const query = "INSERT INTO employee (role_id)";
        connection.query(query, answer.role, (err, results) => {
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