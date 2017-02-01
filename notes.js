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
		//this is creating an object with the key title, and value title (from the parameter).  same for body.  the object key "title" is the same as the value "title" so instead of writing title:title we use ES6 and just write title.  Same with body below.
		body
	};

//**we check for duplicates**//
	var duplicateNotes = notes.filter((note) => {
		return note.title === title;
		//the filter method is being applied to the notes array created by fetchNotes.  It returns an array that contains all of the elements where the title attribute on the note object matches the title parameter passed in through the addNote function).
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
			//this note is going to get returned to whoever called the addNote function... in this case the if statement found in app.js called it
			//IF YOU DON'T CALL RETURN, UNDEFINED AUTOMATICALLY GETS RETURNED.  If duplicateNotes.length is greater than 0, then the stuff in the fcn does not happen BUT undefined automatically gets returned.
	}
};


var getAll = () => {
	return fetchNotes();
};

var getNote = (title) => {
	var notes = fetchNotes();
	//fetching  (i.e. get all of the notes parsed out of a JSON string back into an array/obj)
	var filteredNotes = notes.filter((note) => note.title === title);
	//filtering (It returns an array that contains all of the elements where the title attribute on the note object matches the title parameter passed in through the getNote function.  It is saying "filter through this array called notes, and for each individual note inside of it, compare its title attribute to the parameter passed in")
	 return filteredNotes[0];
	//return statement getting first index of the array
};

var removeNote = (title) => {
	//get the notes array
	var notes = fetchNotes();
	//filter the notes array, removing the one with title of argument
	var filteredNotes = notes.filter((note) => note.title !== title);
		//Notes is an array of notes created by fetchNotes.  We want to change the array by taking something out, so we apply the filter method to the notes array.   We tell it WHAT to KEEP inside of the fcn.  This will return an array with all notes that have a title that do NOT match the title of the parameter note (i.e. KEEP all notes whose titles do not match).  
		//ES6: If you only have one statement there is no need for curly braces or the return keyword.  So it would be notes.filter((note) => note.title !== title;)
	saveNotes(filteredNotes);
		//save new notes array--- i.e. send it to a file
	return notes.length !== filteredNotes.length;
	//compare the original notes length to the filtered notes length to see if any notes were removed, then return it to removeNote
};

var logNote = (note) => {
	console.log('--');
	console.log(`Title: ${note.title}`);
	//use template strings in place of concatenating
	console.log(`Body: ${note.body}`);
};


module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote,
};
//this is defining an entire object that gets set to exports.  Here we're setting an object attribute addNote to the variable addNote as the value.
//with ES6, "addNote" and "addNote: addNote" are identical

 