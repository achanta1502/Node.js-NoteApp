//console.log('Starting app.js');
const fs = require('fs');         //importing packages
//const os = require('os');
const notes = require('./notes.js');  //importing js files using relative path
const _ =require('lodash');     //import lodash
const yargs=require('yargs');

const argv=yargs
  .command('add','Add a new note',{
    title:{
      describe: 'Title of note',
      demand: true,    //to tell we need this attribute
      alias: 't'
    },
    body:{
      describe: 'body of note',
      demand: true,    //to tell we need this attribute
      alias: 'b'
    }
  })
  .command('list','List all notes')
  .command('read','Read a note',{
    title:{
      describe: 'Title of note',
      demand: true,    //to tell we need this attribute
      alias: 't'
    }
  })
  .command('remove','remove a note',{
    title:{
      describe: 'Title of note',
      demand: true,    //to tell we need this attribute
      alias: 't'
    }
  })
  .help()
  .argv;
 //console.log('true is',_.isString(true));
// var filteredArray=_.uniq(['Achanta']);
// console.log(filteredArray);
//console.log('Result:', notes.add(9,-2));
// var user= os.userInfo();
// fs.appendFile('greetings.txt',`Hello ${user.username}! You are ${notes.age}`, function (err) {
//   if(err){
//     console.log('unable to write the data');
//   }
// });
//console.log('Yargs',argv);
//var command=process.argv[2];
//console.log('Command',command);
var command=argv._[0];
if(command === 'add'){
  console.log('Adding new note');
  var note=notes.addNote(argv.title,argv.body);
  if(note){
    console.log('Note created');
    console.log('--');
    console.log(`Title: ${note.title}`);
  }else{
    console.log('Note already taken');
  }
}else if (command==='read') {
  var note=notes.getNote(argv.title);
  if(note){
    //debugger;
    console.log('Note found');
    console.log('--');
    console.log(`Title: ${note.title}`);
  }else{
    console.log('Note not found');
  }
}
else if (command==='list') {
//  console.log('listing all nodes');
  var allNotes=notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note) => notes.logNote(note));
}else if (command==='remove') {
  var noteRemoved=notes.removeNote(argv.title);
  var message=noteRemoved ? 'Note was removed' : 'Note not found';
  console.log(message);
}
