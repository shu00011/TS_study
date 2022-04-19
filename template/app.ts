let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';

// unknown型を他の型に代入する場合にはif文で型をチェックしなければならない．
if(typeof userInput === 'string') {
    userName = userInput;
}

// never型 絶対に戻り値を返すことはない．ありえない．
// 無限ループにも使用される．
function generateError(message: string, code: number): never {
    throw { message: message, errorCode: code };    // throwによってscriptがクラッシュ=停止する
}

generateError('エラーが発生しました', 500);