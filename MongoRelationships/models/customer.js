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


