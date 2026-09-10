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