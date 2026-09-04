const mongoose = require('mongoose');

main()
.then(() => console.log('MongoDB Connected!'))
.catch((err)=>console.log(err));


const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:String,
    email:String,
    age:Number,
});


const User = mongoose.model("User", userSchema); // collection name : users

// insert many

// User.insertMany([
//     {name:"Tony", email:"tony@gmail.com", age:40},
//     {name:"Broune", email:"broune@gmail.com", age:30},
//     {name:"Bruce", email:"bruce@gmail.com", age:25},
// ])
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })


// insert one

// const user1 = new User({name:"Adam", email:"adam@gmail.com", age:20});
// user1.save();

// const user2 = new User({name:"Eve", email:"eve@gmail.com", age:20});

// user2.save() // returns promise
// .then((res)=>{
//     console.log("user inserted to the collection : ", res);
// })
// .catch((err)=>{
//     console.log("haha! I found an Error & that is : ", err);
// })


// find

// User.find({age:{$gte:30} })
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })


// User.findOne({age:{$gte:30}})
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })



// User.findOne({_id:"6a9aa5023af302b5c35657be"})
// .then((res)=>{
//     console.log(res);
// })
// .catch((err)=>{
//     console.log(err);
// })

User.findById("6a9aa5023af302b5c35657be")
.then((res)=>console.log(res))
.catch((err)=>console.log(err));


async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/test') // returns promise
}