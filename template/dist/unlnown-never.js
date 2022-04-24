"use strict";
let userInput;
let userName;
let age;
userInput = 5;
userInput = 'Max';
age = 30;
if (typeof userInput === 'string') {
    userName = userInput;
}
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
generateError('エラーが発生しました', 500);
