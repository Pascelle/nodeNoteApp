//the intialization file for our app.  The only thing we run from the terminal

console.log('Starting app'); 

const fs = require('fs');
//loading in the fs module.  Create a constant variable.  We're not going to be manipulating the code the module sends back so there's no need to use the var keyword, we can use the const keyword.
//tells node to fetch the contents of the fs module and store them in the fs variable
//we now have access to all of the fcns in the fs module, which we can find in the docs (node.js/api)
fs.appendFile('greetings/txt', 'Hello world');