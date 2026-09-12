const mongoose = require("mongoose")

const Schema = mongoose.Schema

const Review = require("./review.js");

const listingSchema = Schema({
    title:{
      type : String,
      required:true,
    },
    description:{
        type : String,
        required : true,
    },
    image : {
       type:String,
       default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX4K-D7rFeL1Fta30QgEQQ5Aik7WFhDmZbcXjPr0M6Ng&s=10",
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
    country : {
        type: String,
        required:true
    },

    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review"
        }
    ]
})

listingSchema.post("findOneAndDelete",async(listing)=>{
   if(listing){
     await Review.deleteMany({_id : {$in : listing.reviews}})
   }
})

const Listing = mongoose.model("Listing", listingSchema)
module.exports = Listing