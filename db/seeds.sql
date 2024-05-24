INSERT INTO departments (department_name)
VALUES ('Human Resources'),
       ('Sales'),
       ('Accounting'),
       ('Finance'),
       ('Management');

INSERT INTO roles (department_id, title, salary)
VALUES (1,'HR Representative',65000),
       (2,'District Sales Manager',70000),
       (3,'Senior Accountant',85000),
       (4,'Financial Advisor',75000),
       (5,'Branch Manager',90000);

INSERT INTO employees (role_id, last_name, first_name, manager_id)
VALUES (1,'Johnson','Bill',5),
       (2,'Romano','Paul',5),
       (3,'Smith','Larry',5),
       (4,'Doyle','Maria',5),
       (5,'Jones','Katherine', NULL);  