const mongoose = require("mongoose")

const Chat = require("./models/Chat.js")


main()
    .then((res)=>{
        console.log("MongoDB Connected Successfully!")
    })
    .catch((err)=>{
        console.log("Error  : ", err.message)
    })

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp')
}


const data = [
    {from:"Saurav", to:"Mayank", msg:"come soon!", created_at : new Date()},
    {from:"Mayank", to:"Gaurav", msg:"Hey! Gaurav where are you?", created_at : new Date()},
    {from:"Nidhi", to:"Saurav", msg:"send me homework", created_at : new Date()},
    {from:"Aman", to:"Saurav", msg:"meet tonight", created_at : new Date()},
    {from:"Shivam", to:"Pawan", msg:"join the meeting soon", created_at : new Date()},
    {from:"Karan", to:"Aman", msg:"let's go to the party", created_at : new Date()},
    {from:"Krishna", to:"Gauri", msg:"hurry up!", created_at : new Date()}
]


const insertDemoData = (data)=>{
    Chat.deleteMany({})
    .then(res=>console.log("old data deleted and,"))
    .catch(err=>console.log(err.message))


    Chat.insertMany(data)
    .then((res)=>{
        console.log("data initialized successfully")
    })
    .catch((err)=>{
        console.log(err.message)
    })
}

insertDemoData(data)

