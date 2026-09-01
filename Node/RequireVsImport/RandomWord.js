import { generate, count } from "random-words";

console.log(generate());

console.log(generate(5));

console.log(count());

console.log(count({ minLength: 5 }));