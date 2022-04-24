// type AddFn = (a: number, b: number) => number;  // function型
// インターフェースでファンクション型を定義する
interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
}

interface Named {
    readonly name?: string; // デフォルト値を設定することはできない
    outputName?: string;    // ?をつけることでもっていてももっていなくてもよいプロパティとなる
}

// インターフェースも継承可能
// 複数のインターフェースを継承可能
interface Greetable extends Named {
    // インターフェースはオブジェクトの構造しか定義できない．
    // publicやprivateは使えない．
    // readonlyのものは初期設定の時のみしか使用できない．

    greet(phrase: string): void;
}

// 1つのクラスには複数のインターフェースを指定できる（,で区切って）
// implementsでインターフェースを実装する
class Person implements Greetable {
    name?: string;
    age = 30;

    constructor(n?: string) {
        if (n) {
            this.name = n;
        }
    }

    greet(phrase: string) {
        if(this.name){
            console.log(phrase + ' ' + this.name);
        } else {
            console.log("Hi!");
        }
    }
}

let user1: Greetable;

user1 = new Person();
user1.greet('Hello I am');

console.log(user1);