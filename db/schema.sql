DROP DATABASE IF EXISTS employee_db;
-- Creates the "employee_db" database --
CREATE DATABASE employee_db;

-- Makes it so all of the following code will affect employee_db --
USE employee_db;

--  DEPARTMENT TABLE
CREATE TABLE department (
  id INT PRIMARY KEY,
  name VARCHAR(30), -- to hold department name
);

-- ROLE TABLE
CREAT TABLE role {
    id INT PRIMARY KEY,
    title VARCHAR(30) , --  to hold role title
    salary DECIMAL,  -- to hold role salary
    department_id INT,  -- to hold reference to department role belongs to
    FOREIGN KEY (department_id) REFERENCES department(id)
}

-- EMPLOYEE TABLE
CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30), --to hold employee first name
    last_name VARCHAR(30), --to hold employee last name
    role_id INT, --to hold reference to employee role
    manager_id INT, --to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)
    FOREIGN KEY (department_id) REFERENCES department(id)
);




-- `show databases;` to show the database table
-- ` select * from department; `