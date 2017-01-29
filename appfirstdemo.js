//the intialization file for our app.  The only thing we run from the terminal

console.log('Starting app'); 

const fs = require('fs');
//require lets us load in the module so we can use its functionality down below.
//loading in the fs module.  Create a constant variable.  We're not going to be manipulating the code the module sends back so there's no need to use the var keyword, we can use the const keyword.
//tells node to fetch the contents of the fs module and store them in the fs variable
//we now have access to all of the fcns in the fs module, which we can find in the docs (node.js/api)
const os = require('os');
const notes = require('./notes.js');

var res = notes.addNote();
//set equal to the return result of the results.addNote fcn
//since this is set equal to a fcn we need to call the fcn with addNote()
console.log(res);


// var user = os.userInfo();

// fs.appendFile('greetings.txt', `Hello ${user.username}! You are ${notes.age}.`);

var add = notes.addNumbs(4,7);
console.log(add);
