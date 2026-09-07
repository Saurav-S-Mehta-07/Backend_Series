const mongoose = require("mongoose")

main()
.then(()=>{
    console.log("Database Connected Successfully!")
})
.catch((err)=>{
    console.log("Error : ", err)
})


const bookSchema = mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxLength : 20,
    },
    author : {
        type : String,
    },
    price : {
        type : Number,
        min : [0, "Price is too low for Amazon selling"],
    },
    discount : {
        type : Number,
        default: 0,
    },
    category : {
        type : String,
        enum : ["fiction", "non-fiction"],
        default : "fiction"
    },
    genre:[String]
})


const Book = mongoose.model("Book", bookSchema);

// Book.deleteMany({})
// .then(res=>console.log(res))
// .catch(err=>console.log(err))

// let book1 = new Book({
//     title:"Mathematics XII",
//      price:99, author:"RD Sharma",
//     category:"non-fiction",
//     genre : ["Maths", "non-fiction", "schools"]
// })
// book1.save()
// .then((res)=>{
//     console.log(res)
// })
// .catch(err=>console.log(err.message))



// Book.findByIdAndUpdate("6a9e4ab0ead7f4ef530e0d55", {price:-500}) // will update to -500
// .then(res=>console.log("Result ", res))
// .catch(err=>console.log(err.message))

Book.findByIdAndUpdate("6a9e4ab0ead7f4ef530e0d55", {price:-500}, {runValidators:true}) // it will check validation first
.then(res=>console.log("Result ", res))
.catch(err=>console.log(err.message))


async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/amazon')
}