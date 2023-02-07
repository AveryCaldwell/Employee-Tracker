DROP DATABASE IF EXISTS employee_db;
-- Creates the "employee_db" database --
CREATE DATABASE employee_db;

-- Makes it so all of the following code will affect employee_db --
USE employee_db;

--  DEPARTMENT TABLE
CREATE TABLE department (
  id INT NOT NULL,
  name VARCHAR(30) NOT NULL
);

-- ROLE TABLE
CREAT TABLE role {
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
}

-- EMPLOYEE TABLE
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL
    FOREIGN KEY (department_id) REFERENCES department(id)
);




-- `show databases;` to show the database table
-- ` select * from department; `