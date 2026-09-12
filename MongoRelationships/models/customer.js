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

// customerSchema.pre("findOneAndDelete",async()=>{
//     console.log("Pre Middleware");
// });

customerSchema.post("findOneAndDelete",async (customer)=>{
    if(customer.orders.length){
        await Order.deleteMany({_id : {$in : customer.orders }})
    }
});

const Order = mongoose.model("Order", orderSchema);
const addOrders = async()=>{
    await Order.insertMany([
        {item : "Banana", price : 20},
        {item : "apple", price : 20},
        // {item : "chocolate", price : 50},
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

// findCustomers();


// mongoose middleware for handling deletion

const addCust = async()=>{
    let newCust = new Customer({
        name : "Karan",
    });

    let newOrd = new Order({
        item : "Burgur",
        price : 99
    });

    newCust.orders.push(newOrd);
    
    await newOrd.save();
    await newCust.save();
    console.log("added new cust");
}

// addCust()

const deleteCust = async()=>{
    let dltData = await Customer.findByIdAndDelete("6aa4e8e326de94ebacf2e9ae");
    // await Order.deleteMany({ _id: { $in: dltData.orders } }); // correct but written in post middleware
    console.log(dltData);
}

deleteCust();
