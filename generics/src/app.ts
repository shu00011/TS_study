// generic型→型の安全性を向上させる
// generic型→追加の型の情報をつけることができる
// 空の配列の宣言方法（GenericのArray型)
// const names: any[] = [];
// const names: Array<string | number> =[];
// const names: Array<any> = [];
// const names: Array<string> = []; // string[]

// // GenericのPromise
// const promise = new Promise<string>((resolve, reject) => {
//     setTimeout(() => {
//         resolve('終わりました!');
//     }, 2000);
// });

// promise.then(data => {
//     data.split(' ');
// });

// generic関数
// generic型の制約にはextendsを使う
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergedObj =merge({name:'Max', hobbies: ['Sports']}, {age:30});
console.log(mergedObj.age);

// typeでも可
interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = '値がありません．';
    if(element.length>0){
        descriptionText='値は'+element.length+'個です．';
    }
    return [element, descriptionText];
}

console.log(countAndDescribe(['Sports','Cooking']));

// UはTのプロパティである必要がある
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: '+obj[key];
}

extractAndConvert({name:'Max'}, 'name');

// generic class
class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    // methodに独自にgeneric型を指定することも可能．
    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if(this.data.indexOf(item) == -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);   // 要素がみつからないとき-1を返す(最後の要素を削除)
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Data1');
textStorage.addItem('Data2');
textStorage.removeItem('Data1');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(
    title: string,
    description: string,
    date: Date): CourseGoal {
        let courseGoal: Partial<CourseGoal> = {};
        courseGoal.title = title;
        courseGoal.description = description;
        courseGoal.completeUntil = date;

        return courseGoal as CourseGoal;    // as→キャスト
}

const names: Readonly<string[]>= ['Max','Annna'];
