"use strict";
const button = document.querySelector('button');
function clickHandler(message) {
    console.log('Clicked!' + message);
}
button.addEventListener('click', clickHandler.bind(null, "You're welcome!"));
function add(n1, n2) {
    if (n1 + n2 > 0) {
        return n1 + n2;
    }
    return;
}
