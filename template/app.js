var userInput;
var userName;
userInput = 5;
userInput = 'Max';
// unknown型を他の型に代入する場合にはif文で型をチェックしなければならない．
if (typeof userInput === 'string') {
    userName = userInput;
}
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
generateError('エラーが発生しました', 500);
