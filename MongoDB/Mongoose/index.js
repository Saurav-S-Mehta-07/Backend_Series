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

// const user1 = new User({name:"Adam", email:"adam@gmail.com", age:20});
// user1.save();

const user2 = new User({name:"Eve", email:"eve@gmail.com", age:20});

user2.save() // returns promise
.then((res)=>{
    console.log("user inserted to the collection : ", res);
})
.catch((err)=>{
    console.log("haha! I found an Error & that is : ", err);
})


async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/test') // returns promise
}