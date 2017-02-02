const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');
const notes = require('./notes.js');

const argv = yargs
	//this is the setup for the add command (name, description, actions required)
	.command('add', 'add a new note', {
		title: {
			describe: 'title of note',
			//this describes what gets passed in for the title of the note
			demand: true,
			//the tells yargs whether or not this argument is required.  it is false by default
			alias: 't'
			//lets you provide a shortcut so you dont have to type --title, you can set it to a single character, like t.
		},
		body: {
			describe: 'Body of note' ,
			demand: true, 
			alias: 'b'
		}
	})
	.command('list', 'list all notes')
	.command('read', 'read a note', {
		title: {
			describe: 'title of note',
			demand: true,
			alias: 't'
		},
	})
	.command('remove', 'remove a note', {
		title: {
			describe: 'title of note',
			demand: true,
			alias: 't'
		},
	})
	.help()
	//we are making a help call.  this is a method so we're going to call it as a function and dont need to pass in any arguments.  the purpose of the help call is to set up yargs to return some useful info when someone runs the program 
	.argv;
//here we're calling command on yargs, and then argv on the return value for command
//then we pass in three arguments to command (what the command is, what it does, an option object that lets us specify what arguments this command requires)
//console.log(process.argv);
//process object with argv (arguments vector) property which is an array of all of the command line arguments passed in
//the whole point of this is so we can pass information into app.js via the command line (in real life this would be user input).  We can then grab the information passed in using process.argv and based on what was passed in do something with it.
var command = argv._[0];
//using the yarg module that yields an object with the commands etc.  the argv is the variable that holds the yargs.argv method that we can now use and we are grabbing the command that is entered in the command prompt which shows up in the object created by yarg in the 0 index place.

if (command === 'add'){
	var note = notes.addNote(argv.title, argv.body);
	// notes is the module; addNote is a method
	//argv is the object and title is a key within the object
	if (note) {
	//we want to check if an obj was created so the if stmt will just contain the obj name as a parameter, no condition stmt necessary
		console.log("note created");
		notes.logNote(note);
		//you use note.title and note.body because the parameter represents the note object we are passing through.  You are accessing the title and body attributes on the note object.
		//ES6 syntax: (`Title: ${note.title}`);
	} else {
		
		console.log("note title taken");
	};

} else if (command === 'list') {
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s).`);
	//the `` are called template strings
	//this is equal to the return value of getAll
	//doesn't take any arguments bc it returns all notes regardless of titles
	allNotes.forEach((note) => notes.logNote(note));
	//this prints each note by calling logNote once for every item in the array.  We do this by calling a callback function for each item in the array.  We simplify allNotes.forEach((note) => {notes.logNote(note);}); by writing ES6 as shown above
} else if (command === 'read') {
	var note = notes.getNote(argv.title);
	//note stores the result of the running of the getNote fcn (with the argv.title parameter) over in notes.js
	if (note) {
		console.log("note read")
	} else {
		console.log("note not read")
	};

} else if (command === 'remove') {
	var noteRemoved = notes.removeNote(argv.title);
	//this will either return true or false bc of the return in removeNote found in notes.js
	//remember that we are using Yargs here, and yargs uses an object... we are telling Yargs what want, basically filling in the places in the command prompt.  Command = argv_[0]; we use argv.title as the parameter because that is how we tell Yargs what we want for a title.
	var message = noteRemoved ? 'Note was removed' : 'Note not found';
	//the terinary operator lets you specify a condition.  In this case we're using the condition noteRemoved (which will be true if a note was removed, false if it wasn't). After the condition we put a space with a question mark...this is the statement that will run if it is true (the truthy expression).  If it is false (the falsy expression) we specify that condition after the colon mark.
	console.log(message);
} else {
	console.log('command not recognized');
}

