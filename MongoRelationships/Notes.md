# # Relationships

\# SQL (via Foreign Keys)

* one to one : 
    * table 1 -> table 2 (one connection ) \
       eg : country ->  president  (one country has only one president)\
        (country_id, country_name, p_id) -> (p_id, p_name)

* one to many : 
    * table 1 -> -> table 2 (multipe connection) \
       eg : users -> posts \
       one user can create mulitipe posts and one post has only one author \
       users(user_id, name) -> posts(p_id, content, user_id)

* many to many : 
    * table 1 <-> <-> table 2 \
      eg: student <-> subject \
        students(std_id, name, sub_id) <-> subject(sub_id, name, std_id) \

``

# # Mongo Relationships

## One to Many 

 * this many can be : few(100 - 500), 100^n, millions-billions

### Approach 1 (one to few)
* store the child document inside parent
* eg : Zomato \
       home, hostel, office's addresses \

```
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
```


## # One to Many / Approach 2
 * Store a reference to the child document inside parent
 * eg : Customers -> oders

```
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongodb_url = 'mongodb://127.0.0.1:27017/mongoRelationship'
main()
.then(()=>console.log("Connected to MongoDB Successfully!"))
.catch((err)=>console.log("Error : ", err))
async function main() {
    await mongoose.connect(mongodb_url)
}
const orderSchema = new Schema({
    item : String,
    price : Number,
})
const customerSchema = new Schema({
    name : String,
    orders : [
        {
            type : Schema.Types.ObjectId, 
            ref : "Order"
        }
    ]
})
const Order = mongoose.model("Order", orderSchema);
const addOrders = async()=>{
    await Order.insertMany([
        {item : "Banana", price : 20},
        {item : "apple", price : 20},
        {item : "chocolate", price : 50},
    ]);
}
// addOrders()
const Customer = mongoose.model("Customer", customerSchema);
const addCustomer = async()=>{
   let cust1 = new Customer({
    name : "Saurav",
   });
   let order1 = await Order.findOne({item : "apple"});
   let order2 = await Order.findOne({item : "Banana"});
   let order3 = await Order.findOne({item : "chocolate"});
   cust1.orders.push(order1);
   cust1.orders.push(order2);
   let result = await cust1.save();
   console.log(result);
}
// addCustomer();
const findCustomers = async()=>{
    let result = await Customer.find({}).populate("orders")
    console.log(result[0]);
}
findCustomers();


```


## # One to Many / Approach 3 (one to squillions)
 * store a reference to the parent document inside child
 * store parent's reference inside child
 * eg :  posts -> users


```
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

```
 