  ## Title: 
 
 Employee Tracker Challenge
  
 ## Description: 

In this project, I used inquirer and postgres to take data from tables within an employee database to present a readable view within the command line. The user will be able to see multiple views/tables based on their selection from prompts of:'View All Roles', 'View All Departments' or 'View all Employees'. This information is presented using a 'Main Menu' set of questions, that will then be used in a switch function. Once selecting their choice, the switch function will trigger the next function to display that particular table of data. They will also have the options to add information to those tables with prompts of: 'Add Employee', 'Add Role', or 'Add Department'. The switch function will still be used with these prompts as well. Once a user selects one of these prompts, the switch function will then trigger another set of prompts that ask for information about what they want to add to either an employee, role, or department. After completely finishing viewing a table or adding information to it, the user is then rerouted back to the original set of main menu questions.

I used pool.query to select/merge particular table information that will be used within a function. I used the .map function to create a new object with name and value as properties. The user will then select from that data that they are looking for. I also used INSERT INTO to insert new data into the tables. 


 ## Installation: 

 1- Open the Repo - employee-tracker-challenge
 
 2- Clone the Repo - https://github.com/charliejb1/employee-tracker-challenge

 3- Open with VS Code - code .

 ## Contributions: 

 Tutor Assistance - Savien Love , Alexis Gonzalez

 
 Class office hours 

 ## Questions?

  Github Username: charliejb1
  
  Github Profile Link: https://github.com/charliejb1
  
  Email: charlieboyle252@gmail.com
  
  ## Screen Recording