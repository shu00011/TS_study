// const userName = 'Max'; // 定数 ブロックスコープ
// let age = 30;   // 変数 ブロックスコープ
const button = document.querySelector('button')!;
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hikking'];

// オブジェクト key-valueのペア
const person = {
    firstName: 'Max',
    age: 30
}

// const add = (a: number, b: number = 1) => a + b;

// const printOutput : (output: string | number) => void = output => {
//     console.log(output);
// }

// printOutput(add(2));

if (button) {
    button.addEventListener('click', event => {
        console.log(event);
    });
}

activeHobbies.push(...hobbies); // スプレッド演算子
// hobbiesの中身を展開して1コずつリストとして渡す

const copiedPerson = {
    ...person,
}

const add = (...numbers: number[]) => { // レストパラメーター：任意の数の引数を受け取るパラメーター 一つの配列になる 3つのパラメーターのみ受け取るなら ...numbers: [number, number, number]とタプルで表せる．
    return numbers.reduce((curResult, curValue)=>{
        return curResult + curValue;
    }, 0);   // reduceは配列につかえるメソッド.第2引数は初期値．この場合はcurResult=0
};

const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers);

// 分割代入
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2);

// オブジェクトの分割代入
const { firstName: userName, age } = person;    // 元の名前:変更する名前
console.log(userName, age, person);