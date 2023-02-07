-- DEPARTMENT SEEDS
INSERT INTO department (id, name) VALUES (1, 'Engineering');
INSERT INTO department (id, name) VALUES (2, 'Sales');
INSERT INTO department (id, name) VALUES (3, 'Finance');
INSERT INTO department (id, name) VALUES (4, 'Legal');
INSERT INTO department (id, name) VALUES (5, 'Human Rescources');

-- ROLE SEEDS
INSERT INTO role (title, salary, departmentID) VALUES ("Sales Lead", 150000, 1);
INSERT INTO role (title, salary, departmentID) VALUES ("Sales Mgr.", 138500, 2);
INSERT INTO role (title, salary, departmentID) VALUES ("Online Sales Rep.", 112000, 2);
INSERT INTO role (title, salary, departmentID) VALUES ("Print Sales Rep.", 143000, 2);
INSERT INTO role (title, salary, departmentID) VALUES ("Accountant", 138000, 3);
INSERT INTO role (title, salary, departmentID) VALUES ("Lawyer", 145000, 4);
INSERT INTO role (title, salary, departmentID) VALUES ("Operations Mgr.", 145000, 4);
INSERT INTO role (title, salary, departmentID) VALUES ("HR Coordinator", 110000, 5);

-- EMPLOYEE SEEDS
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Michael', 'Scott',1, null );
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Jim', 'Halpert', 2, 1);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Stanley', 'Hudson', 3, 1);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Oscar', 'Martinez', 4, 5);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Toby', 'Flenderson', 5, null);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Kevin', 'Malone',6, null);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Pam', 'Beasley', 7, 1);
INSERT INTO employees (firstName, lastName, roleID, managerID) VALUES ('Dwight', 'Schrute',8, 1 );
