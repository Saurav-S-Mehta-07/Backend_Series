// const sum = (a,b)=>(a+b);
// const product = (a,b)=> (a*b);
// const g = 9.8;
// const PI = 3.14

// module.exports = 123; //number
// module.exports = "hello" : // string
// but if not export anything is an {} empty object
// module.exports = {sum, product, g, PI};

// let obj = {
//     sum : sum,
//     product : product,
//     g : g,
//     PI : PI
// }

// module.exports = obj;

// module.exports = {sum, product, g, PI};


// method 2
// module.exports.sum = (a,b)=>(a+b);
// module.exports.product = (a,b)=> (a*b);
// module.exports.g = 9.8;
// module.exports.PI = 3.14


// with exports only
exports.sum = (a,b)=>(a+b);
exports.product = (a,b)=> (a*b);
exports.g = 9.8;
exports.PI = 3.14