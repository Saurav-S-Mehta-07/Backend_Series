const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mongodb_url = 'mongodb://127.0.0.1:27017/mongoRelationship'
main()
.then(()=>console.log("Connected to MongoDB Successfully!"))
.catch((err)=>console.log("Error : ", err))

async function main() {
    await mongoose.connect(mongodb_url)
}


const userSchema = new Schema({
    username : String,
    addresses : [
        {
            // _id : false, //will not make id if false
            location : String,
            city : String
        }
    ]
})

const User = mongoose.model("User", userSchema);

const addUsers = async()=>{
    let user1 = new User({
        username : "Saurav",
        addresses : [{
            location : "2234 Baker street",
            city : "london"
        }]
    })
    user1.addresses.push({location : "45 wall street", city : "London"});

    let result = await user1.save()
    console.log(result);
}

addUsers();