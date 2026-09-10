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
    email : String,
});

const postSchema = new Schema({
    content  : String,
    likes : Number,
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
})

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

const addData = async()=>{
    // let user1 = new User({username : "saurav", email:"saurav@gmail.com"})
    // let post1 = new Post({
    //     content : "Hello world!",
    //     likes : 7,
    //     user : user1
    // });
    // // post1.user = user1
    // await user1.save()
    // await post1.save()

    let user = await User.findById("6aa2c357519effcf10de672c");

    let post2 = new Post({
        content : "new post2",
        likes : 10,
    })

    post2.user = user
    
    await post2.save();
};
// addData();

const findPost = async()=>{
    let res = await Post.find({}).populate("user")
    console.log(res);
}

findPost();

