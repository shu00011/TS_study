"use strict";
const button = document.querySelector('button');
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hikking'];
const person = {
    firstName: 'Max',
    age: 30
};
if (button) {
    button.addEventListener('click', event => {
        console.log(event);
    });
}
activeHobbies.push(...hobbies);
const copiedPerson = Object.assign({}, person);
const add = (...numbers) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue;
    }, 0);
};
const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers);
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2);
const { firstName: userName, age } = person;
console.log(userName, age, person);
