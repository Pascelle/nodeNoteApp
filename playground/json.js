//var obj = {
//	name: 'Pascelle'
// };
//we want to send this info somewhere (a database, a file etc) and to do that we are going to need to call a JSON method

//var stringObj = JSON.stringify(obj);
//console.log(typeof stringObj);
	//typeof is an operator

// console.log(stringObj); 

//var personString = '{"name": "Pascelle", "age": 33}';
// we need to convert this string back into an object.  to do this we do the opposite of json.stringify which is json.parse

//var person = JSON.parse(personString);
//.parse converts back into original form (array, object, etc.)

//console.log(typeof person);
//console.log(person);

// we know something is an object if it is NOT wrapped in double quotes and the values are wrapped in single quotes (which is valid in JS but not JSON)  

//We're goign to store the string in a file.  then read the contents of that file back using the fs module and orinting some properties from it (were going to need to convert the string which we get back from fs.readfilesync into an object using JSON.parse.)

const fs = require('fs');

// 1) WHEN SOMEONE ADDS A NEW NOTE WE ARE GOING TO USE THIS CODE TO SAVE IT:

//define the obj that will be stored in our file and then read back and then parsed:

var originalNote = {
	title: 'Some title',
	body: 'Some body'
};
// originalNote is the beginning regular object. take orginalNote and create a var called orginalNoteString and set this equal to the object we defined above using one of the two JSON methods

var originalNoteString = JSON.stringify(originalNote);
//we convert the regular object into a JSON string using JSON.stringify 

fs.writeFileSync('notes.json', originalNoteString);
//we write the string into a file called notes.json

// 2) WHEN SOMEONE WANTS TO READ THEIR NOTE WE'RE GOING TO USE THIS CODE TO EXECUTE

var noteString = fs.readFileSync('notes.json');
//we read the file where the string is stored
var note = JSON.parse(noteString);
//we convert the string back into an object (or an array, depending on what you saved) using JSON.parse.  We do this because we can access the properties of an object to then display.

console.log(typeof note);
console.log(note.title);
//note is the object we created using the JSON.parse method and we are accessing its title