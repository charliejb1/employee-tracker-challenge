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
      res.rows.forEach(department => {
        console.log(`ID: ${department.id}, Name: ${department.department_name}`);
      });
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
        res.rows.forEach(role => {
          console.log(`ID: ${role.id}, Title: ${role.title}, Salary: ${role.salary}, Department ID ${role.department_id}`);
        });
      }
      mainMenu()
      });
    };

    const viewAllEmployees = () => {
     const query = 
     `SELECT employees.first_name, employees.last_name, roles.salary 
      FROM employees
      INNER JOIN roles ON employees.role_id = roles.id;
      `;

      pool.query(query, (err, res) => {
        console.log(res)
        if (err) {
          console.error('Error executing query', err.stack);
        } else {~
          console.log('Employees:');
          res.rows.forEach(employee => {
            console.log(`First Name: ${employee.first_name}, Last Name: ${employee.last_name}, Salary: ${employee.salary}`);
          });
        }
        mainMenu()
        });
      };


      
mainMenu()