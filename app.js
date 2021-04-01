//const fs = require('fs');
const generateSite = require('./utils/generate-site.js');
const inquirer = require('inquirer');
const { writeFile, copyFile } = require('node:fs');
const generatePage = require('./src/page-template');

// Basic Questions
const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is your name?(Required)',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else {
                    console.log("Please enter your name.")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Enter your Github Username (Required) :',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                }
                else {
                    console.log('Please enter your github username.');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => confirmAbout
        },

    ]);
};

//Project-related questions

const promptProject = portfolioData => {
    console.log(`
=================
Add a New Project
=================
`);
    //if no projects
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of your Project? (Required)',
                validate: projectName => {
                    if (projectName) {
                        return true;
                    }
                    else {
                        console.log('Please enter a project name');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'Provide a description about the project(Required):',
                validate: description => {
                    if (description) {
                        return true;
                    }
                    else {
                        console.log('Please enter a project description.');
                        return false;
                    }
                }
            },
            {
                type: 'checkbox',
                name: 'languages',
                message: 'What did you build this project with?',
                choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
            },
            {
                type: 'input',
                name: 'link',
                message: 'Provide a Github Link: (Required)',
                validate: link => {
                    if (link) {
                        return true;
                    }
                    else {
                        console.log('Please enter a github link to the project.');
                        return false;
                    }
                }
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
        return generatePage(portfolioData);
    })
    .then(pageHtml => {
        return writeFile(pageHtml);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });

