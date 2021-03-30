const inquirer = require('inquirer');
// Basic Questions
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username'
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself'
        },
    ]);
};

//Project-related questions

const promptProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your Project?'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description about the project(Required):'
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with?',
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });





