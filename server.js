// get the client
const mysql = require('mysql2');
const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquire');
const fs = require('fs');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create the connection to database
const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root', // MySQL username,
        password: '', // MySQL password
        database: 'employee_db',
    },
    console.log(`Connected to the employee database.`)
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
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
