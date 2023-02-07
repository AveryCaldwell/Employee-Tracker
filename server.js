// get the client
const mysql = require('mysql2');
const inquirer = require('inquire');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
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

// ## BONUS ##
// Try to add some additional functionality to your application, such as the ability to do the following:
// * Update employee managers.
// * View employees by manager.
// * View employees by department.
// * Delete departments, roles, and employees.
// * View the total utilized budget of a department--;in other words, the combined salaries of all employees in that department.
