// const person: {
//     name: string;
//     age: number;
//     hobbies: string[];
//     role: [number, string]; // タプル型．pushは許可される．
// } = {
//     name: 'koha',
//     age: 22,
//     hobbies: ['Sports', 'Cooking'],
//     role: [2, 'author'],
// };

// defaultではenumの定数には0からの値が割り当てられる．任意に指定することも可能．
// 複数の定数を使う必要がある場合使うと便利
enum Role {
    ADMIN = 'ADMIN',
    READ_ONLY = 100,
    AUTHOR = 200,
}

const person = {
    name: 'koha',
    age: 22,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN,
};

let favoriteActivities: string[];
favoriteActivities = ['Sports'];

console.log(person);

for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}

if (person.role === Role.ADMIN) {
    console.log('管理者ユーザ');
}