type Admin = {  // interfaceでもおけ．
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;   // interfaceで二つを継承してもおけ．

// 交差型 複数の型を結合する．どのような型にも使える．
const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
}

type Combinable = string | number;  // union型
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// function overload
// tsが正しく戻り値の型を推論できないときに便利
function add(a: number, b: number): number; // 引数が両方ともnumberなら戻り値はnumber
function add (a: string, b: string): string;
function add (a: string, b: number): string;
function add (a: number, b: string): string;
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {   // タイプガード typeofはjs上での型を調べる．
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add('Hello', 'TypeScript');
result.split(' ');

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log(emp.name);
    if ('privileges' in emp) {  // タイプガード
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp ) {
        console.log('Start Date: ' + emp.startDate);
    }
}

printEmployeeInformation({name: 'Manu', startDate: new Date()});

class Car {
    drive() {
        console.log('運転中...');
    }
}

class Truck {
    drive() {
        console.log('トラックを運転中...');
    }

    loadCargo(amount: number) {
        console.log('荷物を載せています...' + amount);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {  // タイプガード instanceofはinterfaceでは使えない．(interfaceはjsにコンパイルされないため)
        vehicle.loadCargo(1000);
    }
}

useVehicle(v1);
useVehicle(v2);

// 判別可能なUnion型→共通のプロパティを持たせることでどのオブジェクトか判別できる
interface Bird {
    type: 'bird';   // 'bird'はリテラル型．string>リテラル
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse' :
            speed = animal.runningSpeed;
    }

    console.log('移動速度: ' + speed);
}

moveAnimal({ type: 'bird', flyingSpeed: 10});

// 取得の方法によってtsが推論する型は異なる
const paragraph = document.querySelector('p');  // pタグを取得
const paragraph2 = document.getElementById('message-output');

// 型キャスト
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;

// reactを使う場合
// const userInputElement = document.getElementById(
//     'user-input',
//     )! as HTMLInputElement;

// userInputElementが絶対にNULLだと言い切れない場合
const userInputElement = document.getElementById(
    'user-input',
    );

if (userInputElement) { // userInputElementがtruthyなら真
    (userInputElement as HTMLInputElement).value = 'こんにちは';
}

interface ErrorContainer {
    [prop: string]: string; // インデックス型
}

const errorBag: ErrorContainer = {
    email: '正しいメールアドレスではありません．',
    username: 'ユーザー名に記号を含めることはできません.',
    1: 'numberをpropに設定してもstringに変換できるのでstringとして解釈されてエラーにならないよ.'
};

// オプショナルチェイン nestされたオブジェクトに安全にアクセスする
// nestされたオブジェクトのプロパティが何らかの理由で取得できていない時
const fetchedUserData = {
    id: 'u1',
    name: 'user1',
    job: {
        title: 'Developer',
        description: 'TypeScript',
    }
}

// jsの時
// まずjobが存在するか調べる→次にtitleが存在するか調べる
// console.log(fetchedUserData.job && fetchedUserData.job.title);

// tsの時
console.log(fetchedUserData?.job?.title);

const userInput = '';   // 空文字列はfalsyな値

// もしuserInputがfalsyだったら'DEFAULT'を代入
// const storedData = userInput || 'DEFAULT';

// NULL合体演算子
// もしuserInputがNULLまたはundefinedだったら
const storedData = userInput ?? 'DEFAULT';

console.log(storedData);