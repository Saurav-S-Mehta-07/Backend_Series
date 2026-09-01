

import {sum, PI} from "./math.js";

console.log(sum(4,5));
console.log(PI);


/*
to import (import and export) keywords are used
and make sure in package.json 
add one more key-value pair ("type":"module")
to use this import and export
*/

/*
require vs import

(i) we can't selectivey load only the pieces we need with require but with import, we can
selectivey load only the pieces we need, which can save memory.

(ii) Loading is synchronous for 'require' but can be asynchronous for 'import'
*/