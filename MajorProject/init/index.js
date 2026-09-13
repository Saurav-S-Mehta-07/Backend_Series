const mongoose = require("mongoose");
const { sampleListings } = require("./data.js");
const Listing = require("../models/listing.js");

// Connection to DB
const mongodb_url = "mongodb://127.0.0.1:27017/explora";

main()
    .then(() => console.log("Connected to MongoDB Successfully!"))
    .catch((err) => console.log("Error:", err));

async function main() {
    await mongoose.connect(mongodb_url);
}

const insertSampleData = async () => {
    try {
        // Delete existing listings
        await Listing.deleteMany({});

        // Add owner to every listing
        const listingsWithOwner = sampleListings.map((ob) => ({
            ...ob,
            owner: "6aa650bb23968d7ca80b77e1"
        }));

        // Insert listings
        await Listing.insertMany(listingsWithOwner);

        console.log("Sample listings inserted successfully");
    } catch (err) {
        console.log("Error:", err);
    } finally {
        await mongoose.connection.close();
    }
};

insertSampleData();