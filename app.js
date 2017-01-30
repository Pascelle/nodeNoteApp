
console.log('Starting app'); 

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

const argv = yargs.argv;
//console.log(process.argv);
//process object with argv (arguments vector) property which is an array of all of the command line arguments passed in
//the whole point of this is so we can pass information into app.js via the command line (in real life this would be user input).  We can then grab the information passed in using process.argv and based on what was passed in do something with it.
var command = argv._[0];
//using the yarg module that yields an object with the commands etc.  the argv is the variable that holds the yargs.argv method that we can now use and we are grabbing the command that is entered in the command prompt which shows up in the object created by yarg in the 0 index place.


console.log('command: ', command);
console.log('Yargs', argv);

if (command === 'add'){
	notes.addNote(argv.title, argv.body);
	// notes is the module; addNote is a method
	//argv is the object and title is a key within the object
} else if (command === 'list') {
	notes.getAll();
	//doesn't take any arguments bc it returns all notes regardless of title
} else if (command === 'read') {
	notes.getNote(argv.title);
} else if (command === 'remove') {
	notes.removeNote();
} else {
	console.log('command not recognized');
}

