console.log('starting notes');

// console.log(module);

module.exports.age = 33;
//We created a new property called age.  Age is now a property that can be used by app.js because app.js imported into the notes.js file.  The "notes" variable in app.js stores all of the properties found in notes.js

module.exports.addNote = () =>{
// to replace an ES5 function with an arrow fcn, you replace the fcn keyword w/ => between the () and {.  If you have an anonyomous fcn you can swap it for an ES6 arrow fcn.  The arrow fcn is not going to bind to the this keyword or the arguments array.
	console.log('addNote');
	return 'New note';

};

//make a new fcn called add.  it gets set on the exports object. can set multiple properties.  takes two arguments, a and b, wil add them together and return the result.  then inside of app.js call the notesAdd fcn, pass in two numbers and then print the result to the screen and then test.

module.exports.addNumbs = function (a, b){
	return a + b;

};