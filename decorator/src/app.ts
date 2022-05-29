function Logger(logString: string) {
    console.log('LOGGER ファクトリ'); // decoratorファクトリ
    return function(constructor: Function){// decorator 関数
        console.log(logString);
        console.log(constructor);

    }
}

function WithTemplate(template: string, hookId: string) {
    console.log('WithTemplate ファクトリ');
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T){   // _: Function 引数は必要ないの意
        return class extends originalConstructor {
            constructor(..._: any[]) {  // _ 引数が未使用だが問題ないの意
                super();
                console.log('テンプレートを表示');
                const hookEl=document.getElementById(hookId);
                if(hookEl){
                    hookEl.innerHTML=template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        };
    };
}

// decoratorファクトリが実行された後decorator関数が実行される
// decoratorファクトリは上から下の順序で実行される
// decorator関数は下から上の順序で実行される
@Logger("ログ出力中 - PERSON")
@WithTemplate('<h1>Personオブジェクト</h1>','app')
class Person {
    name='Max';

    constructor(){
        console.log("Personオブジェクトを作成中...");
    }
}

const pers = new Person();

console.log(pers);

function Log(target: any, propertyName: string | Symbol) {
    console.log('Property decorator');
    console.log(target, propertyName);

}

function Log2(target: any, name: string, descriptor: PropertyDescriptor){
    console.log('Accessor decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log3(
    target: any,
    name: string | Symbol,
    descriptor: PropertyDescriptor
) {
    console.log('Method decorator');
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number){
    console.log('Parameter decorator');
    console.log(target);
    console.log(name);
    console.log(position);
}

// decoratorはクラスが定義されたときに実行される．
class Product {
    @Log
    title: string;
    private _price: number; // 名前の前にアンダースコア→クラスの外部からアクセスできないようにする

    @Log2
    set price(val: number) {
        if(val >0){
            this._price=val;
        } else {
            throw new Error('不正な価格です - 0以下は設定できません．');
        }
    }

    constructor(t: string, p: number) {
        this.title =t;
        this._price =p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price *(1+tax);
    }
}

const p1 = new Product('Book', 100);
const p2 = new Product('Book2',200);

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod =descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

class Printer {
    message ='クリックしました!';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button =document.querySelector('button')!; // ! not null
// button.addEventListener('click', p.showMessage.bind(p));
button.addEventListener('click', p.showMessage);

interface ValidatorConfig {
    [prop: string]: {
        [validatableProp: string]: string[] // ['required', 'positive']
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name]={
        ...registeredValidators[target.constructor.name],
        [propName]: [
            ...(registeredValidators[target.constructor.name]?.[propName] ??[]),    // ??->??の左側の値がnullまたはundefinedのとき??の右側の値を利用する．
            'required',
        ],
    };
}

function PositiveNumber(target: any, propName: string){
    registeredValidators[target.constructor.name]={
        ...registeredValidators[target.constructor.name],
        [propName]: [
            ...(registeredValidators[target.constructor.name]?.[propName] ??[]),
            'positive',
        ],
    };
}

function validate(obj: any) {
    const objValidatorConfig=registeredValidators[obj.constructor.name];
    if(!objValidatorConfig){
        return true;
    }
    let isValid = true;
    for(const prop in objValidatorConfig){
        console.log(prop);
        for(const validator of objValidatorConfig[prop]){
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop]; // 頭に2つの!->booleanに変換
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid; // switch文でdefaultの場合
}

class Course {
    @Required
    title: string;
    @PositiveNumber // 正の数
    price: number;

    constructor(t: string, p: number){
        this.title=t;
        this.price=p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    if(!validate(createdCourse)){
        alert('正しく入力してください．');
        return;
    }
    console.log(createdCourse);
});
