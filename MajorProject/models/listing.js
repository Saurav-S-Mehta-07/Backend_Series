const mongoose = require("mongoose")

const Schema = mongoose.Schema

const listingSchema = Schema({
    title:{
      type : String,
      required:true,
    },
    discription:{
        type : String,
        required : true,
    },
    image : {
       type:String,
       set : (v) => v === "" ?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX4K-D7rFeL1Fta30QgEQQ5Aik7WFhDmZbcXjPr0M6Ng&s=10":v,
    },
    price:{
        type:Number,
        required : true,
        min : [0, "price can't be too low"]
    },
    location:{
        type:String,
        required:true
    },
    city : {
        type: String,
        required:true
    }
})

const Listing = mongoose.model("Listing", listingSchema)

module.exports = Listing