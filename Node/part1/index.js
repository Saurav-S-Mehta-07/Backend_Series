// let a = 5;
// let b = 10;
// console.log(a+b);


// for(let i = 0; i<n; i++){
//     console.log("Hello " + "User " + i);
// }

let args = process.argv;
for(let i = 2; i<args.length; i++){
    console.log("Welcome! " + args[i]);
}
// console.log(process.argv);