const fs = require('fs');
const generatePage = require('./src/page-template');

const profileDataArgs = process.argv.slice(2);

console.log(profileDataArgs);

const [username, github] = profileDataArgs;
console.log(username, github);

const pageHTML = generatePage(username, github);



fs.writeFile('index.html', generatePage(username, github), err => {
    if (err) throw err;
    console.log('Portfolio complete! Checkout index.html to see the output!')
});