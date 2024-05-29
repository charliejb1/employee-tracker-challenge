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

const addDepartmentQs = [
  {
      type: 'input',
      message: 'What is the name of the department you want to add?',
      name: 'addDepartment',
  },

]
const addRoleInfo = async () => {
  try {

    const res = await pool.query(
     `SELECT department_name, salary 
     FROM departments 
     INNER JOIN roles ON employees.role_id = roles.id;`);
      
    const departments = res.rows;

    const answers = await inquirer.prompt([
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
        choices: departments.map(dept => ({ name: dept.department_name, value: dept.department_id })),
      },
    ]);

    const insertRes = await pool.query(
      'INSERT INTO roles (role_name, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
      [answers.roleName, answers.roleSalary, answers.roleDepartment]
    );

  } finally {
    pool.end();
  }
};


const addEmployeeInfo = [
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
  type: 'input',
  message: 'What is the last name of the employee?',
  name: 'employeeLastName',
},
{
  type: 'input',
  message: 'What is the name of the role for the employee?',
  name: 'employeeRole',
},
{
  type: 'input',
  message: 'Who is the manager of the employee?',
  name: 'employeeManager',
},
]

const updateEmployee = [
  
]


module.exports = { mainMenuQs, addDepartmentQs, addRoleInfo, addEmployeeInfo,  }