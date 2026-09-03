// object prototype

// let arr = [1,2,3];
// let arr2 = [4,5,6];

// arr.sayHello = ()=>(console.log("Hello!, I'm ARR"));
// arr2.sayHello = ()=>(console.log("Hello!, I'm ARR"));

// Array.prototype.sayHello = ()=>(console.log("Hello!"));


//factory functions

// function PersonMaker(name, age){
//      const person = {
//         name : name,
//         age : age,
//         talk(){
//             console.log(`Hi!, my name is ${this.name}`);
//         }
//      }
//      return person;
// }

// let p1 = PersonMaker("Saurav", 20);
// let p2 = PersonMaker("Shivam", 21);
// console.log(p1.talk == p2.talk) // false

// Constructors
// function Person(name, age){
//     this.name = name;
//     this.age = age;
// }

// Person.prototype.talk = function(){
//     console.log(`Hi! My name is ${this.name}`);
// }

// let p1 = new Person("saurav", 20);
// let p2 = new Person("shivam", 21);
// console.log(p1.talk == p2.talk) // true



// classes

class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    talk(){
        console.log(`Hi!, my name is ${this.name}`);
    }
}

let p1 = new Person("saurav", 21);
let p2 = new Person("gaurav", 20);
// console.log(p1.talk == p2.talk);//true