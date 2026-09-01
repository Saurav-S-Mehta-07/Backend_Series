// learning local v/s global -> npm package installation
const figlet = require('figlet');

let text = process.argv[2];

figlet(text, function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

// global
// sudo chown -R $USER /usr/local/lib/node_modules
/* 
this command is written because we need admin
access before installing globally.
Not writing this command will give us error
 */

// npm install -g figlet 
// now figlet installed globally

// first link your package to use globally
// npm link figlet