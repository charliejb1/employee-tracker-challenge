const inquirer = require('inquirer');

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

const addRoleInfo = () =>  {
  const departments = pool.query('SELECT departments_id, department_name FROM departments').then(() => {
    {}
  })
//   [ 

//   {
//     type: 'input',
//     message: 'What is the name of the role?',
//     name: 'roleName',
//   },
//   {
//     type: 'input',
//     message: 'What is the salary for the role?',
//     name: 'roleSalary',
//   },
//   {
//     type: 'input',
//     message: 'What department is the role in?',
//     name: 'roleDepartment',
//   },
// ] 
}

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