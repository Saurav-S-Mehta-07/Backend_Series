const express = require("express");
const app = express();
const mysql = require('mysql2');
const {v4 : uuidv4}  = require("uuid");
const methodoverride = require("method-override");
const PORT = 8080;
const path = require("path");
const { faker } = require('@faker-js/faker');
const { resourceLimits } = require("worker_threads");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(methodoverride("_method"));

// let getRandomUser = ()=>{
//   return {
//     id: faker.string.uuid(),
//     username: faker.internet.username(),
//     email: faker.internet.email(),
//     password: faker.internet.password(),
//   };
// }

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
// let user1 = ["123","random_1","random_1@gmail.com", "pass123"];
// let user2 = ["124","random_2","random_2@gmail.com", "pass124"];
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

/************************************ */
//inserting fake data 

// let getUser = ()=>{
//   return [
//     faker.string.uuid(),
//     faker.internet.username(),
//     faker.internet.email(),
//     faker.internet.password(),
//   ];
// }

// let data = [];
// for(let i = 0; i<50; i++){
//   data.push(getUser());
// }

// let q = "insert into user(id, username,email,password) values ?";

// try{
//    connection.query(q, [data], (err,result, fields)=>{
//       if(err) throw err;
//       console.log(result);
//       console.log("50 fake users, inserted successfully");
//    })
// }catch(err){
//   console.log(err);
// }

// connection.end();


app.get("/", (req,res)=>{
  let q = "select count(*) from user";
  let count  = 0;
    try{
      connection.query(q,(err,result)=>{
        if(err) throw err;
        count = result[0]["count(*)"];
        res.render("home",{count});
      })
    }
    catch(err){
      console.log(err);
    }
})

app.get("/user",(req,res)=>{
  let q = "select * from user";
    try{
      connection.query(q,(err,result)=>{
        if(err) throw err;
        let data = result;
        res.render("users.ejs",{data});
      })
    }
    catch(err){
      console.log(err);
    }
})

app.get("/user/new",(req,res)=>{
  res.render("new");
})

app.post("/user",(req,res)=>{
  let {username, email, password} = req.body;
  let id = uuidv4();

  let newUser = [id, username, email, password];

  let q = "insert into user(id, username, email, password) value (?,?,?,?)";
  try{
    connection.query(q,newUser,(err,result)=>{
      if(err) throw err;
      console.log(result);
      console.log("new user added into database");
      res.redirect("/user");
    })
  }catch(err){
    console.log(err);
  }
})


app.patch("/user/:id",(req,res)=>{
  let {id} = req.params;

  let {username, password} = req.body;

  let q = `select * from user where id="${id}"`;
  try{
    connection.query(q, (err,result)=>{
      if(err) throw err;
      let user = result[0];
      // user.username = username; // not actually update in db
      if(password!==user.password){
         res.send("password is wrong");
      }
      else{
        let q2  = `update user set username="${username}" where id ="${id}"`;
        connection.query(q2,(err,result)=>{
          if(err) throw err;
          console.log(result);
          console.log("user updated");
          res.redirect("/user");
        })
      }
    })
  }
  catch(err){
    console.log(err);
  }
})

app.get("/user/:id/edit",(req,res)=>{
  let {id} = req.params;
  let q = `select * from user where id="${id}"`;
  try{
    connection.query(q, (err,result)=>{
      if(err) throw err;
      let user = result[0];
      res.render("edit",{user});
    })
  }
  catch(err){
    console.log(err);
  }
})

app.delete("/user/:id",(req,res)=>{
  let {id} = req.params;
  let q = `delete from user where id="${id}"`;
  try{
    connection.query(q, (err,result)=>{
      if(err) throw err;
      let user = result[0];
      console.log(user);
      console.log("user deleted successfully");
      res.redirect("/user");
    })
  }
  catch(err){
    console.log(err);
  }
})

app.listen(PORT,()=>{
  console.log(`listening to PORT : ${PORT}`);
})