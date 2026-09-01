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