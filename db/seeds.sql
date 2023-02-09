-- Clear out the table entries for testing
delete from role where id between 0 and 99;
delete from employee where id between 0 and 99;
Delete from department where id between 0 and 99;


-- DEPARTMENT SEEDS
INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Sales');
INSERT INTO department (name) VALUES ('Finance');
INSERT INTO department (name) VALUES ('Legal');
INSERT INTO department (name) VALUES ('Human Resources');

-- ROLE SEEDS
INSERT INTO role ( title, salary, department_id) VALUES ("Sales Lead", 150000, 1);
INSERT INTO role ( title, salary, department_id) VALUES ("Sales Mgr.", 138500, 2);
INSERT INTO role ( title, salary, department_id) VALUES ("Sales Rep.", 112000, 2);
INSERT INTO role ( title, salary, department_id) VALUES ("Secretary.", 143000, 2);
INSERT INTO role ( title, salary, department_id) VALUES ("Accountant", 138000, 3);
INSERT INTO role ( title, salary, department_id) VALUES ("Lawyer", 145000, 4);
INSERT INTO role ( title, salary, department_id) VALUES ("Operations Mgr.", 145000, 4);
INSERT INTO role ( title, salary, department_id) VALUES ("HR Coordinator", 110000, 5);

-- EMPLOYEE SEEDS
INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Scott',1, null );
INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ('Jim', 'Halpert', 2, 1);
INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ('Stanley', 'Hudson', 3, 1);
INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ('Oscar', 'Martinez', 4, 5);
INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ('Toby', 'Flenderson', 5, null);
INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ('Kevin', 'Malone',6, null);
INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ('Pam', 'Beasley', 7, 1);
INSERT INTO employee ( first_name, last_name, role_id, manager_id) VALUES ('Dwight', 'Schrute',8, 1 );
