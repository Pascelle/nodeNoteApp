console.log('starting notes.js');
const fs = require('fs');

var addNote = (title, body) => {
	var notes = [];
	var note = {
		title,
		//title is equal to the var title
		body
	};

	try {
		var notesString = fs.readFileSync('notes-data.json');
		//this is the string version; we haven't passed it through json.parse.
		// By putting this into try/catch...if this fails (bc the file doesn't exist) that's fine because we already defined the var notes to be an empty array. 

		notes = JSON.parse(notesString);
		//this is going to take the string we read from notes-data.json and parse it into an array, then store it in the variable "notes" that we defined above

	} catch (e) {

	};
	//try catch statement... if the error happens, then the code in catch runs

	var duplicateNotes = notes.filter((note) ==> {
		return note.title === title;
		//this returns true or false
		//this means if the titles match then it will return true which means the filter function will keep the individual note in the array which will eventually get saved into duplicateNotes
	});
	//stores an array that contains duplicate notes
	//notes.filter() ==> notes is our array of notes. filter() is an array method that takes a callback

	notes.push(note);
	//the note object gets added to the end of the notes array
	fs.writeFileSync('notes-data.json',JSON.stringify(notes));
	//we pass in the file name and the data we want to write to the file, in this case the stringified notes array

};
var getAll = () => {
	console.log('Getting All Notes');
};

var getNote = (title) => {
	console.log('Reading All Notes');
};

var removeNote = () => {
	console.log("Removing Note");
};


module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
};
//this is defining an entire object that gets set to exports.  Here we're setting an object attribute addNote to the variable addNote as the value.
//with ES6, "addNote" and "addNote: addNote" are identical

 