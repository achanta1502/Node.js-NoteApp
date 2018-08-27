//console.log("starting notes.js");
// module.exports.addNote = () => {
//   console.log('addNote');
//   return 'New note';
// };
// module.exports.add= (a,b) => {  //to export to another js file
//   return a+b;
// }
const fs = require ('fs');
var fetchNotes =() => {
  try{
    var notesString =fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  }
  catch(e){
    return [];
  }
};
var saveNotes =(notes) => {
fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};
var addNote= (title, body) => {
  //console.log('Adding note', title, body);

  var notes=fetchNotes();
  var note={
    title,body
  };

  var duplicateNotes = notes.filter((note) => note.title === title);
  console.log('duplicateNotes',duplicateNotes);
  if(duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }

};
var logNote=(note)=>{
  console.log('----');
  console.log(note.title);
  console.log(note.body);
};
var getAll =  () =>{
  return fetchNotes();
}
var getNote = (title) =>{
  var notes=fetchNotes();
  var filteredNotes=notes.filter((yup)=>yup.title===title);
  return filteredNotes[0];
};
var removeNote = (title) => {
  var notes=fetchNotes();
  var filteredNotes =notes.filter((note) => note.title!==title);
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
};
module.exports={
  addNote,
  removeNote,
  getNote,
  getAll,
  logNote
};
