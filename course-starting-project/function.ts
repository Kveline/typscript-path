// using return
function add(n1: number, n2: number): number {
    return n1+n2;
}
// not using return
function printResult(num: number): void {
    console.log('Result ' + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void){
    const result = n1 + n2;
    cb(result);
}

printResult(add(5, 12));
// variable with function data type
let combineValues: (a: number, b: number) => number;
combineValues = add;
console.log(combineValues(8, 8));

//  void : will ignore any result might be retuning
// test call back
addAndHandle(10, 20, (result: number) => {
    console.log(result);
})
