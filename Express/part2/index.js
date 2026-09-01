const express  = require("express");
const app = express(); 
// app is an object -> typeof app is function
// console.log(app, typeof app);




app.get('/', (req, res) => {
  res.send('Hello!, World')
})




// listen -> listens upcomming requests
const PORT = 3000;
app.listen(PORT, ()=>{
    console.log('Server is running on http://localhost:3000')
})

/*
Ports are the logical endpoints of a network
connection that is used to exchange information between
a web server and a web client
*/