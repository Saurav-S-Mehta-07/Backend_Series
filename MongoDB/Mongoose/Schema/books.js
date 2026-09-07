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
        min : 0,
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

Book.deleteMany({})
.then(res=>console.log(res))
.catch(err=>console.log(err))

let book1 = new Book({
    title:"Mathematics XII",
     price:99, author:"RD Sharma",
    category:"non-fiction",
    genre : ["Maths", "non-fiction", "schools"]
})
book1.save()
.then((res)=>{
    console.log(res)
})
.catch(err=>console.log(err.message))


async function main() {
   await mongoose.connect('mongodb://127.0.0.1:27017/amazon')
}