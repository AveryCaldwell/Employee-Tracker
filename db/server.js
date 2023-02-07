// get the client
const mysql = require('mysql2');
const inquirer = require('inquire');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Waffles1234!',
    database: 'employee_db',
});

// showDepartments
// showRoles
// showEmployees
// addDepartment
// addRole
// addEmployee
// updateEmployee
// updateManager
