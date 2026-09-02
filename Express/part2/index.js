const express  = require("express");
const app = express(); 
// app is an object -> typeof app is function
// console.log(app, typeof app);



app.use((req, res)=>{
  console.log("request received");
})



// listen -> listens upcomming requests
const PORT = 8080;
app.listen(PORT, ()=>{
    console.log('Server is running on http://localhost:8080')
})

/*
Ports are the logical endpoints of a network
connection that is used to exchange information between
a web server and a web client
*/