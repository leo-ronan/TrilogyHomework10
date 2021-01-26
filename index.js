const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const {countReset} = require("console");
const {create} = require("domain");

//import employees from "lib/employees.js";
const engineers = require("./lib/engineers.js");
const interns = require("./lib/interns.js");
const managers = require("./lib/managers.js");
const render = require("./lib/render.js");

const indexDir = path.resolve(__dirname, "public");
const indexPath = path.join(indexDir, "index.html");

var allEmployees = [];

const setEmployeeInfo = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your manager's Id?",
            name: "managerId",
        },
        {
            type: "input",
            message: "What is your manager's name?",
            name: "managerName",
        },
        {
            type: "input",
            message: "What is your manager's email?",
            name: "managerEmail",
        },
        {
            type: "input",
            message: "What is your manager's office number?",
            name: "managerOfficeNum",
        }
    ])
    .then((managerInfo) => {
        newManager(managerInfo);
    });
};

const newManager = (employeeInfo) => {
    const manager = new managers (employeeInfo.managerId, employeeInfo.managerName, employeeInfo.managerEmail, employeeInfo.managerOfficeNum);
    allEmployees.push(manager);
    loop();
}


const setEngineerInfo = () => {
    inquirer.prompt ([
        {
            type: "input",
            message: "Enter engineer's ID",
            name: "engineerId",
        },
        {
            type: "input",
            message: "Enter engineer's name",
            name: "engineerName",
        },
        {
            type: "input",
            message: "Enter engineer's email",
            name: "engineerEmail",
        },
        {
            type: "input",
            message: "Enter engineer's Github",
            name: "engineerGithub",
        }
    ])
    .then((engineerInfo) => {
        newEngineer(engineerInfo)
    });
  }

const newEngineer = (employeeInfo) => {
    const engineer = new engineers (employeeInfo.engineerId, employeeInfo.engineerName, employeeInfo.engineerEmail, employeeInfo.engineerGithub);
    allEmployees.push(engineer);
    loop();
}


const setInternInfo = () => {
    inquirer.prompt ([
        {
          type: "input",
          message: "Enter intern's ID",
          name: "internId"
        },
        {
          type: "input",
          message: "Enter intern's name",
          name: "internName"
        },
        {
          type: "input",
          message: "Enter intern's email",
          name: "internEmail"
        },
        {
          type: "input",
          message: "Which college is the intern attending?",
          name: "internCollege"
        }
    ])
    .then((internInfo) => {
        newIntern(internInfo);
    });
}

const newIntern = (employeeInfo) => {
    const intern = new interns (employeeInfo.internId, employeeInfo.internName, employeeInfo.internEmail, employeeInfo.internCollege);
    allEmployees.push(intern);
    loop();
}


const loop = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "employeeType",
            choices: ["Engineer", "Intern", "Done"]
        }
    ])
    .then((employeeInfo) => {
        switch(employeeInfo.employeeType) {
            case "Engineer": setEngineerInfo(); break;

            case "Intern": setInternInfo(); break;

            case "Done": newTeam(); break;
        }
    })
};

const newTeam = () => {
    if (!fs.existsSync(indexDir)){
        fs.mkdirSync(indexDir);
    }
    fs.writeFileSync(indexPath, render(allEmployees));
};

setEmployeeInfo();