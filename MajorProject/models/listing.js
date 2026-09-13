const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listingSchema = new Schema({
    title :{
        type : String,
        required : true
    },
    description : String,
    image : {
        url : {
            type: String,
            default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiDJ1Q55UlUR4-bVBFn-xJGDSS9gbovPiKNX7dYa4hFQ&s=10"
        },
        filename : {
            type: String,
            default : "uploads"
        }
    },
    price :{
        type : Number,
        min : 0
    },
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref: "User",
    },
    category :{
        type : String,
        default :"trending",
        enum :["trending","forests","rooms","iconic cities", "mountains",
             "castles", "amazing pools", "forests", "farms", "camping","arctic"
            ],
    }
});

listingSchema.post("findOneAndDelete", async(listing)=>{
    if(listing){
      await Review.deleteMany({_id : {$in : listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;