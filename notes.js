console.log('starting notes.js');
const fs = require('fs');

var fetchNotes = () => {
//**fetch any existing notes**//
//try catch statement... if the error happens, then the code in catch runs
	try {
		var notesString = fs.readFileSync('notes-data.json');
		//this is the string version; we haven't passed it through json.parse.
		// By putting this into try/catch...if this fails (bc the file doesn't exist) that's fine because we already defined the var notes to be an empty array. 

		return JSON.parse(notesString);
		//this is going to take the string we read from notes-data.json and parse it into an array, then store it in the variable "notes" that we defined above
		//when we refactored it, instead of saving it to the notes var we returned it to the calling function so that if we call the fetchNotes function we will get the notes array (a var just stores).  YOU NEED TO RETURN THINGS TO THE FUNCTION IN ORDER TO USE THEM RIGHT AWAY!
	} catch (e) {
		return [];
		//if there's no notes (there's no file at all, but there's a file and the data is in JSON) we're going to return an empty array
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
	//this fcn doesn't need to return anything bc there is nothing new being created; it is just sending something to a file.
	//we pass in the file name and the data we want to write to the file, in this case the stringified notes array
	//A common use of JSON is to exchange data to/from a web server.
	//When sending data to a web server, the data has to be a string.
	//Convert a JavaScript object into a string with JSON.stringify().
};

//**create some static variables**//
var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		//the object key "title" is the same as the value "title" so instead of writing title:title we use ES6 and just write title.  Same with body below.
		body
	};

//**we check for duplicates**//
	var duplicateNotes = notes.filter((note) => {
		return note.title === title;
		//duplicateNotes stores an array that contains duplicate notes
		//notes.filter() ==> notes is our array of notes. filter() is an array method that takes a callback
		//The filter() method creates an array filled with all array elements that pass a true/false test (provided as a function).  If the test returns true then the item will be kept in the array which means there are duplicate notes.  If it return falses, that means the titles are not equal and duplicateNotes will be empty.  All we want to do is return true if the titles match.  Note: filter() does not execute the function for array elements without values
		//notes.filter (the array of notes) that gets called by the singular version, note (in the parameter)
		//notes.title accesses the title of the new note that has been created via the parameter "note" here.
	});

//**if it is not a duplicate we push it on to the list**//
//now we check the length of duplicateNotes.  If the length of duplicateNotes is greater than 0 then we don't want to save the note (it means another note already exists with that title)
	if (duplicateNotes.length === 0) {
			notes.push(note);
			//the note object gets added to the end of the notes array
			saveNotes(notes);	
			//we need to pass in a parameter because we need to let the fcn know where it is saving the info to.  LOOK AT THE FCN, SEE WHAT IT DOES AND WHAT IT NEEDS TO WORK.  THAT WILL LET YOU KNOW IF YOU NEED PARAMETERS OR NOT.
			return note;
			//this note is going to get returned to whoever called the function... in this case the if statement found in app.js
	}
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

 