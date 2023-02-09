require('dotenv').config();
// get the client
const fs = require('fs');
const path = require('path');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Create the connection to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: process.env.DB_USER, // MySQL username,
        password: process.env.DB_PASSWORD, // MySQL password
        database: process.env.DB_NAME,
    },
    console.log(`Connected to the employee database.`)
);
console.table('\n------------ EMPLOYEE TRACKER ------------\n');

// QUERY functions
const sqlSelectQuery = (query, success, table) => {
    connection.query({ sql: query }, function (err, results) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(
            '==========================================================================='
        );
        console.log(
            `==============================${table}==================================`
        );
        console.log(
            '==========================================================================='
        );
        success(results);
        console.log(
            '==========================================================================='
        );
        appStart();
    });
};
const sqlEditQuery = (query, success) => {
    connection.query({ sql: query }, function (err, results) {
        if (err) {
            console.log(err);
            return;
        }

        success;
    });
};
const sqlDeleteQuery = (query, success) => {
    connection.query({ sql: query }, function (err, results) {
        if (err) {
            console.log(err);
            return;
        }
        success;
    });
};
const sqlUpdateQuery = (query, success) => {
    connection.query({ sql: query }, function (err, results) {
        if (err) {
            console.log(err);
            return;
        }
        success;
    });
};

// VIEW/SELECT functions
const viewDepartments = () => {
    sqlSelectQuery(
        'SELECT * FROM department ORDER BY id ASC',
        console.table,
        'Departments'
    );
};
const viewRoles = () => {
    sqlSelectQuery('SELECT * FROM role', console.table, '===Roles===');
};
const viewEmployees = () => {
    sqlSelectQuery(
        "SELECT a.id as 'Employee ID', a.first_name as 'First Name', a.last_name as 'Last Name', CONCAT( d.first_name, \" \", d.last_name ) as 'Manager', b.title as 'Job Role', b.salary as 'Salary', c.name as 'Department' FROM employee AS a INNER JOIN role AS b ON a.role_id = b.id INNER JOIN department as c ON b.department_id = c.id LEFT JOIN employee d ON a.manager_id = d.id",
        console.table,
        '=Employees='
    );
};

// ADD functions
const addDepartment = () => {
    inquirer
        .prompt([
            {
                name: 'deptName',
                type: 'input',
                message: 'What is the name of the department?',
            },
        ])
        .then((answer) => {
            sqlEditQuery(
                `INSERT INTO department (name) VALUES ('${answer.deptName}')`,
                console.log(`Successfully added department ${answer.deptName}.`)
            );
        })
        .then(() => {
            viewDepartments();
        });
};

const addRole = () => {
    let departmentObj = {};
    let departmentList = [];
    connection.query(
        { sql: 'SELECT * FROM department' },
        function (err, results) {
            for (let i = 0; i < results.length; i++) {
                departmentList.push(results[i].name);
                departmentObj[results[i].name] = results[i].id;
            }
        }
    );
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the role title?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the role salary?',
            },
            {
                name: 'deptId',
                type: 'list',
                message: `What is the role's department?`,
                choices: departmentList,
            },
        ])
        .then((answer) => {
            sqlEditQuery(
                `INSERT INTO role ( title, salary, department_id) VALUES ('${
                    answer.title
                }', ${answer.salary}, ${departmentObj[answer.deptId]})`,
                console.log(`Successfully added role ${answer.title}.`)
            );
        })
        .then(() => {
            viewRoles();
        });
};

const addEmployee = (first_name, last_name, role_id, manager_id) => {
    let rolesObj = {};
    let rolesList = [];
    let employeeObj = {};
    let employeeList = [];
    connection.query(
        { sql: 'SELECT id, title FROM role' },
        function (err, results) {
            for (let i = 0; i < results.length; i++) {
                rolesList.push(results[i].title);
                rolesObj[results[i].title] = results[i].id;
            }
            connection.query(
                {
                    sql: 'SELECT id, first_name as firstName, last_name as lastName FROM employee',
                },
                function (err, result) {
                    // console.log(result);
                    for (let n = 0; n < result.length; n++) {
                        employeeList.push(
                            `${result[n]['lastName']}, ${result[n]['firstName']}`
                        );
                        employeeObj[
                            `${result[n]['lastName']}, ${result[n]['firstName']}`
                        ] = result[n].id;
                    }
                    employeeList.push('No Manager');
                    employeeObj['No Manager'] = 'NULL';
                    inquirer
                        .prompt([
                            {
                                name: 'firstName',
                                type: 'input',
                                message:
                                    'What is the first name of the employee?',
                            },
                            {
                                name: 'lastName',
                                type: 'input',
                                message:
                                    'What is the last name of the employee?',
                            },
                            {
                                name: 'role',
                                type: 'list',
                                message: `What is the employee's role?`,
                                choices: rolesList,
                            },
                            {
                                name: 'manager',
                                type: 'list',
                                message: "Who is the employee's manager ?",
                                choices: employeeList,
                            },
                        ])
                        .then((answer) => {
                            sqlEditQuery(
                                `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${
                                    answer.firstName
                                }', '${answer.lastName}', ${
                                    rolesObj[answer.role]
                                }, ${employeeObj[answer.manager]})`,
                                console.log(
                                    `Successfully added employee ${answer.firstName} ${answer.lastName}.`
                                )
                            );
                        })
                        .then(() => {
                            viewEmployees();
                        });
                }
            );
        }
    );
};

// DELETE functions
const deleteDepartment = () => {
    let departmentObj = {};
    let departmentList = [];
    connection.query(
        { sql: 'SELECT * FROM department' },
        function (err, results) {
            for (let i = 0; i < results.length; i++) {
                departmentList.push(results[i].name);
                departmentObj[results[i].name] = results[i].id;
            }
            inquirer
                .prompt([
                    {
                        name: 'dept',
                        type: 'list',
                        message: 'Which department would you like to remove?',
                        choices: departmentList,
                    },
                ])
                .then((answer) => {
                    connection.query(
                        {
                            sql: `SELECT id, title FROM role where department_id=${
                                departmentObj[answer.dept]
                            }`,
                        },
                        function (err, result) {
                            if (result.length > 0) {
                                console.log(
                                    'You must delete the following roles before proceeding:'
                                );
                                console.table(result);
                                setTimeout(() => {
                                    appStart();
                                }, 500);
                            } else {
                                sqlDeleteQuery(
                                    `DELETE FROM department WHERE id ='${
                                        departmentObj[answer.dept]
                                    }'`
                                );
                                console.log(
                                    `Successfully deleted department ${answer.dept}.`
                                );
                                setTimeout(() => {
                                    appStart();
                                }, 500);
                            }
                        }
                    );
                });
        }
    );
};
const deleteRole = () => {
    let roleObj = {};
    let roleList = [];
    connection.query({ sql: 'SELECT * FROM role' }, function (err, results) {
        for (let i = 0; i < results.length; i++) {
            roleList.push(results[i].title);
            roleObj[results[i].title] = results[i].id;
        }
        inquirer
            .prompt([
                {
                    name: 'role',
                    type: 'list',
                    message: 'Which Role would you like to remove?',
                    choices: roleList,
                },
            ])
            .then((answer) => {
                connection.query(
                    {
                        sql: `SELECT id, first_name as 'First Name', last_name as 'Last Name' FROM employee WHERE role_id = ${
                            roleObj[answer.role]
                        }`,
                    },
                    function (err, result) {
                        // console.log(result);
                        if (result.length > 0) {
                            console.log(
                                'You must delete or reassign the following employees before proceeding:'
                            );
                            console.table(result);
                            setTimeout(() => {
                                appStart();
                            }, 500);
                        } else {
                            sqlDeleteQuery(
                                `DELETE FROM role WHERE id ='${
                                    roleObj[answer.role]
                                }'`
                            );
                            console.log(
                                `Successfully deleted department ${answer.role}.`
                            );
                            setTimeout(() => {
                                appStart();
                            }, 500);
                        }
                    }
                );
            });
    });
};
const deleteEmployee = (id, first_name, last_name) => {
    let employeeObj = {};
    let employeeList = [];
    connection.query(
        {
            sql: 'SELECT id, first_name as firstName, last_name as lastName FROM employee',
        },
        function (err, result) {
            for (let n = 0; n < result.length; n++) {
                employeeList.push(
                    `${result[n]['lastName']}, ${result[n]['firstName']}`
                );
                employeeObj[
                    `${result[n]['lastName']}, ${result[n]['firstName']}`
                ] = result[n].id;
            }
            inquirer
                .prompt([
                    {
                        name: 'name',
                        type: 'list',
                        message: 'Which employee would you like to remove?',
                        choices: employeeList,
                    },
                ])
                .then((answer) => {
                    sqlDeleteQuery(
                        `DELETE FROM employee WHERE id = ${
                            employeeObj[answer.name]
                        }`
                    );
                    console.log(
                        `Successfully deleted employee  ${answer.name}.`
                    );
                })
                .then(() => {
                    viewEmployees();
                });
        }
    );
};

// UPDATE function
const updateEmployee = (first_name, last_name, role_id, id, role_title) => {
    let rolesObj = {};
    let rolesList = [];
    let employeeObj = {};
    let employeeList = [];
    connection.query(
        { sql: 'SELECT id, title FROM role' },
        function (err, results) {
            for (let i = 0; i < results.length; i++) {
                rolesList.push(results[i].title);
                rolesObj[results[i].title] = results[i].id;
            }
        }
    );
    connection.query(
        {
            sql: 'SELECT id, first_name as firstName, last_name as lastName FROM employee',
        },
        function (err, result) {
            console.log(result);
            for (let n = 0; n < result.length; n++) {
                employeeList.push(
                    `${result[n]['lastName']}, ${result[n]['firstName']}`
                );
                employeeObj[
                    `${result[n]['lastName']}, ${result[n]['firstName']}`
                ] = result[n].id;
            }
            inquirer
                .prompt([
                    {
                        name: 'select',
                        type: 'list',
                        message: 'Select an employee:',
                        choices: employeeList,
                    },
                    {
                        name: 'role',
                        type: 'list',
                        message: `What is the employee's role?`,
                        choices: rolesList,
                    },
                ])
                .then((answer) => {
                    sqlUpdateQuery(
                        `UPDATE employee SET role_id='${
                            rolesObj[answer.role]
                        }' WHERE id=${employeeObj[answer.select]}`,
                        console.log(
                            `Successfully updated employee ${answer.select}.`
                        )
                    );
                })
                .then(() => {
                    viewEmployees();
                });
        }
    );
};
const viewBudgetByDepartment = () => {
    let departmentObj = {};
    let departmentList = [];
    let roleIds = [];
    connection.query(
        { sql: 'SELECT * FROM department' },
        function (err, results) {
            for (let i = 0; i < results.length; i++) {
                departmentList.push(results[i].name);
                departmentObj[results[i].name] = results[i].id;
            }
            inquirer
                .prompt([
                    {
                        name: 'dept',
                        type: 'list',
                        message:
                            'Which department would you like to pull the total budget?',
                        choices: departmentList,
                    },
                ])
                .then((answer) => {
                    connection.query(
                        {
                            sql: `SELECT SUM(b.salary) as Budget FROM employee AS a INNER JOIN role AS b ON a.role_id=b.id WHERE b.department_id = ${
                                departmentObj[answer.dept]
                            }`,
                        },
                        function (err, result) {
                            console.log(result[0].Budget);
                            if (result[0].Budget !== null) {
                                console.log(
                                    `The total budget for ${answer.dept} is $${result[0].Budget}`
                                );
                                setTimeout(() => {
                                    appStart();
                                }, 500);
                            } else {
                                console.log(`${answer.dept} has no budget.`);
                                setTimeout(() => {
                                    appStart();
                                }, 500);
                            }
                        }
                    );
                });
        }
    );
};
const appStart = () => {
    inquirer
        .prompt([
            {
                name: 'start',
                type: 'list',
                message: 'Please select an option: ',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'View total budget by department',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'Update an employee role',
                    'Remove a department',
                    'Remove a role',
                    'Remove an employee',
                    'Exit',
                ],
            },
        ])
        .then((answer) => {
            console.log(answer.start);
            switch (answer.start) {
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'View total budget by department':
                    viewBudgetByDepartment();
                    break;
                case 'Add a department':
                    // console.log('add a department success');
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployee();
                    break;
                case 'Remove a department':
                    deleteDepartment();
                    break;
                case 'Remove a role':
                    deleteRole();
                    break;
                case 'Remove an employee':
                    deleteEmployee();
                    break;
                case 'Exit':
                    console.log('Thank you for using the Employee Tracker.');
                    process.exit();
            }
        })
        .catch((err) => console.error(err));
};

const init = () => {
    appStart();
};
// initialize app
init();
