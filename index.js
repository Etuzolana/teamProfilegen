const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

const inquirer = require("inquirer");

const path = require("path");
const fs = require("fs");

const team = [];

const askQuestion = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What employee do you want to add in your team?",
        choices: ["Manager", "Intern", "Engineer", "No more"],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case "Manager":
          createManager();
          break;
        case "Intern":
          createIntern();
          break;
        case "Engineer":
          createEngineer();
          break;
        default:
          printTeam();
          break;
      }
    });
};

askQuestion();

const createManager = () => {
    inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is Manager name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is Manager id?"
      },
      {
        type: "input",
        name: "email",
        message: "What is Manager email?"
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is Manager officeNumber?"
      },
    ]).then((answers) => {
        const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        team.push(newManager);
        askQuestion();
    });
}

const createIntern = () => {
    inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is Intern name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is Intern id?"
      },
      {
        type: "input",
        name: "email",
        message: "What is Intern email?"
      },
      {
        type: "input",
        name: "school",
        message: "What is Intern school?"
      },
    ]).then((answers) => {
        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
        team.push(newIntern);
        askQuestion();
    });
}

const createEngineer = () => {
    inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is Engineer name?"
      },
      {
        type: "input",
        name: "id",
        message: "What is Engineer id?"
      },
      {
        type: "input",
        name: "email",
        message: "What is Engineer email?"
      },
      {
        type: "input",
        name: "github",
        message: "What is Engineer github?"
      },
    ]).then((answers) => {
        const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        team.push(newEngineer);
        askQuestion();
    });
}

const printTeam = () => {
    let cards = '';
    team.forEach((mem) => {
        switch (mem.getRole()) {
            case "Manager":
                cards += `
                    <div>
                        <p>Name: ${mem.getName()}</p>
                        <p>Id: ${mem.getId()}</p>
                        <p>Email: ${mem.getEmail()}</p>
                        <p>officeNumber: ${mem.getOfficeNumber()}</p>
                    </div>
                `
                break;
                case "Intern":
                    cards += `
                        <div>
                            <p>Name: ${mem.getName()}</p>
                            <p>Id: ${mem.getId()}</p>
                            <p>Email: ${mem.getEmail()}</p>
                            <p>School: ${mem.getSchool()}</p>
                        </div>
                    `
                    break;
                    case "Engineer":
                cards += `
                    <div>
                        <p>Name: ${mem.getName()}</p>
                        <p>Id: ${mem.getId()}</p>
                        <p>Email: ${mem.getEmail()}</p>
                        <p>Github: ${mem.getGithub()}</p>
                    </div>
                `
                break;
            default:
                break;
        }
    });


    const temp =  `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    ${cards}
</body>
</html>
    `;

    fs.writeFile(path.join(__dirname, "/output/team.html"), temp, 'utf8', () => {
        console.log("sucessfully ran function");
    });
}