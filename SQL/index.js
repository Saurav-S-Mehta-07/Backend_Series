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

let getUser = ()=>{
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: "mysqlpassword@123"
});

// A simple SELECT query
// let q = "show tables";
// try{
//   connection.query(q,(err, results, fields)=> {
//       if(err) throw err;
//       console.log(results); // results contains rows returned by server
//       console.log(results.length);
//       // console.log(fields); // fields contains extra meta data about results, if available
//   });
// }catch(err){
//   console.log(err);
// }


// insert into user table

// let user = ["123@bc2", "random_user1", "random1@gmail.com","random123"];
// let q = "insert into user(id,username,email,password) values (?,?,?,?)";

// try{
//    connection.query(q,user,(err,result)=>{
//     if(err) throw err;
//     console.log(result);
//    })
// }catch(err){
//   console.log(err);
// }

//multiple users
let user1 = ["123","random_1","random_1@gmail.com", "pass123"];
let user2 = ["124","random_2","random_2@gmail.com", "pass124"];
// let users = [user1, user2];

// let q = "insert into user(id,username,email,password) values ?";

// try{
//    connection.query(q,[[user1,user2]],(err,result)=>{
//     if(err) throw err;
//     console.log(result);
//    })
// }catch(err){
//   console.log(err);
// }









connection.end();