function add(n1: number, n2: number) {
    return n1 + n2;
}

function printResult(num: number): void {
    console.log('Result: ' + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

addAndHandle(10, 20, (result) => {
    console.log(result);
    return result;
});

// Function型
let combineValues: (a: number, b: number) => number;

combineValues = add;
console.log(printResult(combineValues(8, 8)));

console.log(printResult(add(5,12)));