"use strict";
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role[Role["READ_ONLY"] = 100] = "READ_ONLY";
    Role[Role["AUTHOR"] = 200] = "AUTHOR";
})(Role || (Role = {}));
const person = {
    name: 'koha',
    age: 22,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN,
};
let favoriteActivities;
favoriteActivities = ['Sports'];
console.log(person);
for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
}
if (person.role === Role.ADMIN) {
    console.log('管理者ユーザ');
}
