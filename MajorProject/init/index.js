const mongoose = require("mongoose")
const {sampleListings} = require("./data.js")
const Listing = require("../models/listing.js")

// connection to DB
const mongodb_url = 'mongodb://127.0.0.1:27017/explora'
main()
.then(()=>console.log("Connected to MongoDB Successfully!"))
.catch((err)=>console.log("Error : ", err))

async function main() {
    await mongoose.connect(mongodb_url)
}


const insertSampleData = async()=>{
    await Listing.deleteMany({});
    Listing.insertMany(sampleListings)
    .then(res=>console.log("sample listings inserted successfully"))
    .catch(err=>console.log("error : ", err))
}

insertSampleData()
