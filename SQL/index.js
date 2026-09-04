const express = require("express");
const app = express();
const mysql = require('mysql2');
const PORT = 8080;
const path = require("path");
const { faker } = require('@faker-js/faker');


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

let getRandomUser = ()=>{
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

// console.log(getRandomUser())


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: "mysqlpassword@123"
});

// A simple SELECT query
try{
  connection.query('show tables',(err, results, fields)=> {
      if(err) throw err;
      console.log(results); // results contains rows returned by server
      // console.log(fields); // fields contains extra meta data about results, if available
  });
}catch(err){
  console.log(err);
}

connection.end();