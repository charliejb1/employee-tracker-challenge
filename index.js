const inquirer = require('inquirer');
const { Pool } = require('pg');
const {mainMenuQs, addRoleInfo} = require("./questions")
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME, 
});


const mainMenu = () => {
  inquirer.prompt(mainMenuQs).then(answers => {
    //go through the list of options of what to do.
    switch(answers.userAction) {
      case 'Update Employee Role':
       
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


const addRole = () => {
addRoleInfo()

.then(mainMenu())
}


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

  const viewAllRoles = () => {
    pool.query('SELECT * FROM roles', (err, res) => {
      console.log(res)
      if (err) {
        console.error('Error executing query', err.stack);
      } else {~
        console.log('Roles:');
        console.table(res.rows)
      
      }
      mainMenu()
      });
    };

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