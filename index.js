const inquirer = require('inquirer');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
});

const mainMenuQs = [
  {
    type: 'list',
    message: 'What would you like to do?',
    name: 'userAction',
    choices: ['Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'View all Employees', 'Quit',]
  },
]

// Switch function used for user selection of mainMenuQs. Based on the selection of the first question, the user will be prompted to another question for adding data or to view a particular table of data.
const mainMenu = () => {
  inquirer.prompt(mainMenuQs).then(answers => {

    switch (answers.userAction) {
      case 'Update Employee Role':
        addEmployeeInfo()
        break;
      case 'View All Roles':
        viewAllRoles()
        break;
      case 'Add Role':
        addRole()
        break;
      case 'View All Departments':
        viewDepartments()
        break;
      case 'Add Department':
        addDepartment()
        break;
      case 'View all Employees':
        viewAllEmployees()
        break;
      case 'Quit':

        break;
      default:
        console.log('Invalid choice');
    }

  })
}
// Function for adding a new employee and their information.
const addEmployeeInfo = async () => {

  const employees = await pool.query(`
  SELECT employees.id, employees.first_name, employees.last_name
  FROM employees
  `)
  const roles = await pool.query(`
  SELECT roles.title, roles.id
  FROM roles
  `)

  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the first name of the employee?',
      name: 'employeeFirstName',
    },
    {
      type: 'input',
      message: 'What is the last name of the employee?',
      name: 'employeeLastName',
    },
    {
      type: 'list',
      message: 'What is the name of the role for the employee?',
      name: 'employeeRole',
      choices: roles.rows.map(role => ({ name: role.title, value: role.id })),
    },
    {
      type: 'list',
      message: 'Who is the manager of the employee?',
      name: 'employeeManager',
      choices: employees.rows.map(employee => ({ name: employee.first_name + ' ' + employee.last_name, value: employee.id })),
    },
  ]).then(answers => {
    return pool.query(
      'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
      [answers.employeeFirstName, answers.employeeLastName, answers.employeeRole, answers.employeeManager]

    )
  }).then(mainMenu)

}

// Function for adding a new department to the database.
const addDepartment = async () => {

  const employees = await pool.query(`
  SELECT departments.id, department_name
  FROM departments
  `)

  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the department you want to add?',
      name: 'addDepartment',
    },

  ]).then(answers => {
    return pool.query(
      'INSERT INTO departments (department_name) VALUES ($1)',
      [answers.addDepartment]

    )
  }).then(mainMenu)
}

// Function for adding a role with its salary and corresponing department.
const addRole = async () => {

  const res = await pool.query(
    `SELECT * 
    FROM departments 
   `);

  const departments = res.rows;

  inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the role?',
      name: 'roleName',
    },
    {
      type: 'input',
      message: 'What is the salary for the role?',
      name: 'roleSalary',
      validate: (input) => !isNaN(input) || 'Please enter a valid number',
    },
    {
      type: 'list',
      message: 'What department is the role in?',
      name: 'roleDepartment',
      choices: departments.map(dept => ({ name: dept.department_name, value: dept.id })),
    },

  ]).then(answers => {
    return pool.query(
      'INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3)',
      [answers.roleName, answers.roleSalary, answers.roleDepartment]

    )
  }).then(mainMenu)
}

// Function for viewing all departments nd their ids on a table.
const viewDepartments = () => {
  pool.query('SELECT * FROM departments', (err, res) => {
    console.log(res)
    if (err) {
      console.error('Error executing query', err.stack);
    } else {
      console.log('Departments:');
      console.table(res.rows)

    }
    mainMenu()
  });
};

// Function for viewing all roles with corresponding id, title, salary, and department id.
const viewAllRoles = () => {
  pool.query('SELECT * FROM roles', (err, res) => {
    console.log(res)
    if (err) {
      console.error('Error executing query', err.stack);
    } else {
      ~
        console.log('Roles:');
      console.table(res.rows)

    }
    mainMenu()
  });
};

// Function for viewing all employees and their corresponding id, role id, title, first_name, last_name, salary and manager names they report to.
const viewAllEmployees = () => {
  const query =
    `SELECT employees.first_name, employees.last_name, employees.id, roles.title, roles.salary, departments.department_name, managers.first_name AS Manager_First, managers.last_name AS Manager_Last
      FROM employees
      LEFT JOIN roles ON employees.role_id = roles.id
      LEFT JOIN departments ON departments.id = roles.department_id
      LEFT JOIN employees AS managers ON employees.manager_id = managers.id
      `;

  pool.query(query, (err, res) => {
    console.log(res)
    if (err) {
      console.error('Error executing query', err.stack);
    } else {
      console.log('Employees:');
      console.table(res.rows)
    }
    mainMenu()
  });
};

mainMenu()