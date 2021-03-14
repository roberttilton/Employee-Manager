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
        switch (answer.userChoice) {
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
        choices: ['Departments', 'Employees', 'Managers', 'Roles']
    }).then((answer) => {
        switch (answer.addentry) {
            case "Departments":
                inquirer.prompt({
                    type: 'input',
                    name: 'departmentchoice',
                    message: 'What is the name of the department you would like to create?'
                }).then((answer) => {
                    let query = "INSERT INTO department (name) VALUES (?)";
                    connection.query(query, answer.departmentchoice, (err, results) => {
                        if (err) throw err;
                        console.log(results);
                        runTracker();
                    });
                })
                break;
            case "Employees":
                inquirer.prompt([{
                    type: 'input',
                    name: 'firstname',
                    message: 'What is the first name of the employee you would like to create?'
                },
                {
                    type: 'input',
                    name: 'lastname',
                    message: 'What is the last name of the employee you would like to create?'
                }, 
                {
                    type: 'input',
                    name: 'roleID',
                    message: 'What is the role ID you would like to designate for this employee?'
                }
                ]).then((answer) => {
                    let query3 = "INSERT INTO employee (first_name, last_name, role_id) VALUES (?, ?, ?)";
                    connection.query(query3, [answer.firstname, answer.lastname, answer.roleID], (err, results) => {
                        if (err) throw err;
                        console.log(results);
                        runTracker();
                    });
                })
                break;
            case "Managers":
                case "Employees":
                inquirer.prompt([{
                    type: 'input',
                    name: 'firstname',
                    message: 'What is the first name of the manager you would like to create?'
                },
                {
                    type: 'input',
                    name: 'lastname',
                    message: 'What is the last name of the manager you would like to create?'
                }, 
                {
                    type: 'input',
                    name: 'roleID',
                    message: 'What is the role ID you would like to designate for this manager?'
                },
                {
                    type: 'input',
                    name: 'managerID',
                    message: 'What is the manager ID you would like to designate for this manager?'
                }
                ]).then((answer) => {
                    let query4 = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                    connection.query(query4, [answer.firstname, answer.lastname, answer.roleID, answer.managerID], (err, results) => {
                        if (err) throw err;
                        console.log(results);
                        runTracker();
                    });
                })
                break;
                case "Roles":
                    inquirer.prompt([{
                        type: 'input',
                        name: 'rolechoice',
                        message: 'What is the name of the role you would like to create?'
                    },
                    {
                        type: 'input',
                        name: 'rolesalary',
                        message: 'What is the salary for the newly created role?'
                    },
                    {
                        type: 'input',
                        name: 'departmentchoice',
                        message: 'What is the department ID for this role?'
                    }
                ]).then((answer) => {
                        let query5 = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
                        connection.query(query5, [answer.rolechoice, answer.rolesalary, answer.departmentchoice], (err, results) => {
                            if (err) throw err;
                            console.log(results);
                            runTracker();
                        });
                    })
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
            choices: ['Departments', 'Employees', 'Managers', 'Roles']
        }
    ]).then((answer) => {
        switch (answer.viewselection) {
            case "Departments":
                let query = "SELECT * FROM department";
                connection.query(query, (err, results) => {
                    if (err) throw err;
                    console.log(results);
                    runTracker();
                });
                break;
            case "Employees":
                let query1 = "SELECT * FROM employee";
                connection.query1(query1, (err, results) => {
                    if (err) throw err;
                    console.log(results);
                    runTracker();
                });
                break;
            case "Managers":
                let query2 = "SELECT * FROM employee WHERE manager_id IS NOT NULL";
                connection.query(query2, (err, results) => {
                    if (err) throw err;
                    console.log(results);
                    runTracker();
                });
                break;
            case "Roles":
                let query9 = "SELECT * FROM role";
                connection.query(query9, (err, results) => {
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
            name: 'employeepick',
            message: 'What employee ID would you like to select to edit?' 
        },
        {
            type: 'input',
            name: 'role',
            message: 'What role ID would you like to assign this employee?'
        }
    ]).then(function (answer) {
        let query = "UPDATE employee SET role_id = ? WHERE id = ?";
        connection.query(query, [answer.role, answer.employeepick], (err, results) => {
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